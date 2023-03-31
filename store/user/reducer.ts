import { IAuthInfo } from '@/types'
import { createReducer } from '@reduxjs/toolkit'
import { authenticate, deAuthenticate, muteAudio, unmuteAudio, updateLastLogin } from './actions'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  lastLogin: number
  timestamp: number
  audioPlay: boolean
  token: any
  user: IAuthInfo | null
  auth: boolean
}

export const initialState: UserState = {
  lastLogin: currentTimestamp(),
  timestamp: currentTimestamp(),
  token: null,
  user: null,
  auth: false,
  audioPlay: true,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateLastLogin, (state) => {
      state.lastLogin = currentTimestamp()
      state.timestamp = currentTimestamp()
    })
    .addCase(authenticate, (state, action) => {
      state.token = action.payload.token;
      state.user  = action.payload.user;
      state.auth  = true;
    })
    .addCase(deAuthenticate, (state, action) => {
      state.token = null;
      state.user  = null;
      state.auth  = false
    })
    .addCase(muteAudio, (state) => {
      state.audioPlay = false
    })
    .addCase(unmuteAudio, (state) => {
      state.audioPlay = true
    })
)
