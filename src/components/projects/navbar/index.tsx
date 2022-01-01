import type { FC } from 'react'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

import { useAuth } from '@/hooks/firebase-provider'

type NavbarViewProps = {
  handleSignOut: () => Promise<void>
}
const NavbarView: FC<NavbarViewProps> = ({ handleSignOut }) => {
  return (
    <nav className='navbar m-1 mb-2 gap-3 shadow-lg bg-neutral text-neutral-content rounded-box'>
      <div className='flex-none'>
        <button className='btn btn-square btn-ghost'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-6 h-6 stroke-current'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'></path>
          </svg>
        </button>
      </div>

      <div className='flex-1 px-2 mx-2'>
        <h1 className='font-bold'>VS Code Extention Manager</h1>
      </div>

      <div className='flex-none'>
        <select
          data-choose-theme
          className='select select-ghost focus:bg-neutral-focus focus:text-neutral-content'>
          <option value=''>Default</option>
          <option value='light'>Light</option>
          <option value='dark'>Dark</option>
        </select>
      </div>

      <div className='flex-none'>
        <button onClick={handleSignOut} className='btn btn-primary'>
          Signout
        </button>
      </div>
    </nav>
  )
}

export const Navbar: FC = () => {
  useEffect(() => {
    themeChange(false)
  }, [])

  const auth = useAuth()

  return (
    <NavbarView
      handleSignOut={() => {
        return auth.signOut()
      }}
    />
  )
}
