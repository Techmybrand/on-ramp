declare module 'nprogress'
declare module 'lodash'
declare module 'imask' {
  interface IMask {
    mask: any
    value: string
    masked: any
    unmaskedValue: string
    on(event: string, callback: () => void): void
    off(event: string, callback: () => void): void
  }

  class IMask {
    constructor(el: Element, config: object)
    static MaskedPattern: any
    static AnyMasked: any
  }

  export default IMask
}
