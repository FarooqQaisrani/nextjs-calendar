import React from 'react'
import moment from 'moment'
import Date from 'components/shared/Date'

type MyProps = {
  width?: string
}
type MyState = {
  dateContext: any
  today: any
  showMonthPopup: boolean
}

export default class Calendar extends React.PureComponent<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)
    this.width = props.width || '350px'
  }

  state: MyState = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
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

  onSelectChange = (e, data) => {}

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
              <td colSpan={1}></td>
              <td colSpan={5}>
                <this.MonthNav />
              </td>
              <td colSpan={1}></td>
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
