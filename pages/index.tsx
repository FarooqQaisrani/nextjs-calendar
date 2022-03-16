import DateRangeSelector from 'components/DateRangeSelector'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Calendar app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center space-y-4  text-center">
        <h1 className="text-4xl font-bold text-brand">Range Selector</h1>

        <div suppressHydrationWarning={true}>
          {typeof window && <DateRangeSelector />}
        </div>
      </main>
    </div>
  )
}

export default Home
