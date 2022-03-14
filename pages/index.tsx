import type { NextPage } from 'next'
import Head from 'next/head'
import Calendar from 'components/Calendar'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Calendar app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-brand">Calendar app</span>
        </h1>

        <Calendar />
      </main>
    </div>
  )
}

export default Home
