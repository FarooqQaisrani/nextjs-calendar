import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Calendar = dynamic(() => import('components/Calendar'), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Calendar app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center  space-y-4  text-center">
        <div className="flex max-w-lg flex-col">
          <h1 className="text-2xl font-bold text-brand">Simple Calendar</h1>
          <p className="text-">
            In this view Calendar Compnent is added directly without any Checks,
            API calls and Event Handlers.
          </p>
        </div>

        <div suppressHydrationWarning={true}>
          {typeof window && <Calendar showCalendarWithoutChecks={true} />}
        </div>
      </main>
    </div>
  )
}

export default Home
