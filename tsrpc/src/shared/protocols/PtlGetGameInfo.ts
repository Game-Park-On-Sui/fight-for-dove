export type FFDataType = {
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

export type UserInfoType = {
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

export interface ReqGetGameInfo {
    user: string | null | undefined
}

export interface ResGetGameInfo {
    info: UserInfoType
}