import React from 'react'
import moment from 'moment'

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

  render() {
    //render weekdays
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <button key={day} className="h-10 w-10 bg-slate-200">
          {day}
        </button>
      )
    })

    //render days from previous and next months
    let daysFromPrevNextMonth = []
    for (let i = 0; i < +this.firstDayOfMonth(); i++) {
      daysFromPrevNextMonth.push(
        <p key={i} className="h-10 w-10 bg-slate-200 text-gray-500"></p>
      )
    }

    //render this month days
    let daysInThisMonth = []
    for (let d = 1; d <= this.daysInMonth(); d++) {
      daysInThisMonth.push(
        <p
          key={d}
          className={`h-10 w-10 ${
            d === this.currentDay()
              ? 'bg-blue-400 text-white'
              : 'bg-slate-200 text-gray-500'
          }`}
        >
          {d}
        </p>
      )
    }

    //Build days
    let totalDays = [...daysFromPrevNextMonth, ...daysInThisMonth]
    let rows: Array<any> = []
    let cells: Array<any> = []
    console.log('totalDays', totalDays)

    totalDays.forEach((row, i) => {
      if (i % 7 === 0) {
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
      return (
        <button key={i * 100} className="h-10 w-10 bg-slate-200 text-gray-500">
          {d}
        </button>
      )
    })

    return (
      <div className="relative mx-auto w-96" data-testid="calendar">
        {/* Header */}
        <div className="flex flex-row justify-center">
          <h3></h3>
        </div>
        {/*Week Days */}
        <div className="flex flex-row justify-start bg-slate-100">
          {weekdays}
        </div>

        {/* Dates */}
        <div className="flex flex-row flex-wrap justify-start bg-slate-100">
          {daysElements}
        </div>
      </div>
    )
  }
}
