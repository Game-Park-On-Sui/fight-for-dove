import {_decorator, Component, Animation, input, Input, EventKeyboard, KeyCode, Vec3, AudioClip} from 'cc';
import {AudioManager} from "db://assets/Scripts/AudioManager";

const {ccclass, property} = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property({type: Animation})
    anim: Animation = null;
    @property({type: AudioClip})
    attackMusic: AudioClip = null;

    private _moveDir = 1;
    private _speed = 0;
    private _attackTimer = 0;
    private _isRunning = false;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(deltaTime: number) {
        if (this._attackTimer > 0) {
            this._attackTimer -= deltaTime;
            return;
        }
        const pos = this.node.getPosition();
        let destX = pos.x + this._moveDir * this._speed * deltaTime;
        destX = Math.min(destX, 600);
        destX = Math.max(destX, -600);
        this.node.setPosition(destX, pos.y, 0);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        if (event.keyCode === KeyCode.KEY_J && this._attackTimer <= 0) {
            this._attackTimer = 1;
            this.anim.play("PlayerAttack");
            this.scheduleOnce(() => this.anim.play(this._isRunning ? "PlayerRun" : "PlayerIdle"), this._attackTimer);
            this.scheduleOnce(() => AudioManager.inst.playOneShot(this.attackMusic, 1), 0.3);
            return;
        }
        if (event.keyCode !== KeyCode.KEY_A && event.keyCode !== KeyCode.KEY_D)
            return;
        this._moveDir = event.keyCode === KeyCode.KEY_A ? -1 : 1;
        this.node.scale = new Vec3(this._moveDir, 1, 1);
        this._speed = 100;
        this.anim.play("PlayerRun");
        this._isRunning = true;
    }

    onKeyUp(event: EventKeyboard) {
        if (event.keyCode !== KeyCode.KEY_A && event.keyCode !== KeyCode.KEY_D)
            return;
        this._speed = 0;
        this.anim.play("PlayerIdle");
        this._isRunning = false;
    }
}

