import Calendar from 'components/Calendar'
import moment from 'moment'
import React, { useState } from 'react'
import { UnvailableDate } from 'types'

interface Props {
  unavailableDates?: Array<UnvailableDate> | null | undefined
}

const DateRangeSelector: React.FC<Props> = (props: Props) => {
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
            unavailableDates={props.unavailableDates}
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
