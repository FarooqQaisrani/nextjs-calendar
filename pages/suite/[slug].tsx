import type { NextPage } from 'next'
import Head from 'next/head'
import DateRangeSelector from 'components/DateRangeSelector'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [unavailableDates, setUnavailableDates] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/unavailable-dates')
      .then((res) => res.json())
      .then((data) => {
        setUnavailableDates(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Calendar app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center space-y-4 px-20 text-center">
        <h1 className="text-4xl font-bold text-brand">Suite Date Selector</h1>

        <div suppressHydrationWarning={true}>
          {typeof window && <DateRangeSelector />}
        </div>
      </main>
    </div>
  )
}

export default Home
