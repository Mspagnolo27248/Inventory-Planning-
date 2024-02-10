import { AlertProvider } from '@/contexts/Alert/AlertContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <AlertProvider>
 <Component {...pageProps} />
  </AlertProvider>
  )
}
