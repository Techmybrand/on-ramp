export interface NavLink {
  name: string
  title: string
  url: string
  external: boolean
}

export const navLinks: NavLink[] = [
  {
    name: 'Buy Crypto',
    title: 'buy',
    url: '/buy',
    external: false,
  },

  {
    name: 'Sell Crypto',
    title: 'sell',
    url: '/sell',
    external: false,
  },

  {
    name: 'My Account',
    title: 'account',
    url: '/',
    external: false,
  },

  {
    name: 'More',
    title: 'more',
    url: '/',
    external: false,
  },
]
