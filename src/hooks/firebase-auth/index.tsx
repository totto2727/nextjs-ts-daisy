import type { Auth } from 'firebase/auth'
import type { ReactNode } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'

const firebaseAuthContext = createContext<Auth | undefined>(undefined)

export const FirebaseAuthContextProvider = ({
  auth,
  children,
}: {
  auth: Auth
  children: ReactNode
}) => {
  return (
    <firebaseAuthContext.Provider value={auth}>
      {children}
    </firebaseAuthContext.Provider>
  )
}

export const useFirebaseAuth = () => {
  return useContext(firebaseAuthContext) as Auth
}
