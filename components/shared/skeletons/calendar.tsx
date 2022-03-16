import React from 'react'

const SharedUiSkeletonsCalendar: React.FC = ({ children }) => {
  const cells = []
  for (let i = 0; i < 31; i++) {
    cells.push(
      <div key={i} className="col-span-1 h-12 rounded bg-slate-200"></div>
    )
  }
  return (
    <div className="mx-auto w-full max-w-sm rounded-md border border-gray-200 p-4 shadow">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-slate-200"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4">{cells}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SharedUiSkeletonsCalendar
