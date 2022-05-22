import SharedUiSkeletonsCalendar from 'components/shared/skeletons/calendar'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const DateRangeSelector = dynamic(
  () => import('components/DateRangeSelector'),
  {
    ssr: false,
  }
)

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
        <div className="flex max-w-lg flex-col">
          <h1 className="text-2xl font-bold text-brand">Suite Date Selector</h1>
          <p className="text-md">
            In this view there are two API calls to fetch
            <span className="whitespace-nowrap text-sm font-bold">
              {' '}
              Unavailable Dates
            </span>{' '}
            and
            <span className="whitespace-nowrap text-sm font-bold">
              {' '}
              Length of Stay{' '}
            </span>
            and utilizes those input to display
            <span className="whitespace-nowrap text-sm font-bold">
              {' '}
              Minimum Stay, Checkout only, Disable future dates
            </span>
          </p>
        </div>

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
