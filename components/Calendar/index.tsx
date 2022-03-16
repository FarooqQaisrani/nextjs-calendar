import React from 'react'
import moment from 'moment'
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

  MonthNav = () => {
    return (
      <span className="cursor-pointer text-black">
        <span data-testid="month" className="text-black">
          {this.monthLabel()}
        </span>
      </span>
    )
  }

  showYearEditor = () => {
    this.setState({
      showYearNav: true,
    })
  }

  onDayClick = (e: any, date: string) => {
    this.props.onDayClick && this.props.onDayClick(e, date)
  }
  render() {
    //render weekdays
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className="h-10 w-10 bg-slate-200">
          {day}
        </td>
      )
    })

    //render days from previous and next months
    let daysFromPrevNextMonth = []
    for (let i = 0; i < +this.firstDayOfMonth(); i++) {
      daysFromPrevNextMonth.push(<Date key={i} date={{ date: '' }} />)
    }

    //render this month days
    let daysInThisMonth = []
    for (let d = 1; d <= this.daysInMonth(); d++) {
      const makeDateString = `${this.year()}-${this.month()}-${d}`
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
        className="relative mx-auto flex w-96 flex-row justify-center"
        data-testid="calendar"
      >
        <table data-testid="calendar">
          {/* Header */}
          <thead className="bg-gray-500">
            <tr>
              <td colSpan={1}>
                <svg
                  data-testid="btn-prev-month"
                  onClick={(e) => {
                    this.prevMonth()
                  }}
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
              </td>
              <td colSpan={5}>
                <this.MonthNav /> {this.year()}
              </td>
              <td colSpan={1}>
                <svg
                  data-testid="btn-next-month"
                  onClick={(e) => {
                    this.nextMonth()
                  }}
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
              </td>
            </tr>
          </thead>

          <tbody>
            {/*Week Days */}
            <tr className=" bg-slate-100">{weekdays}</tr>

            {/* Dates */}
            {daysElements}
          </tbody>
        </table>
      </div>
    )
  }
}
