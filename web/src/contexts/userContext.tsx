'use client'

import {createContext, ReactNode, useCallback, useEffect, useState} from "react";
import {useCurrentAccount, useResolveSuiNSName} from "@mysten/dapp-kit";
import {getGameCount, getGP, getNFTID} from "@/libs/contracts";

type UserInfoType = {
    account: string | null | undefined,
    suiName: string | null | undefined,
    accountLabel: string | null | undefined,
    gp: string | null | undefined,
    gameCount: string | null | undefined,
    refreshInfo: () => void,
    gameState: string | null | undefined,
    nftID: string | null | undefined,
}

export const UserContext = createContext<UserInfoType>({
    account: undefined,
    suiName: undefined,
    accountLabel: undefined,
    gp: undefined,
    gameCount: undefined,
    refreshInfo: () => {},
    gameState: undefined,
    nftID: undefined
});

export default function UserContextProvider({children}: {children: ReactNode}) {
    const account = useCurrentAccount();
    const {data: suiName} = useResolveSuiNSName(account?.address);
    const [gp, setGp] = useState<string>("");
    const [gameState, setGameState] = useState<string>("");
    const [gameCount, setGameCount] = useState<string>("");
    const [nftID, setNftID] = useState<string | null | undefined>("");

    const refreshInfo = useCallback(() => {
        getGP(account?.address).then(gp => setGp(gp));
        getGameCount(account?.address).then(userInfo => {
            setGameState(userInfo.fields.value.fields.game_state);
            setGameCount(userInfo.fields.value.fields.can_new_game_amount);
        });
        getNFTID(account?.address, null).then(nftID => setNftID(nftID));
    }, [account]);

    useEffect(() => {
        refreshInfo();
    }, [refreshInfo]);

    return (
        <UserContext.Provider value={{
            account: account?.address,
            suiName,
            accountLabel: account?.label,
            gp,
            gameCount,
            refreshInfo,
            gameState,
            nftID,
        }}>
            {children}
        </UserContext.Provider>
    );
}