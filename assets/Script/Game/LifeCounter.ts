import { _decorator, Component, Node, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LifeCounter')
export class LifeCounter extends Component {
    @property({ type: [Node] })
    public hearts: Node[] = [];
    
    @property({ type: [EventHandler] })
    public onHitEvents: EventHandler[] = [];

    @property({ type: [EventHandler] })
    public onNoLivesEvents: EventHandler[] = [];

    private lives: number = 3;
    private isDead: boolean = false;

    start() {
        this.refreshHearts();
    }

    public TakeDamage() {
        if (this.isDead) return;

        this.lives -= 1;

        if (this.lives < 0) {
            this.lives = 0;
        }

        this.refreshHearts();
        
        EventHandler.emitEvents(this.onHitEvents, this);

        if (this.lives <= 0) {
            this.isDead = true;
            console.log("DEAD")
            EventHandler.emitEvents(this.onNoLivesEvents, this);
            console.log("DEAD All")
        }
    }

    public ResetLives() {
        this.lives = 3;
        this.isDead = false;
        this.refreshHearts();
    }

    public GetLives(): number {
        return this.lives;
    }

    private refreshHearts() {
        for (let i = 0; i < this.hearts.length; i++) {
            if (!this.hearts[i]) continue;
            this.hearts[i].active = i < this.lives;
        }
    }
}