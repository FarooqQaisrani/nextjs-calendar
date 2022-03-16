import moment from 'moment'
import React, { MouseEventHandler } from 'react'
import { ProjectDate } from 'types'

interface Props {
  date: ProjectDate
  className?: string
  onClick?: MouseEventHandler<any> | null
}

const Date: React.FC<Props> = (props: Props) => {
  const isToday = moment(props.date.date).isSame(moment(), 'day')
  const isBefore = moment(props.date.date).isBefore(moment(), 'day')

  const classess = []

  if (isToday) {
    classess.push('border-b border-blue-700')
  }
  if (isBefore) {
    classess.push('cursor-not-allowed hover:bg-slate-200 text-gray-300')
  }

  return (
    <td
      className={[
        `h-10 w-10 cursor-pointer bg-slate-200 text-gray-500 ${props.className} hover:bg-gray-700 hover:text-white`,
        classess,
      ].join(' ')}
      data-testid="date"
      onClick={(e) => (!isBefore ? props.onClick && props.onClick(e) : null)}
    >
      <p>{props.date.label}</p>
    </td>
  )
}

export default Date
