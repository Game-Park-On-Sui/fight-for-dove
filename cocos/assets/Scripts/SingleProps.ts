import {_decorator, Component, Sprite, Widget, Node} from 'cc';
import {PropsType} from "db://assets/Scripts/tsrpc/protocols/PtlGetGameInfo";
import {GameManager} from "db://assets/Scripts/GameManager";

const {ccclass} = _decorator;

@ccclass('SingleProps')
export class SingleProps extends Component {
    private _propsID = "";
    private _propsType = "";
    private _quality = "";
    private _imageURL = "";
    private _effects: {
        key: string,
        value: string
    }[] = [];
    private _isChosen = false;
    private _sprite: Sprite = null;
    private _widget: Widget = null;

    onLoad() {
        this._sprite = this.getComponent(Sprite);
        this._widget = this.getComponent(Widget);
    }

    start() {
        this.node.on(Node.EventType.MOUSE_ENTER, this.handleHover, this);
        this.node.on(Node.EventType.MOUSE_LEAVE, this.handleLeave, this);
    }

    onDestroy() {
        this.node.off(Node.EventType.MOUSE_ENTER, this.handleHover, this);
        this.node.off(Node.EventType.MOUSE_LEAVE, this.handleLeave, this);
    }

    init(props: PropsType, left: number) {
        this._propsID = props.fields.id.id;
        this._propsType = props.fields.props_type;
        this._quality = props.fields.quality;
        this._imageURL = props.fields.image_url;
        this._effects = props.fields.effects.fields.contents.map(content => {
            return {
                key: content.fields.key,
                value: content.fields.value
            }
        });
        this._widget.target = this.node.parent;
        this._widget.left = left;
    }

    handleClickProps() {
        if (this._isChosen) {
            this._sprite.grayscale = this._isChosen;
            this._isChosen = !this._isChosen;
            GameManager.instance.editEquippedIds(this._propsID, false);
            return;
        }
        if (!GameManager.instance.checkIfEquipMore())
            return;
        this._sprite.grayscale = this._isChosen;
        this._isChosen = !this._isChosen;
        GameManager.instance.editEquippedIds(this._propsID, true);
    }

    handleHover() {
        GameManager.instance.calcFakePlayerInfo(this._propsID, true);
    }

    handleLeave() {
        GameManager.instance.calcFakePlayerInfo(this._propsID, false);
    }
}

