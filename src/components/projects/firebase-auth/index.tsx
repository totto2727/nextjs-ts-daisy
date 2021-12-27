import type { FirebaseApp } from 'firebase/app'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { type ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { FirebaseAuthContextProvider } from '../../../hooks/firebase-auth'

type Props = {
  children: ReactNode
  app: FirebaseApp
}
export const FirebaseAuthProvider = ({ app, children }: Props) => {
  const auth = getAuth(app)
  auth.languageCode = 'ja'

  const provider = new GoogleAuthProvider()

  const handleSingIn = () => {
    signInWithRedirect(auth, provider)
  }

  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (user) {
    return (
      <FirebaseAuthContextProvider auth={auth}>
        <div>{children}</div>
      </FirebaseAuthContextProvider>
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
