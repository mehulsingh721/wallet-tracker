import { parseAbiItem } from "viem";
import { publicClient } from "./data-source";
import { getTokenInfo } from "./helpers/token.helpers";
import { Block, ethers } from "ethers";
import { saveErc20Token } from "./helpers/erc20.helper";
import { saveEthToken } from "./helpers/eth.helper";
import { saveNft } from "./helpers/nft.helper";

const zeroth = "0x0000000000000000000000000000000000000000";

const BLOCK_NUMBER = 18258008

export const erc20TransferEventWatcher = async () => {
    try {
        publicClient.watchEvent({
            event: parseAbiItem(
                "event Transfer(address indexed, address indexed, uint)"
            ),
            onLogs: async (logs: any) => {
                if (logs.length !== 0) {
                    for (let j = 0; j < logs.length; j++) {
                        if (logs[j].args.length > 1) {
                            const token: string = logs[j]["address"];
                            const from = logs[j].args[0];
                            const to = logs[j].args[1];
                            await saveErc20Token(from, token, -1);
                            await saveErc20Token(to, token, 1);
                        }
                    }
                }

            }
        });

    } catch (err) {
        console.log(err);
    }
};
export const ethTransferEventWatcher = async () => {
    try {
        publicClient.watchBlocks({
            onBlock: async (block) => {
                const transactions = block.transactions
                if (transactions.length !== 0) {
                    for (let j = 0; j < transactions.length; j++) {
                        const transaction = await publicClient.getTransaction({
                            hash: transactions[j],
                        });
                        const token: string = "native";
                        const from = transaction?.from?.toLowerCase();
                        const to = transaction?.to?.toLowerCase();
                        const amount = transaction.value;
                        await saveEthToken(from, token, BigInt(1), "sub");
                        await saveEthToken(to, token, BigInt(1), "add");
                    }
                }

            }
        })
    } catch (err) {
        console.log(err);
    }
};

export const nft721TrasferEventWatcher = async () => {
    try {
        const event =
            "event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)";
        const currentBlockNumber = await publicClient.getBlockNumber();

        publicClient.watchEvent({
            event: parseAbiItem(event),
            onLogs: async (logs: any) => {
                if (logs.length !== 0) {
                    for (let j = 0; j < logs.length; j++) {
                        const collection: string = logs[j]["address"];
                        const from = logs[j].args["_from"];
                        const to = logs[j].args["_to"];
                        const toknenId = logs[j].args["_tokenId"];

                        if (toknenId && to && from) {
                            if (from !== zeroth) {
                                await saveNft(
                                    collection,
                                    from,
                                    toknenId.toString(),
                                    -1,
                                    "ERC721"
                                );
                            }
                            await saveNft(collection, to, toknenId.toString(), 1, "ERC721");
                        }
                    }
                }
            }
        });


    } catch (err) {
        console.log(err);
    }
};

export const nft1155TrasferEventWatcher = async () => {
    try {
        const event1 =
            "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)";

        publicClient.watchEvent({
            event: parseAbiItem(event1),
            onLogs: async (logs) => {
                if (logs.length !== 0) {
                    for (let j = 0; j < logs.length; j++) {
                        const collection: string = logs[j].address;
                        const from = logs[j].args["from"];
                        const to = logs[j].args["to"];
                        const toknenId = logs[j].args["id"].toString();
                        const quantity = logs[j].args["value"];
                        if (from !== zeroth) {
                            await saveNft(collection, from, toknenId, -quantity, "ERC1155");
                        }
                        await saveNft(collection, to, toknenId, quantity, "ERC1155");
                    }
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
};

export const nft1155BatchTrasferEventWatcher = async () => {
    try {
        const event2 =
            "event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)";

        publicClient.watchEvent({
            event: parseAbiItem(event2),
            onLogs: async (logs) => {
                if (logs.length !== 0) {
                    for (let j = 0; j < logs.length; j++) {
                        const collection: string = logs[j].address;
                        const from = logs[j].args["from"];
                        const to = logs[j].args["to"];
                        const ids = logs[j].args.ids;
                        for (let i = 0; i < ids.length; i++) {
                            const toknenId = ids[i].toString();
                            const quantity = logs[i];

                            if (from !== zeroth) {
                                await saveNft(collection, from, toknenId, -quantity, "ERC1155");
                            }
                            await saveNft(collection, to, toknenId, quantity, "ERC1155");
                        }
                    }
                }
            }
        });


    } catch (err) {
        console.log(err);
    }
};
// 18219792