import {
    _decorator,
    Component,
    Node,
    Prefab,
    instantiate,
    Vec3,
    randomRange,
    Sprite,
    SpriteFrame,
} from 'cc';
import { ConfettiPiece } from './ConfettiPiece';

const { ccclass, property } = _decorator;

@ccclass('ConfettiBurst')
export class ConfettiBurst extends Component {
    @property(Prefab)
    public confettiPrefab: Prefab | null = null;

    @property(Node)
    public spawnParent: Node | null = null;

    @property([SpriteFrame])
    public spriteFrames: SpriteFrame[] = [];

    @property
    public minCount: number = 20;

    @property
    public maxCount: number = 35;

    @property
    public minSpeed: number = 500;

    @property
    public maxSpeed: number = 900;

    @property
    public directionAngle: number = 90;

    @property
    public coneAngle: number = 60;

    @property
    public startDelay: number = 0;

    @property
    public spawnDuration: number = 0;

    @property
    public minRotationSpeed: number = -720;

    @property
    public maxRotationSpeed: number = 720;

    @property
    public minLifeTime: number = 1.0;

    @property
    public maxLifeTime: number = 1.8;

    private _burstToken: number = 0;

    public PlayBurst() {
        if (!this.confettiPrefab) return;

        const parent = this.spawnParent ? this.spawnParent : this.node.parent;
        if (!parent) return;

        this._burstToken++;
        const currentToken = this._burstToken;

        const count = Math.floor(randomRange(this.minCount, this.maxCount + 1));
        if (count <= 0) return;

        for (let i = 0; i < count; i++) {
            let delay = this.startDelay;

            if (this.spawnDuration > 0 && count > 1) {
                delay += (i / (count - 1)) * this.spawnDuration;
            }

            this.scheduleOnce(() => {
                if (currentToken !== this._burstToken) return;
                this.spawnOne(parent);
            }, delay);
        }
    }

    public StopScheduledBurst() {
        this._burstToken++;
        this.unscheduleAllCallbacks();
    }

    private spawnOne(parent: Node) {
        if (!this.confettiPrefab) return;

        const piece = instantiate(this.confettiPrefab);
        piece.setParent(parent);
        piece.setWorldPosition(this.node.worldPosition);

        if (this.spriteFrames.length > 0) {
            const sprite = piece.getComponent(Sprite);
            if (sprite) {
                const id = Math.floor(Math.random() * this.spriteFrames.length);
                sprite.spriteFrame = this.spriteFrames[id];
            }
        }

        const scale = randomRange(0.7, 1.2);
        piece.setScale(scale, scale, 1);

        const halfCone = this.coneAngle * 0.5;
        const angleDeg = randomRange(
            this.directionAngle - halfCone,
            this.directionAngle + halfCone
        );

        const angleRad = angleDeg * Math.PI / 180.0;
        const speed = randomRange(this.minSpeed, this.maxSpeed);

        const velocity = new Vec3(
            Math.cos(angleRad) * speed,
            Math.sin(angleRad) * speed,
            0
        );

        const rotationSpeed = randomRange(this.minRotationSpeed, this.maxRotationSpeed);
        const lifeTime = randomRange(this.minLifeTime, this.maxLifeTime);

        const pieceComp = piece.getComponent(ConfettiPiece);
        if (pieceComp) {
            pieceComp.Init(velocity, rotationSpeed, lifeTime);
        }
    }
}