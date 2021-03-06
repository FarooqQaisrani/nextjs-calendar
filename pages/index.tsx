import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const DateRangeSelector = dynamic(
  () => import('components/DateRangeSelector'),
  {
    ssr: false,
  }
)

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Calendar app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center space-y-4  text-center">
        <div className="flex max-w-lg flex-col">
          <h1 className="text-2xl font-bold text-brand">Range Selector</h1>
          <p className="text-">
            In this view Calendar Component is disabling the dates before Today.
          </p>
        </div>

        <div suppressHydrationWarning={true}>
          {typeof window && <DateRangeSelector />}
        </div>
      </main>
    </div>
  )
}

export default Home
