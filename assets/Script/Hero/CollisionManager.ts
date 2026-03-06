import {
    _decorator,
    Component,
    Collider2D,
    Contact2DType,
    IPhysics2DContact,
    PhysicsSystem2D,
} from 'cc';
import { HeroController } from './HeroController';
import { UICoinFlyFixedValue } from '../Wallet/UICoinFlyFixedValue';

const { ccclass, property } = _decorator;

@ccclass('CollisionManager')
export class CollisionManager extends Component {
    @property({ tooltip: 'Log To Console' })
    logToConsole = true;
    
    @property(HeroController)
    heroController: HeroController = null;

    private col: Collider2D | null = null;

    onLoad() {
        PhysicsSystem2D.instance.enable = true;

        this.col = this.getComponent(Collider2D);
        if (!this.col) {
            console.warn('[CollisionManager] not found Collider2D');
            return;
        }

        this.col.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //this.col.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }

    onDestroy() {
        if (!this.col) return;
        this.col.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //this.col.off(Contact2DType.END_CONTACT, this.onEndContact, this);
    }

    private onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        if (this.logToConsole) {
            console.log(`[CollisionManager] BEGIN: ${self.node.name} <-> ${other.node.name}`);
        }

        this.onCollisionEnter(other, contact);
    }

    private onEndContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        if (this.logToConsole) {
            console.log(`[CollisionManager] END: ${self.node.name} <-> ${other.node.name}`);
        }

        this.onCollisionExit(other, contact);
    }

    protected onCollisionEnter(other: Collider2D, contact: IPhysics2DContact | null) {
        if (other.node.name === 'first-tutor') { 
            this.heroController.startGame();
        }
        else if(other.node.name === 'Cone' || other.node.name === 'Enemy')
        {
            this.heroController.reciveHit();
        }
        else if(other.node.name === 'Coin')
        {
            other.node.getComponent(UICoinFlyFixedValue)?.PlayFlyToCounter();
        }
         else if(other.node.name === 'Finish')
        {
            this.heroController.finishGame();
        }
    }

    protected onCollisionExit(other: Collider2D, contact: IPhysics2DContact | null) {
        // ...
    }
}