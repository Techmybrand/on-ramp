import { Provider } from 'react-redux'
import { Store } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { AuthProvider } from '@/context/Auth.context'
import { ethers } from 'ethers'
import { Web3ReactProvider } from '@web3-react/core'
import { GlobalProvider } from '@/context/Global.context'

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 8000 // frequency provider is polling
  return library
}

const Providers: React.FC<{ store: Store; children: ReactNode }> = ({ children, store }) => {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <GlobalProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </GlobalProvider>
      </Web3ReactProvider>
    </Provider>
  )
}

export default Providers
