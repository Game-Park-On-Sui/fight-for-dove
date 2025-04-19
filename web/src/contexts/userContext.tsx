'use client'

import {createContext, ReactNode, useEffect, useState} from "react";
import {useCurrentAccount, useResolveSuiNSName} from "@mysten/dapp-kit";
import {getGP} from "@/libs/contracts";

type UserInfoType = {
    account: string | null | undefined,
    suiName: string | null | undefined,
    accountLabel: string | null | undefined,
    gp: string | null | undefined,
    refreshInfo: () => void
}

export const UserContext = createContext<UserInfoType>({
    account: undefined,
    suiName: undefined,
    accountLabel: undefined,
    gp: undefined,
    refreshInfo: () => {},
});

export default function UserContextProvider({children}: {children: ReactNode}) {
    const account = useCurrentAccount();
    const {data: suiName} = useResolveSuiNSName(account?.address);
    const [gp, setGp] = useState<string>("");

    useEffect(() => {
        getGP(account?.address).then(gp => setGp(gp));
    }, [account]);

    const refreshInfo = () => {
        getGP(account?.address).then(gp => setGp(gp));
    }

    return (
        <UserContext.Provider value={{
            account: account?.address,
            suiName,
            accountLabel: account?.label,
            gp,
            refreshInfo,
        }}>
            {children}
        </UserContext.Provider>
    );
}