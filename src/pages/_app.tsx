import Header from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import{ Analytics } from '@vercel/analytics/react';


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] ">
        <Component {...pageProps}/>
        <Analytics />
      </main>
    </>
  )
}
