'use client'

import {network, networkConfig, suiClient} from "@/configs/networkConfig";

export async function getGP(owner: string | undefined) {
    if (!owner)
        return "0";
    return (await suiClient.getBalance({
        owner,
        coinType: `${networkConfig[network].variables.GP.PackageID}::gp::GP`
    })).totalBalance;
}