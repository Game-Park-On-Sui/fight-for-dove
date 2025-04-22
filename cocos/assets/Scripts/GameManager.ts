import {_decorator, Component, Node, NodePool, Prefab, instantiate, AudioClip} from 'cc';
import {AudioManager} from "db://assets/Scripts/AudioManager";

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
}

