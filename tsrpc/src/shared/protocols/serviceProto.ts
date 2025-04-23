import { ServiceProto } from 'tsrpc-proto';
import { ReqDropAll, ResDropAll } from './PtlDropAll';
import { ReqEndGame, ResEndGame } from './PtlEndGame';
import { ReqGetGameInfo, ResGetGameInfo } from './PtlGetGameInfo';
import { ReqLogin, ResLogin } from './PtlLogin';
import { ReqNewGame, ResNewGame } from './PtlNewGame';
import { ReqNextLevel, ResNextLevel } from './PtlNextLevel';

export interface ServiceType {
    api: {
        "DropAll": {
            req: ReqDropAll,
            res: ResDropAll
        },
        "EndGame": {
            req: ReqEndGame,
            res: ResEndGame
        },
        "GetGameInfo": {
            req: ReqGetGameInfo,
            res: ResGetGameInfo
        },
        "Login": {
            req: ReqLogin,
            res: ResLogin
        },
        "NewGame": {
            req: ReqNewGame,
            res: ResNewGame
        },
        "NextLevel": {
            req: ReqNextLevel,
            res: ResNextLevel
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
            "name": "DropAll",
            "type": "api"
        },
        {
            "id": 1,
            "name": "EndGame",
            "type": "api"
        },
        {
            "id": 2,
            "name": "GetGameInfo",
            "type": "api"
        },
        {
            "id": 3,
            "name": "Login",
            "type": "api"
        },
        {
            "id": 4,
            "name": "NewGame",
            "type": "api"
        },
        {
            "id": 5,
            "name": "NextLevel",
            "type": "api"
        }
    ],
    "types": {
        "PtlDropAll/ReqDropAll": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlDropAll/ResDropAll": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "success",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "PtlEndGame/ReqEndGame": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlEndGame/ResEndGame": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "success",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
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
        },
        "PtlNewGame/ReqNewGame": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlNewGame/ResNewGame": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "success",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "PtlNextLevel/ReqNextLevel": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlNextLevel/ResNextLevel": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "success",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        }
    }
};