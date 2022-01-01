import type { FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import type { ReactNode } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'

const firebaseContext = createContext<FirebaseApp | undefined>(undefined)

type FirebaseContextProviderProps = {
  app: FirebaseApp
  children: ReactNode
}
export const FirebaseContextProvider = ({
  app,
  children,
}: FirebaseContextProviderProps) => {
  return (
    <firebaseContext.Provider value={app}>{children}</firebaseContext.Provider>
  )
}

export const useFirebase = () => {
  return useContext(firebaseContext) as FirebaseApp
}

export const useAuth = () => {
  return getAuth(useFirebase())
}
