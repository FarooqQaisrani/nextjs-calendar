import type { NextPage } from 'next'
import Head from 'next/head'
import Calendar from 'components/Calendar'
import DateRangeSelector from 'components/DateRangeSelector'

const Home: NextPage = () => {
  const onDayClick = (e, day) => {
    console.log(e)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Calendar app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center space-y-4 px-20 text-center">
        <h1 className="text-4xl font-bold text-brand">Suite Date Selector</h1>

        {/* <div suppressHydrationWarning={true}>
          {typeof window && <Calendar />}
        </div> */}

        <div suppressHydrationWarning={true}>
          {typeof window && <DateRangeSelector />}
        </div>
      </main>
    </div>
  )
}

export default Home
