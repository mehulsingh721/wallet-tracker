import { erc20Abi } from "../abi/erc20.abi"
import { publicClient } from "../data-source"

export const readTokenContract = async (tokenAddress: any, functionName: any, args: any) => {
    return await publicClient.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: functionName,
        args: args
    })
}