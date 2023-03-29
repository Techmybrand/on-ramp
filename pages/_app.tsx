import '@/styles/index.scss'
import type { AppProps } from 'next/app'
import { Nprogress, Seo } from '@/shared'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Seo />
      <Nprogress />
      <Component {...pageProps} />
    </>
  )
}
