import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ElementControl')
export class ElementControl extends Component {
  
    setEnable(){
        this.node.active = true;
    }

    setDisable(){
        this.node.active = false;
    }
}


