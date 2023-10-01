import { erc1155Abi } from "../abi/erc1155.abi"
import { erc20Abi } from "../abi/erc20.abi"
import { erc721Abi } from "../abi/erc721.abi"
import { publicClient } from "../data-source"

export const readTokenContract = async (tokenAddress: any, functionName: any, args: any) => {
    return await publicClient.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: functionName,
        args: args
    })
}

export const read721Contract = async (collectionAddress: any, functionName: any, args: any) => {
    return await publicClient.readContract({
        address: collectionAddress,
        abi: erc721Abi,
        functionName: functionName,
        args: args
    })
}

export const read1155Contract = async (collectionAddress: any, functionName: any, args: any) => {
    return await publicClient.readContract({
        address: collectionAddress,
        abi: erc1155Abi,
        functionName: functionName,
        args: args
    })
}