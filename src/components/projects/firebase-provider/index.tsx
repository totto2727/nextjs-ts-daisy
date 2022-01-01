import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import type { ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { FirebaseContextProvider } from '@/hooks/firebase-provider'

type FirebaseProviderProps = {
  children: ReactNode
  config: FirebaseOptions
}
export const FirebaseProvider = ({
  config,
  children,
}: FirebaseProviderProps) => {
  const app: FirebaseApp = initializeApp(config)

  const auth = getAuth(app)
  auth.languageCode = 'ja'

  const [user, loading, error] = useAuthState(auth)

  const authProvider = new GoogleAuthProvider()

  const handleSingIn = () => {
    signInWithRedirect(auth, authProvider)
  }

  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (user) {
    return (
      <FirebaseContextProvider app={app}>
        <div>{children}</div>
      </FirebaseContextProvider>
    )
  }

  return (
    <div>
      <button className='btn btn-primary' onClick={handleSingIn}>
        Sing In
      </button>
    </div>
  )
}
