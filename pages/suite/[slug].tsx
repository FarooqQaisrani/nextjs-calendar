import DateRangeSelector from 'components/DateRangeSelector'
import SharedUiSkeletonsCalendar from 'components/shared/skeletons/calendar'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [unavailableDates, setUnavailableDates] = useState(null)
  const [los, setLos] = useState(null)
  const [isLoading, setLoading] = useState(false)

  /*----------------------------------------
    Unavailable dates for This Suite
  ----------------------------------------*/
  useEffect(() => {
    setLoading(true)
    fetch('/api/unavailable-dates')
      .then((res) => res.json())
      .then((data) => {
        setUnavailableDates(data)
        setLoading(false)
      })

    fetch('/api/los-dates')
      .then((res) => res.json())
      .then((data) => {
        setLos(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Calendar app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center space-y-4 text-center">
        <h1 className="text-4xl font-bold text-brand">Suite Date Selector</h1>

        {isLoading ? (
          <SharedUiSkeletonsCalendar />
        ) : (
          <div suppressHydrationWarning={true}>
            {typeof window && (
              <DateRangeSelector
                unavailableDates={unavailableDates}
                los={los}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
