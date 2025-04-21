import {_decorator, Component, Node, NodePool, Prefab, instantiate} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({type: Prefab})
    dmgTextPrefab: Prefab = null;

    private static _instance: GameManager = null;
    static get instance() {
        return this._instance;
    }

    private _nodePool: {
        [key: string]: NodePool
    } = {};

    start() {
        GameManager._instance = this;
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

