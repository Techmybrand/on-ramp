export const stringShortner = (text?: string, length: number = 10) => {
  if (text !== undefined) {
    const first: string = text.substring(0, 6)
    const end: string = text.substring(text.length, text.length - length)
    return `********${end}`
  }
  return `Input a string!!`
}

export const emailShortener = (email: string, length: number = 6, showFirstCharacter:boolean = true, replacer:string = '*') => {
  if(email !== undefined){
    // ideally, you should test the email string for '@'
    const splitter = email.split('@')
    let str = replacer.repeat(length) + splitter[0].charAt(splitter[0].length -1) + '@' + splitter[1]
    if(showFirstCharacter){
      str = splitter[0].slice(0, 3) + str.substring(1, str.length + 1)
    }

    return str;
  }

  return ''
}
