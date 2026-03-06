import { _decorator, Component, EventHandler, Node } from 'cc';
import { AnimatioControl } from './AnimatioControl';
import { JumpComponent } from './JumpComponent';
import { LifeCounter } from '../Game/LifeCounter';
const { ccclass, property } = _decorator;

@ccclass('HeroController')
export class HeroController extends Component {

    @property(AnimatioControl)
    heroAnim: AnimatioControl = null;

    @property(JumpComponent)
    jumpComponent: JumpComponent = null;

    @property(LifeCounter)
    lifeCounter: LifeCounter = null;

    @property({ type: Boolean })
    private isGameStart = false;

    private isGameFinish = false;

    @property({ type: [EventHandler], tooltip: 'Колбэки, настраиваемые в инспекторе' })
    public onTriggered: EventHandler[] = [];

    public trigger() {
        EventHandler.emitEvents(this.onTriggered);
    }

    public startGame() {
        this.isGameStart = true;
        this.trigger();
        this.heroAnim.playIdle();
    }

    public recieveClick() {

        if (this.isGameFinish == true) {
            console.log("Game Is FINISH")
            return;
        }

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


