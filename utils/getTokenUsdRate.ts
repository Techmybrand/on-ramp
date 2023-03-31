const tokenPrices = {
    ETH: 0.01790,
    BTC: 27841,
    BNB: 316,
    RUSD: 1
}

const getTokenUsdRate = (_symbol: string, amount: number, side: 'buy' | 'sell' = 'buy') => {
    try {
        let price = 1
        const symbol = _symbol.toUpperCase();
        if(tokenPrices.hasOwnProperty(symbol)) price = tokenPrices[symbol];
        return side === 'buy' ? (amount / price) : (amount * price)
    } catch (error) {
        
    }
}

export default getTokenUsdRate