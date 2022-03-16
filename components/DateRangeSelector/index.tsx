import React, { useState } from 'react'
import Head from 'next/head'
import Calendar from 'components/Calendar'
import { ProjectDate } from 'types'

const DateRangeSelector: React.FC = () => {
  const [from, setFrom] = useState<string | null>(null)

  const onDayClick = (e: any, date: string) => {
    console.log(date)
    setFrom(date)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Range Selector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center space-y-4 px-20 text-center">
        <h1 className="text-4xl font-bold text-brand">Range Selector</h1>

        <div suppressHydrationWarning={true}>
          {typeof window && (
            <Calendar
              onDayClick={(e: any, date: string) => onDayClick(e, date)}
              from={from}
            />
          )}
        </div>

        <div className="flex flex-row justify-between">
          <button onClick={() => setFrom(null)}>Clear</button>
        </div>
      </main>
    </div>
  )
}

export default DateRangeSelector
