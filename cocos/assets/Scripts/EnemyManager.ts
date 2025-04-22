import {_decorator, Component, Prefab} from 'cc';
import {GameManager} from "db://assets/Scripts/GameManager";
import {Enemy} from "db://assets/Scripts/Enemy";

const {ccclass, property} = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property({type: Prefab})
    enemyPrefab: Prefab = null;

    update() {
        if (this.canGenerateEnemy()) {
            this.generateEnemy();
        }
    }

    canGenerateEnemy() {
        return Math.random() * 666 < 1;
    }

    generateEnemy() {
        const enemy = GameManager.instance.getNode(this.enemyPrefab);
        enemy.setParent(this.node);
        enemy.setPosition((Math.random() < 0.5 ? 1 : -1) * Math.random() * 500, Math.random() * 365, 0);
        enemy.getComponent(Enemy).init(5000);
    }
}

