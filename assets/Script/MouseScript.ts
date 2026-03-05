import { _decorator, Component, EventTouch, input, Input, Node } from 'cc';
import { HeroController } from './Hero/HeroController';
const { ccclass, property } = _decorator;

@ccclass('MouseScript')
export class MouseScript extends Component {

    @property(HeroController)
    heroController: HeroController = null;
    
    onLoad() {
        input.on(Input.EventType.TOUCH_END, this.onClick, this);
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_END, this.onClick, this);
    }

    private onClick(event: EventTouch ) {
        console.log('Mouse down:', event.currentTarget.name);
        this.heroController.recieveClick();
    }

    /*
    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, this.onClick, this);
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_END, this.onClick, this);
    }

    private onClick(event: EventTouch) {
        // event.currentTarget теперь = this.node
        const target = event.currentTarget as Node;
        console.log('Clicked node:', target.name);
    }*/

    start() {

    }

    update(deltaTime: number) {

    }
}


