import moment from 'moment'
import React from 'react'
import { LosDate, UnvailableDate } from 'types'
import Date from './components/Date'

type MyProps = {
  width?: string
  onMonthChange?: Function
  onYearChange?: Function
  onNextMonth?: Function
  onPrevMonth?: Function
  onDayClick?: Function
  from?: string | null
  end?: string | null
  showCalendarWithoutChecks?: boolean
  unavailableDates?: Array<UnvailableDate> | null
  los?: Array<LosDate> | null
}
type MyState = {
  dateContext: any
  today: any
  showMonthPopup: boolean
  showYearNav: boolean
}

export default class Calendar extends React.PureComponent<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)
  }

  state: MyState = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearNav: false,
  }

  //Get weekdays from moment.js
  weekdays = moment.weekdays()
  weekdaysShort = moment.weekdaysShort()
  months = moment.months()

  /*----------------------------------------
    Helper Functions 
  ----------------------------------------*/
  year = () => this.state.dateContext.format('Y')
  month = () => this.state.dateContext.format('MM')
  monthLabel = () => this.state.dateContext.format('MMMM')
  daysInMonth = () => this.state.dateContext.daysInMonth()
  currentDate = () => this.state.dateContext.get('date')
  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext
    let firstDay = moment(dateContext).startOf('month').format('d')
    return firstDay
  }

  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).add(1, 'month')
    this.setState({
      dateContext: dateContext,
    })
    this.props.onNextMonth && this.props.onNextMonth()
  }

  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).subtract(1, 'month')
    this.setState({
      dateContext: dateContext,
    })
    this.props.onPrevMonth && this.props.onPrevMonth()
  }

  showYearEditor = () => {
    this.setState({
      showYearNav: true,
    })
  }

  onDayClick = (e: any, date: string) => {
    this.props.onDayClick && this.props.onDayClick(e, date)
  }

  checkIfDateIsUnavailable = (date: string) => {
    if (!this.props.unavailableDates) {
      null
    }

    this.props.unavailableDates?.forEach((ud: UnvailableDate) => {})
    return this.props.unavailableDates?.some((ud: UnvailableDate) => {
      const isBetween = moment(date).isBetween(
        ud.startDate,
        ud.endDate,
        undefined,
        '[]'
      )
      return isBetween
    })
  }

  returnLosIfDateExistsInLosArray = (date: string) => {
    const found = this.props.los?.find((item) => item.day === date)
    if (found) {
      return found
    } else {
      return null
    }
  }

  getFirstUnavailableDate = (date: string) => {
    const dateMoment = moment(date)
    return this.props.unavailableDates?.find((date: UnvailableDate) => {
      return moment(date.startDate).isAfter(dateMoment)
    })
  }

  render() {
    //render weekdays
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className="font-medium text-textGray opacity-75">
          {day}
        </td>
      )
    })

    //render days from previous and next months
    let daysFromPrevNextMonth = []
    for (let i = 0; i < +this.firstDayOfMonth(); i++) {
      daysFromPrevNextMonth.push(
        <Date key={i} date={{ date: '' }} className="pointer-events-none" />
      )
    }

    //render this month days
    let daysInThisMonth = []
    for (let d = 1; d <= this.daysInMonth(); d++) {
      const makeDateString = `${this.year()}-${this.month()}-${
        d < 9 ? `0${d}` : d
      }`

      // Let's find first unavailable date
      let findFirstUnavailableDate = null
      if (this.props.from) {
        findFirstUnavailableDate = this.getFirstUnavailableDate(this.props.from)
      } else {
        findFirstUnavailableDate = this.getFirstUnavailableDate(makeDateString)
      }

      daysInThisMonth.push(
        <Date
          key={makeDateString}
          date={{ date: makeDateString, label: d }}
          onClick={(e) => {
            this.onDayClick(e, makeDateString)
          }}
          from={this.props.from}
          end={this.props.end}
          showCalendarWithoutChecks={
            this.props.showCalendarWithoutChecks ?? false
          }
          isUnavailable={this.checkIfDateIsUnavailable(makeDateString)}
          los={this.returnLosIfDateExistsInLosArray(makeDateString)}
          unavailableDates={this.props.unavailableDates}
          firstUnavilableDate={findFirstUnavailableDate}
        />
      )
    }

    //Build days
    let totalDays = [...daysFromPrevNextMonth, ...daysInThisMonth]
    let rows: Array<any> = []
    let cells: Array<any> = []

    totalDays.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row)
      } else {
        let insertRow = cells.slice()
        rows.push(insertRow)
        cells = []
        cells.push(row)
      }
      if (i === totalDays.length - 1) {
        let insertRow = cells.slice()
        rows.push(insertRow)
      }
    })

    let daysElements = rows.map((d, i) => {
      return <tr key={i * 100}>{d}</tr>
    })

    return (
      <div
        className="relative mx-auto flex select-none flex-row justify-center"
        data-testid="calendar"
      >
        <table data-testid="calendar">
          {/* Header */}
          <thead className="">
            <tr>
              <td colSpan={1}>
                <button
                  data-testid="btn-prev-month"
                  className="flex h-12 w-full flex-row items-center justify-center"
                  onClick={this.prevMonth}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </td>
              <td colSpan={5}>
                <span
                  data-testid="month"
                  className="h-12 font-bold text-textBrand"
                >
                  {this.monthLabel()} {this.year()}
                </span>
              </td>
              <td colSpan={1}>
                <button
                  data-testid="btn-next-month"
                  className="flex h-12 w-full flex-row items-center justify-center"
                  onClick={this.nextMonth}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rotate-180"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          </thead>

          <tbody>
            {/*Week Days */}
            <tr className="">{weekdays}</tr>

            {/* Dates */}
            {daysElements}
          </tbody>
        </table>
      </div>
    )
  }
}
