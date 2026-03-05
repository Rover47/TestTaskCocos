import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveBackground')
export class MoveBackground extends Component {

    @property({type: Number})
    private speed = 0

    protected start() {

    }

    protected update(deltaTime: number) {
        this.node.setPosition(this.node.getPosition().x += this.speed * deltaTime, this.node.position.y)
    }

    public startBack()    {
        this.speed = -100
    }

    
    public stopBack()    {
        this.speed = 0
    }
}


