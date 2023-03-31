import '@/styles/index.scss'
import type { AppProps } from 'next/app'
import { Nprogress, Seo } from '@/shared'
import Providers from '@/providers'
import { useStore } from '@/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Providers store={store}>
      <Seo />
      <Nprogress />
      <Component {...pageProps} />
      <ToastContainer
        style={{ marginTop: '10rem' }}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Providers>
  )
}
