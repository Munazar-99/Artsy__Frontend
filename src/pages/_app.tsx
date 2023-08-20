import Header from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Artsy</title>
        <meta
          name="description"
          content="Discover a world of creativity with Artsy - the AI-powered tool that transforms text prompts into stunning images. Unleash your imagination and turn words into captivating visuals."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC}'), {
              page__path: window.location.pathname,
            };`
          }} />
      </Head>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] ">
        <Component {...pageProps} />
      </main>
    </>
  )
}
