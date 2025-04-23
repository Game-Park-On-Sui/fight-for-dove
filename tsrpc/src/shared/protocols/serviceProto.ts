import { ServiceProto } from 'tsrpc-proto';
import { ReqGetGameInfo, ResGetGameInfo } from './PtlGetGameInfo';
import { ReqLogin, ResLogin } from './PtlLogin';

export interface ServiceType {
    api: {
        "GetGameInfo": {
            req: ReqGetGameInfo,
            res: ResGetGameInfo
        },
        "Login": {
            req: ReqLogin,
            res: ResLogin
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 3,
    "services": [
        {
            "id": 0,
            "name": "GetGameInfo",
            "type": "api"
        },
        {
            "id": 1,
            "name": "Login",
            "type": "api"
        }
    ],
    "types": {
        "PtlGetGameInfo/ReqGetGameInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "String"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": null
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "PtlGetGameInfo/ResGetGameInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "info",
                    "type": {
                        "type": "Reference",
                        "target": "PtlGetGameInfo/UserInfoType"
                    }
                }
            ]
        },
        "PtlGetGameInfo/UserInfoType": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "fields",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "value",
                                "type": {
                                    "type": "Interface",
                                    "properties": [
                                        {
                                            "id": 0,
                                            "name": "fields",
                                            "type": {
                                                "type": "Interface",
                                                "properties": [
                                                    {
                                                        "id": 0,
                                                        "name": "game_state",
                                                        "type": {
                                                            "type": "String"
                                                        }
                                                    },
                                                    {
                                                        "id": 1,
                                                        "name": "can_new_game_amount",
                                                        "type": {
                                                            "type": "String"
                                                        }
                                                    },
                                                    {
                                                        "id": 2,
                                                        "name": "in_game_props",
                                                        "type": {
                                                            "type": "Array",
                                                            "elementType": {
                                                                "type": "Any"
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "PtlLogin/ReqLogin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "address",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlLogin/ResLogin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "state",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        }
    }
};