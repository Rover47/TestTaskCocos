import { _decorator, Component, EventHandler, Node } from 'cc';
import { AnimatioControl } from './AnimatioControl';
import { JumpComponent } from './JumpComponent';
import { LifeCounter } from '../Game/LifeCounter';
import { MoveBackground } from '../MoveBackground';
const { ccclass, property } = _decorator;

@ccclass('HeroController')
export class HeroController extends Component {

    @property(AnimatioControl)
    heroAnim: AnimatioControl = null;

    @property(MoveBackground)
    moveBack:MoveBackground = null;

    @property(JumpComponent)
    jumpComponent: JumpComponent = null;

    @property(LifeCounter)
    lifeCounter: LifeCounter = null;

    @property({ type: Boolean })
    private isGameStart = false;

    private isGameFinish = false;

    @property({ type: [EventHandler], tooltip: 'Start gjump' })
    public onTriggered: EventHandler[] = [];

    @property({ type: [EventHandler], tooltip: 'Finish game' })
    public onFinish: EventHandler[] = [];


    public trigger() {
        EventHandler.emitEvents(this.onTriggered);
    }

      public finish() {
        EventHandler.emitEvents(this.onFinish);
    }

    public startGame() {
        this.isGameStart = true;
        this.trigger();
        this.heroAnim.playIdle();
    }

     public finishGame() {
        this.isGameFinish = true;
        this.finish();
        this.heroAnim.playIdle();
    }
    
     public failGame() {
        this.isGameFinish = true;
        this.heroAnim.playIdle();
    }

    public recieveClick() {

        if (this.isGameFinish == true) {
            console.log("Game Is FINISH")
            return;
        }

        this.moveBack.startBack();
        
        if (this.isGameStart == false) {
            console.log("Game Not started")
            this.heroAnim.playRun();
            return;
        }

        if (this.heroAnim.IsAnimBisy() == true) {
            console.log("Anim Bisy")
            return;
        }

        this.heroAnim.playJumpThenRun();
        this.jumpComponent.jump();
    }

    public reciveHit()    {
        this.heroAnim.playHitThenRun();
        this.lifeCounter.TakeDamage();
    }

}


