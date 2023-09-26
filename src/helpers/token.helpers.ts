import { readTokenContract } from "./contract.helper"

export const getTokenInfo = async (tokenAddress: any) => {
    const symbol = await readTokenContract(tokenAddress, "symbol", []).catch(err => {})
    const decimals = await readTokenContract(tokenAddress, "decimals", []).catch(err => {})

    const data = {
        address: tokenAddress,
        symbol: symbol,
        decimals: decimals ? parseInt(decimals.toString()) : null
    }

    return data
}