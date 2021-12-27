import './globals.css'

import type { FirebaseApp } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { signOut } from 'firebase/auth'
import type { AppProps } from 'next/app'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

import { FirebaseAuthProvider } from '@/components/projects/firebase-auth'
import { useFirebaseAuth } from '@/hooks/firebase-auth'

type MainProps = { children: ReactNode }
const Main = ({ children }: MainProps) => {
  useEffect(() => {
    themeChange(false)
  }, [])

  const auth = useFirebaseAuth()
  const handleSignOut = () => {
    return signOut(auth)
  }

  return (
    <div className='m-0 h-0 font-sans box-border'>
      <select data-choose-theme className='select select-primary'>
        {/* <option value=''>Default</option> */}
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
      <button className='btn btn-primary' onClick={handleSignOut}>
        SignOut
      </button>
      {children}
    </div>
  )
}

export const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app: FirebaseApp = initializeApp(config)

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div>
      <FirebaseAuthProvider app={app}>
        <Main>
          <Component {...pageProps} />
        </Main>
      </FirebaseAuthProvider>
    </div>
  )
}

export default App
