import React, { useState } from 'react'
import Head from 'next/head'
import Calendar from 'components/Calendar'
import { ProjectDate } from 'types'
import moment from 'moment'

const DateRangeSelector: React.FC = () => {
  const [from, setFrom] = useState<string | null>(null)
  const [end, setEnd] = useState<string | null>(null)

  const onDayClick = (e: any, date: string) => {
    console.log(date)

    const isBefore = moment(date).isBefore(from, 'day')

    if ((from && end) || isBefore) {
      setFrom(date)
      setEnd(null)
    } else if (from) {
      setEnd(date)
    } else {
      setFrom(date)
    }
  }

  const onClearDates = () => {
    setFrom(null)
    setEnd(null)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div suppressHydrationWarning={true}>
        {typeof window && (
          <Calendar
            onDayClick={(e: any, date: string) => onDayClick(e, date)}
            from={from}
            end={end}
          />
        )}
      </div>

      <div className="flex flex-row justify-between">
        <button onClick={onClearDates}>Clear</button>
      </div>
    </div>
  )
}

export default DateRangeSelector
