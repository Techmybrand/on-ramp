export interface Currencies {
  name: string
  symbol: string
  icon: string
}

export interface TokenInputValue {
  name: string
  symbol: string
  amount: number | string
}

export interface IAuthInfo {
  uuid: string
  name: '';
  email: string;
  token: string;
  kyc?: boolean;
  wallet?: {
    balance: number
    address: string
  };
  // trades?:
}