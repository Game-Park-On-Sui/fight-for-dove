'use client'

import {createBetterTxFactory, network, networkConfig, suiClient} from "@/configs/networkConfig";
import {coinWithBalance} from "@mysten/sui/transactions";

export async function getGP(owner: string | undefined) {
    if (!owner)
        return "0";
    return (await suiClient.getBalance({
        owner,
        coinType: `${networkConfig[network].variables.GP.PackageID}::gp::GP`
    })).totalBalance;
}

type FFDataType = {
    fields: {
        users: {
            fields: {
                id: {
                    id: string
                }
            }
        }
    }
}

type UserInfoType = {
    fields: {
        value: {
            fields: {
                game_state: string,
                can_new_game_amount: string,
                in_game_props: any[]
            }
        }
    }
}

async function getGameCountInTable(parentId: string, cursor: string | null | undefined, user: string): Promise<UserInfoType> {
    const data = await suiClient.getDynamicFields({
        parentId,
        cursor
    });
    const found = data.data.find(data => data.name.value as string === user);
    if (!found)
        return data.hasNextPage ? await getGameCountInTable(parentId, data.nextCursor, user) : {
            fields: {
                value: {
                    fields: {
                        game_state: "Ready",
                        can_new_game_amount: "0",
                        in_game_props: []
                    }
                }
            }
        };
    const info = await suiClient.getObject({
        id: found.objectId,
        options: {
            showContent: true
        }
    });
    return info.data?.content as unknown as UserInfoType;
}

export async function getGameCount(user: string | undefined) {
    if (!user)
        return {
            fields: {
                value: {
                    fields: {
                        game_state: "Ready",
                        can_new_game_amount: "0",
                        in_game_props: []
                    }
                }
            }
        };
    const data = await suiClient.getObject({
        id: networkConfig[network].variables.FFD.Data,
        options: {
            showContent: true
        }
    });
    return await getGameCountInTable((data.data?.content as unknown as FFDataType).fields.users.fields.id.id, null, user);
}

export const buyGameCountTx = createBetterTxFactory<{
    sender: string,
    count: number
}>((tx, networkVariables, params) => {
    tx.setSender(params.sender);
    tx.moveCall({
        package: networkVariables.FFD.PackageID,
        module: "data",
        function: "buy_game_amount",
        arguments: [
            tx.object(networkVariables.FFD.Data),
            coinWithBalance({
                balance: params.count * 10,
                type: `${networkVariables.GP.PackageID}::gp::GP`
            }),
            tx.object(networkVariables.GP.GPTreasuryCap),
            tx.object(networkVariables.GP.Pool)
        ]
    });
    return tx;
});