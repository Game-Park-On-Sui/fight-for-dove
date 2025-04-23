import {_decorator, Component, Node, NodePool, Prefab, instantiate, AudioClip} from 'cc';
import {AudioManager} from "db://assets/Scripts/AudioManager";
import {EnemyManager} from "db://assets/Scripts/EnemyManager";
import {UserInfoType} from "db://assets/Scripts/tsrpc/protocols/PtlGetGameInfo";

const {ccclass, property} = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({type: Prefab})
    dmgTextPrefab: Prefab = null;
    @property({type: AudioClip})
    bgMusic: AudioClip = null;

    // ------ Instance ------
    private static _instance: GameManager = null;
    static get instance() {
        return this._instance;
    }

    start() {
        GameManager._instance = this;
        AudioManager.inst.play(this.bgMusic, true, 0.3);
    }

    // ------ NodePool ------
    private _nodePool: {
        [key: string]: NodePool
    } = {};

    getPool(name: string) {
        if (!this._nodePool.hasOwnProperty(name))
            this._nodePool[name] = new NodePool();
        return this._nodePool[name];
    }

    getNode(prefab: Prefab = this.dmgTextPrefab) {
        const pool = this.getPool(prefab.name);
        return pool.size() > 0 ? pool.get() : instantiate(prefab);
    }

    putNode(node: Node) {
        if (!node)
            return;
        const pool = this.getPool(node.name);
        pool.put(node);
    }

    // ------ Player ------
    private _playerIsAttacking = false;

    set playerIsAttacking(isAttacking: boolean) {
        this._playerIsAttacking = isAttacking;
    }

    get playerIsAttacking() {
        return this._playerIsAttacking;
    }

    // ------ UI ------
    @property({type: Node})
    startUI: Node = null;
    @property({type: Node})
    inGameUI: Node = null;
    @property({type: Node})
    endUI: Node = null;
    @property({type: Node})
    enemyManager: Node = null;

    handleClickStartGame() {
        this.showUI(-1);
        this.enemyManager.active = true;
        this.enemyManager.getComponent(EnemyManager).clearAllNodes();
        this.scheduleOnce(() => {
            this.inGameUI.active = true;
            this.enemyManager.active = false;
        }, 10);
    }

    showUI(idx: number) {
        this.startUI.active = idx === 0;
        this.inGameUI.active = idx === 1;
        this.endUI.active = idx === 2;
    }

    // ------ game info ------
    private _curLevel = 0;
    private _newGameCount = 0;

    refreshGameInfo(info: UserInfoType) {
        this._curLevel = info.fields.value.fields.game_state === "Ready" ? 1 : info.fields.value.fields.game_state.length + 1;
        this._newGameCount = Number(info.fields.value.fields.can_new_game_amount);
        this.showUI(info.fields.value.fields.game_state === "Ready" ? 0 : (info.fields.value.fields.game_state === "End" ? 2 : 1));
    }
}

