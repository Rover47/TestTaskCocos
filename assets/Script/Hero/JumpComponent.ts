import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JumpComponent')
export class JumpComponent extends Component {
        
    @property jumpSpeed = 700;   // px/sec
    @property gravity = 1800;    // px/sec^2
    @property groundY = 0;       //  (Y)
    private vy = 0;
    private isJumping = false;
    public jump() {
        if (this.isJumping) return;
        this.isJumping = true;
        this.vy = this.jumpSpeed;
    }
    
    start() {
        this.groundY = this.node.getPosition().y;
    }

    update(deltaTime: number) {
        if (!this.isJumping) return;

        this.vy -= this.gravity * deltaTime;

        const p = this.node.position;
        const ny = p.y + this.vy * deltaTime;

        // grounded
        if (ny <= this.groundY) {
            this.node.setPosition(p.x, this.groundY, p.z);
            this.isJumping = false;
            this.vy = 0;
            return;
        }

        this.node.setPosition(p.x, ny, p.z);
    }
}


