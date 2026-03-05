import { _decorator, Component, Node } from 'cc';
import { AnimatioControl } from './AnimatioControl';
const { ccclass, property } = _decorator;

@ccclass('HeroController')
export class HeroController extends Component {

    @property(AnimatioControl)
    heroAnim: AnimatioControl = null;

    
    @property({type : Boolean})
    private isGameStart = false;

    start() {

    }

    update(deltaTime: number) {
        
    }

    public startGame (){
        this.isGameStart = true;
    }

    public recieveClick(){
        if(this.isGameStart == false) {
            console.log("Game Not started")
            return;
        }

        this.heroAnim.playJumpThenRun();
    }
}


