import moment from 'moment'
import React, { MouseEventHandler } from 'react'
import { LosDate, ProjectDate, UnvailableDate } from 'types'

interface Props {
  date: ProjectDate
  className?: string
  onClick?: MouseEventHandler<any> | null
  from?: string | null
  end?: string | null
  showCalendarWithoutChecks?: boolean
  isUnavailable?: boolean
  los?: LosDate | null
  unavailableDates?: Array<UnvailableDate> | null
  firstUnavilableDate?: UnvailableDate | null
}

const DateComp: React.FC<Props> = (props: Props) => {
  const classess = []
  const internalClasses: Array<string> = []
  let showLosTooltip = false
  let isPartOfLos = false
  let disableAfterFirstUnavailableDateWhenStartSelected = false
  let checkoutOnly = false

  // Check if it is today to do basic highlight
  const isToday = moment(props.date.date).isSame(moment(), 'day')
  if (isToday) {
    classess.push('border-b-2 border-bg-brand')
  }

  let isBefore = moment(props.date.date).isBefore(moment(), 'day')

  // Skip Calculations if set showCalendarWithoutChecks to false
  if (!props.showCalendarWithoutChecks) {
    // Disable any day previous days from Today
    if (isBefore || props.isUnavailable) {
      classess.push('cursor-not-allowed text-gray-300 unavailable line-through')
      internalClasses.push('border-0')
    }

    if (props.from) {
      // Highlight From dates
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
      let losWithFromContext = moment(props.from).add(props.los.los - 1, 'days')

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

    // Calcualte Checkout only state
    let getCheckoutOnly = moment(props.date.date)
    if (props.los && props.firstUnavilableDate && !props.from) {
      getCheckoutOnly = getCheckoutOnly.add(props.los.los, 'days')
      if (getCheckoutOnly.isSameOrAfter(props.firstUnavilableDate.startDate)) {
        checkoutOnly = true
        internalClasses.push('border-0')
      }
    }

    // Calcualte disableAfterFirstUnavailableDateWhenStartSelected
    if (props.firstUnavilableDate && props.from) {
      disableAfterFirstUnavailableDateWhenStartSelected = moment(
        props.date.date
      ).isSameOrAfter(props.firstUnavilableDate.startDate)

      if (disableAfterFirstUnavailableDateWhenStartSelected) {
        classess.push(
          'cursor-not-allowed text-gray-300 unavailable line-through'
        )
        internalClasses.push('border-0')
      }
    }

    // Push defualt pointer
    if (
      !(
        isBefore ||
        props.isUnavailable ||
        disableAfterFirstUnavailableDateWhenStartSelected
      )
    ) {
      classess.push('cursor-pointer')
    }
  }

  return (
    <td
      className={[
        `group z-0 h-10 w-10 md:h-14 md:w-14 ${props.className}`,
        ...classess,
      ].join(' ')}
      data-testid={`date-${props.date.date}`}
      onClick={(e) =>
        !isBefore &&
        !props.isUnavailable &&
        !isPartOfLos &&
        !checkoutOnly &&
        !disableAfterFirstUnavailableDateWhenStartSelected
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
        {/* Background highlight for preselect highlight */}
        {isPartOfLos && !props.end && (
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-brand bg-opacity-10"></div>
        )}

        {/* Minimum Length of stay highlight */}
        {showLosTooltip && (
          <p
            className="pointer-events-none absolute -top-9 left-0 right-0 z-10 inline-flex transform flex-row justify-center duration-200"
            data-testid={`los-tip-${props.date.date}`}
          >
            <span className="z-50 whitespace-nowrap rounded-md border border-gray-100 bg-white px-2 py-2 text-xs font-medium text-gray-500 shadow-lg">
              {props.los?.los}-nights minimum
            </span>
          </p>
        )}

        {/* Checkout only  */}
        {checkoutOnly && (
          <p
            className="pointer-events-none absolute -top-9 left-0 right-0 z-10 hidden transform flex-row justify-center duration-200 group-hover:inline-flex"
            data-testid={`los-tip-${props.date.date}`}
          >
            <span className="z-50 whitespace-nowrap rounded-md border border-gray-100 bg-white px-2 py-2 text-xs font-medium text-gray-500 shadow-lg">
              Checkout only
            </span>
          </p>
        )}

        {/* Label */}
        <p className="z-50">{props.date.label}</p>
      </div>
    </td>
  )
}

export default DateComp
