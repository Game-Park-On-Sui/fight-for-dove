import { _decorator, Component, Label } from 'cc';
import {PlayerInfoType} from "db://assets/Scripts/GameManager";

const { ccclass, property } = _decorator;

@ccclass('PlayerInfo')
export class PlayerInfo extends Component {
    @property({type: Label})
    hp: Label = null;
    @property({type: Label})
    attack: Label = null;
    @property({type: Label})
    criticalHitRate: Label = null;
    @property({type: Label})
    criticalDamage: Label = null;
    @property({type: Label})
    moveSpeed: Label = null;

    showInfo(info: PlayerInfoType) {
        this.hp.string = info.hp.toString();
        this.attack.string = info.attack.toString();
        this.criticalHitRate.string = (info.criticalHitRate * 100).toString() + "%";
        this.criticalDamage.string = (info.criticalDamage * 100).toString() + "%";
        this.moveSpeed.string = info.moveSpeed.toString();
    }
}

