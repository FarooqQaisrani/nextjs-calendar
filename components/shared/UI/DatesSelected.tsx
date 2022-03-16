import React from 'react'

interface Props {
  from?: string | null
  end?: string | null
}
const DatesSelected: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex w-full flex-row items-center justify-center space-x-8 rounded-xl border py-4 shadow-sm">
      <span className="text-brand opacity-25">|</span>

      <div className="flex flex-col space-y-1">
        <p className="text-xs font-medium uppercase tracking-widest text-brand opacity-90">
          Dates
        </p>

        {!props.from && (
          <p className="text-md font-bold tracking-wider text-textGray">
            Select Dates
          </p>
        )}

        {props.from && (
          <p className="text-md font-bold tracking-wider text-textLight">
            {props.from} - {props.end}
          </p>
        )}
      </div>

      <span className="text-brand opacity-25">|</span>
    </div>
  )
}

export default DatesSelected
