import React from 'react'

interface Props {
  date: any
  className?: string
}

const Date: React.FC<Props> = (props) => {
  return (
    <td className={`h-10 w-10 ${props.className}`} data-testid="date">
      <p>{props.date}</p>
    </td>
  )
}

export default Date
