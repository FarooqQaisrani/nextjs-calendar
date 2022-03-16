import Calendar from 'components/Calendar'
import moment from 'moment'
import React, { useState } from 'react'
import { LosDate, UnvailableDate } from 'types'

interface Props {
  unavailableDates?: Array<UnvailableDate> | null | undefined
  los?: Array<LosDate> | null | undefined
}

const DateRangeSelector: React.FC<Props> = (props: Props) => {
  const [from, setFrom] = useState<string | null>(null)
  const [end, setEnd] = useState<string | null>(null)

  const onDayClick = (e: any, date: string) => {
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
    <div className="flex  flex-col items-center justify-center border py-8 px-8">
      <div suppressHydrationWarning={true}>
        {typeof window && (
          <Calendar
            onDayClick={(e: any, date: string) => onDayClick(e, date)}
            from={from}
            end={end}
            unavailableDates={props.unavailableDates}
            los={props.los}
          />
        )}
      </div>

      <div className="flex w-full flex-row justify-start py-4">
        <button
          className="rounded-full px-4 py-2 shadow-sm hover:shadow-md"
          onClick={onClearDates}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default DateRangeSelector
