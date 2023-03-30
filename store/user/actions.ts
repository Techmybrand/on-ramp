import { createAction } from '@reduxjs/toolkit'

export const updateLastLogin = createAction<void>('user/updateLastLogin')
export const muteAudio = createAction<void>('user/muteAudio')
export const unmuteAudio = createAction<void>('user/unmuteAudio')
export const authenticate = createAction<{user:any, token:any}>('user/authenticate')
export const deAuthenticate = createAction<void>('user/deAuthenticate')
