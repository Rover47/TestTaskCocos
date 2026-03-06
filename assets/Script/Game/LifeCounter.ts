import { _decorator, Component, Node, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LifeCounter')
export class LifeCounter extends Component {
    @property({ type: [Node] })
    public hearts: Node[] = [];
    // Сюда перетаскиваешь 3 сердечка в порядке: 1, 2, 3

    @property({ type: [EventHandler] })
    public onNoLivesEvents: EventHandler[] = [];
    // Сюда в инспекторе добавляешь кастомные события "при смерти"

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

        if (this.lives <= 0) {
            this.isDead = true;
            EventHandler.emitEvents(this.onNoLivesEvents, this);
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