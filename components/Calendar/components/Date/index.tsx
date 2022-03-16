import moment from 'moment'
import React, { MouseEventHandler } from 'react'
import { LosDate, ProjectDate } from 'types'

interface Props {
  date: ProjectDate
  className?: string
  onClick?: MouseEventHandler<any> | null
  from?: string | null
  end?: string | null
  showCalendarWithoutChecks?: boolean
  isUnavailable?: boolean
  los?: LosDate | null
}

const Date: React.FC<Props> = (props: Props) => {
  const classess = []
  const internalClasses: Array<string> = []
  let showLosTooltip = false
  let isPartOfLos = false

  // Check if it is today to do basic highlight
  const isToday = moment(props.date.date).isSame(moment(), 'day')
  if (isToday) {
    classess.push('border-b-2 border-bg-brand')
  }

  let isBefore = moment(props.date.date).isBefore(moment(), 'day')
  if (!props.showCalendarWithoutChecks) {
    // Disable any day previous days from Today
    if (isBefore || props.isUnavailable) {
      classess.push('cursor-not-allowed text-gray-300 unavailable line-through')
      internalClasses.push('border-0')
    }

    // Highlight From date
    if (props.from) {
      const isSameAsFrom = moment(props.from).isSame(
        moment(props.date.date),
        'day'
      )
      if (isSameAsFrom) {
        classess.push('bg-brand text-white selected')
        if (props.los) {
          showLosTooltip = true
        }
      }
    }

    // Highlight End date
    if (props.end) {
      const isSameAsEnd = moment(props.end).isSame(
        moment(props.date.date),
        'day'
      )
      if (isSameAsEnd) {
        classess.push('bg-brand text-white selected')
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
        classess.push('bg-brand text-white selected')
        internalClasses.push('border-brand')
      }
    }

    // Highlight Los Days
    if (props.from && props.los) {
      const fromDateMoment = moment(props.from)
      let losWithFromContext = moment(props.from).add(props.los.los, 'days')

      isPartOfLos = moment(props.date.date).isBetween(
        fromDateMoment,
        losWithFromContext,
        undefined,
        '[]'
      )
      if (isPartOfLos && !props.end) {
        classess.push('text-gray-500 preselected')
        internalClasses.push('border-0')
      }
    }
  }

  return (
    <td
      className={[
        `group z-0 h-10 w-10 cursor-pointer md:h-14 md:w-14 ${props.className}`,
        ...classess,
      ].join(' ')}
      data-testid={`date-${props.date.date}`}
      onClick={(e) =>
        !isBefore && !props.isUnavailable && !isPartOfLos
          ? props.onClick && props.onClick(e)
          : null
      }
    >
      <div
        className={[
          'relative z-0 flex h-10 w-10 flex-row items-center justify-center rounded-full border border-transparent hover:border-brand md:h-14 md:w-14',
          ...internalClasses,
        ].join(' ')}
      >
        {isPartOfLos && !props.end && (
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-brand bg-opacity-10"></div>
        )}

        {showLosTooltip && (
          <p
            className="absolute -top-9 left-0 right-0 z-10 inline-flex transform flex-row justify-center duration-200"
            data-testid={`los-tip-${props.date.date}`}
          >
            <span className="z-50 whitespace-nowrap rounded-md border border-gray-100 bg-white px-2 py-2 text-xs font-medium text-gray-500 shadow-lg">
              {props.los?.los}-nights minimum
            </span>
          </p>
        )}

        <p className="z-50">{props.date.label}</p>
      </div>
    </td>
  )
}

export default Date
