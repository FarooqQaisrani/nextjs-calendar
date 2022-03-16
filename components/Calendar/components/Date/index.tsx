import moment from 'moment'
import React, { MouseEventHandler } from 'react'
import { ProjectDate } from 'types'

interface Props {
  date: ProjectDate
  className?: string
  onClick?: MouseEventHandler<any> | null
  from?: string | null
}

const Date: React.FC<Props> = (props: Props) => {
  const classess = []

  const isToday = moment(props.date.date).isSame(moment(), 'day')
  if (isToday) {
    classess.push('border-b border-blue-700')
  }

  const isBefore = moment(props.date.date).isBefore(moment(), 'day')
  if (isBefore) {
    classess.push(
      'cursor-not-allowed hover:bg-slate-200 text-gray-300 hover:text-gray-300'
    )
  }

  if (props.from) {
    const isSame = moment(props.from).isSame(moment(props.date.date), 'day')
    if (isSame) {
      classess.push('bg-blue-500 text-white selected')
    }
  }

  return (
    <td
      className={[
        `h-10 w-10 cursor-pointer bg-slate-200 text-gray-500 ${props.className} hover:bg-gray-700 hover:text-white`,
        ...classess,
      ].join(' ')}
      data-testid="date"
      onClick={(e) => (!isBefore ? props.onClick && props.onClick(e) : null)}
    >
      {props.date.label}
    </td>
  )
}

export default Date
