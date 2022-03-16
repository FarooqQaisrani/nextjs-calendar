import type { NextPage } from 'next'
import Head from 'next/head'
import Calendar from 'components/Calendar'
import DateRangeSelector from 'components/DateRangeSelector'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Calendar app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div suppressHydrationWarning={true}>
        {typeof window && <Calendar showCalendarWithoutChecks={true} />}
      </div>
    </div>
  )
}

export default Home
