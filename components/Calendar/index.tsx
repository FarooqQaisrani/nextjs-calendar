import React from 'react'
import moment from 'moment'
import Date from './components/Date'

type MyProps = {
  width?: string
  onMonthChange?: Function
  onYearChange?: Function
  onNextMonth?: Function
  onPrevMonth?: Function
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
    this.width = props.width || '350px'
    this.yearInput = React.createRef()
  }

  state: MyState = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearNav: false,
  }

  //styles
  width = '350px'

  //Get weekdays from moment.js
  weekdays = moment.weekdays()
  weekdaysShort = moment.weekdaysShort()
  months = moment.months()

  /*----------------------------------------
    Helper Functions 
  ----------------------------------------*/
  year = () => this.state.dateContext.format('Y')
  month = () => this.state.dateContext.format('MMMM')
  daysInMonth = () => this.state.dateContext.daysInMonth()
  currentDate = () => this.state.dateContext.get('date')
  currentDay = () => this.state.dateContext.format('D')
  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext
    let firstDay = moment(dateContext).startOf('month').format('d')
    return firstDay
  }

  setMonth = (month) => {
    let monthNo = this.months.indexOf(month)
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).set('month', monthNo)
    this.setState({
      dateContext: dateContext,
    })
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

  onSelectChange = (e, data) => {
    this.setMonth(data)
    this.props.onMonthChange && this.props.onMonthChange()
  }

  SelectList = (props: any) => {
    let popup = props.data.map((data: any) => {
      return (
        <div key={data}>
          <button
            onClick={(e) => {
              this.onSelectChange(e, data)
            }}
          >
            {data}
          </button>
        </div>
      )
    })

    return <div className="">{popup}</div>
  }

  onChangeMonth = (e, month) => {
    this.setState({
      showMonthPopup: !this.state.showMonthPopup,
    })
  }

  MonthNav = () => {
    return (
      <span className="cursor-pointer text-black">
        <span
          data-testid="month"
          className="text-black"
          onClick={(e) => this.onChangeMonth(e, this.month())}
        >
          {this.month()}
        </span>
        {this.state.showMonthPopup && <this.SelectList data={this.months} />}
      </span>
    )
  }

  showYearEditor = () => {
    this.setState({
      showYearNav: true,
    })
  }

  onYearChange = (e) => {
    this.setYear(e.target.value)
    this.props.onYearChange && this.props.onYearChange(e, e.target.value)
  }
  setYear = (year) => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).set('year', year)
    this.setState({
      dateContext: dateContext,
    })
  }

  onKeyUpYear = (e) => {
    if (e.which === 13 || e.which === 27) {
      this.setYear(e.target.value)
      this.setState({
        showYearNav: false,
      })
    }
  }
  YearNav = () => {
    return this.state.showYearNav ? (
      <input
        defaultValue={this.year()}
        ref={(yearInput) => {
          this.yearInput = yearInput
        }}
        onKeyUp={(e) => this.onKeyUpYear(e)}
        onChange={(e) => this.onYearChange(e)}
        type="number"
        placeholder="year"
      />
    ) : (
      <span
        className="cursor-pointer"
        onDoubleClick={(e) => {
          this.showYearEditor(e)
        }}
      >
        {this.year()}
      </span>
    )
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
      daysFromPrevNextMonth.push(
        <Date
          key={i}
          className="h-10 w-10 bg-slate-200 text-gray-500"
          date={''}
        />
      )
    }

    //render this month days
    let daysInThisMonth = []
    for (let d = 1; d <= this.daysInMonth(); d++) {
      daysInThisMonth.push(
        <Date
          key={d * 100}
          className={`h-10 w-10 ${
            d === +this.currentDay()
              ? 'bg-blue-400 text-white'
              : 'bg-slate-200 text-gray-500'
          }`}
          date={d}
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
                <this.MonthNav /> <this.YearNav />
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
