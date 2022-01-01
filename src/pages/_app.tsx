import './globals.css'

import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

import { FirebaseProvider } from '@/components/projects/firebase-provider'
import { Navbar } from '@/components/projects/navbar'

export const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <FirebaseProvider config={config}>
      <div className='m-0 h-0 font-sans box-border'>
        <header>
          <Navbar />
        </header>
        <Component {...pageProps} />
      </div>
    </FirebaseProvider>
  )
}

export default App
