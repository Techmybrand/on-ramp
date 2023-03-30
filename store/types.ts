import { User } from "@/interfaces";

export const AUTHENTICATE = "AUTHENTICATE";
export const DEAUTHENTICATE = "DEAUTHENTICATE";

interface AuthenticateAction {
    type: typeof AUTHENTICATE;
    payload: { user: User; token: string };
  }
  
  interface DeauthenticateAction {
    type: typeof DEAUTHENTICATE;
  }

  export type AuthActionTypes =
  | AuthenticateAction
  | DeauthenticateAction;