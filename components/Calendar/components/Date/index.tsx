import moment from 'moment'
import React, { MouseEventHandler } from 'react'
import { ProjectDate } from 'types'

interface Props {
  date: ProjectDate
  className?: string
  onClick?: MouseEventHandler<any> | null
  from?: string | null
  end?: string | null
  showCalendarWithoutChecks?: boolean
  isUnavailable?: boolean
}

const Date: React.FC<Props> = (props: Props) => {
  const classess = []

  // Check if it is today to do basic highlight
  const isToday = moment(props.date.date).isSame(moment(), 'day')
  if (isToday) {
    classess.push('border-b border-blue-700')
  }

  let isBefore = moment(props.date.date).isBefore(moment(), 'day')
  if (!props.showCalendarWithoutChecks) {
    // Disable any day previous days from Today
    if (isBefore || props.isUnavailable) {
      classess.push(
        'cursor-not-allowed hover:bg-slate-200 text-gray-300 hover:text-gray-300 unavailable'
      )
    }

    // Highlight From date
    if (props.from) {
      const isSame = moment(props.from).isSame(moment(props.date.date), 'day')
      if (isSame) {
        classess.push('bg-blue-500 text-white selected')
      }
    }

    // Highlight End date
    if (props.end) {
      const isSame = moment(props.end).isSame(moment(props.date.date), 'day')
      if (isSame) {
        classess.push('bg-blue-500 text-white selected')
      }
    }

    // Highlight Dates between From and End
    if (props.from && props.end) {
      const isBetween = moment(props.date.date).isBetween(
        props.from,
        props.end,
        undefined,
        '[]'
      )
      if (isBetween) {
        classess.push('bg-blue-500 text-white selected')
      }
    }
  }

  return (
    <td
      className={[
        `h-10 w-10 cursor-pointer bg-slate-200 text-gray-500 ${props.className} hover:bg-gray-700 hover:text-white`,
        ...classess,
      ].join(' ')}
      data-testid={`date-${props.date.date}`}
      onClick={(e) =>
        !isBefore && !props.isUnavailable
          ? props.onClick && props.onClick(e)
          : null
      }
    >
      {props.date.label}
    </td>
  )
}

export default Date
