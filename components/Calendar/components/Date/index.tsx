import moment from 'moment'
import React, { MouseEventHandler } from 'react'
import { ProjectDate } from 'types'

interface Props {
  date: ProjectDate
  className?: string
  onClick?: MouseEventHandler<any>
}

const Date: React.FC<Props> = (props: Props) => {
  const isToday = moment(props.date.date).isSame(moment(), 'day')

  const classess = []

  if (isToday) {
    classess.push('border-b border-blue-700')
  } else {
    classess.push('text-gray-500')
  }

  return (
    <td
      className={[
        `h-10 w-10 cursor-pointer bg-slate-200 ${props.className}`,
        classess,
      ].join(' ')}
      data-testid="date"
      onClick={props.onClick}
    >
      <p>{props.date.label}</p>
    </td>
  )
}

export default Date
