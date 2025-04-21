import {_decorator, Component, Node, NodePool, Prefab, instantiate, AudioClip} from 'cc';
import {AudioManager} from "db://assets/Scripts/AudioManager";

const {ccclass, property} = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({type: Prefab})
    dmgTextPrefab: Prefab = null;
    @property({type: AudioClip})
    bgMusic: AudioClip = null;

    private static _instance: GameManager = null;
    static get instance() {
        return this._instance;
    }

    private _nodePool: {
        [key: string]: NodePool
    } = {};

    start() {
        GameManager._instance = this;
        AudioManager.inst.play(this.bgMusic, true, 0.3);
    }

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
}

