import {_decorator, Component, EditBox, Node, Label} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('Login')
export class Login extends Component {
    @property({type: EditBox})
    username: EditBox = null;
    @property({type: EditBox})
    password: EditBox = null;
    @property({type: EditBox})
    address: EditBox = null;
    @property({type: Label})
    confirmLabel: Label = null;
    @property({type: Node})
    startNode: Node = null;

    onLoad() {
        this.readInfo();
    }

    readInfo() {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        const address = localStorage.getItem("address");
        if (!username || !password || !address)
            return;
        this.username.string = username;
        this.password.string = password;
        this.address.string = address;
    }

    writeInfo() {
        localStorage.setItem("username", this.username.string);
        localStorage.setItem("password", this.password.string);
        localStorage.setItem("address", this.address.string);
    }

    handleClickConfirm() {
        if (this.confirmLabel.string === "...")
            return;
        this.startNode.active = true;
        this.node.active = false;
    }
}

