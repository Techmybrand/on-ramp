import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'


export const GlobalContext = React.createContext<any>(null)

export const GlobalProvider = ({ children }: any) => {
  const [connectorName, setConnectorName] = useState<string>('')

  return (
    <GlobalContext.Provider
      value={{
        connectorName,
        setConnectorName
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
