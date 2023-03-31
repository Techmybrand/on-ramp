import React, { useContext, useEffect, useReducer } from 'react'
import { IAuthInfo } from '@/types'

export const AuthStateContext = React.createContext({})

const initialState: IAuthInfo = { name: '', email: '', uuid: '', token: '', kyc: false}
enum ActionType {
  SetDetails = 'setAuthDetails',
  RemoveDetails = 'removeAuthDetails',
}

interface IAction {
  type: ActionType
  payload: IAuthInfo
}

const reducer: React.Reducer<{}, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.SetDetails:
      return {
        email: action.payload.email,
        name: action.payload.name,
        uuid: action.payload.uuid,
        token: action.payload.token,
        kyc: action.payload.kyc,
        wallet: action.payload.wallet,
      }
    case ActionType.RemoveDetails:
      return {
        email: initialState.email,
        name: initialState.name,
        uuid: initialState.uuid,
        token: initialState.token,
        kyc: initialState.kyc,
        wallet: initialState.wallet,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const AuthProvider = ({ children }: any) => {
  let localState = null
  if (typeof window !== 'undefined' && window.localStorage.getItem('userInfo')) {
    localState = JSON.parse(window.localStorage.getItem('userInfo') || '')
  }
  const [state, dispatch] = useReducer(reducer, localState || initialState)

  useEffect(() => {
    window.localStorage.setItem('userInfo', JSON.stringify(state))
  }, [state])

  return <AuthStateContext.Provider value={[state, dispatch]}>{children}</AuthStateContext.Provider>
}

// useContext hook - export here to keep code for global auth state
// together in this file, allowing user info to be accessed and updated
// in any functional component using the hook
export const useAuth: any = () => useContext(AuthStateContext)
