import {_decorator, Component, Animation, input, Input, EventKeyboard, KeyCode, Vec3} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property({type: Animation})
    anim: Animation = null;

    private _moveDir = 1;
    private _speed = 0;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(deltaTime: number) {
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
        if (event.keyCode !== KeyCode.KEY_A && event.keyCode !== KeyCode.KEY_D)
            return;
        this._moveDir = event.keyCode === KeyCode.KEY_A ? -1 : 1;
        this.node.scale = new Vec3(this._moveDir, 1, 1);
        this._speed = 100;
        this.anim.play("PlayerRun");
    }

    onKeyUp(event: EventKeyboard) {
        if (event.keyCode !== KeyCode.KEY_A && event.keyCode !== KeyCode.KEY_D)
            return;
        this._speed = 0;
        this.anim.play("PlayerIdle");
    }
}

