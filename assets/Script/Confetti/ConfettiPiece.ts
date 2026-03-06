import { _decorator, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ConfettiPiece')
export class ConfettiPiece extends Component {
    @property
    public gravity: number = 1400;

    private _velocity: Vec3 = new Vec3();
    private _rotationSpeed: number = 0;
    private _lifeTime: number = 1.5;
    private _time: number = 0;

    public Init(velocity: Vec3, rotationSpeed: number, lifeTime: number) {
        this._velocity.set(velocity);
        this._rotationSpeed = rotationSpeed;
        this._lifeTime = lifeTime;
        this._time = 0;
    }

    update(dt: number) {
        this._time += dt;

        // гравитация вниз
        this._velocity.y -= this.gravity * dt;

        // движение
        const pos = this.node.position;
        this.node.setPosition(
            pos.x + this._velocity.x * dt,
            pos.y + this._velocity.y * dt,
            pos.z
        );

        // вращение
        this.node.angle += this._rotationSpeed * dt;

        // удалить по таймеру
        if (this._time >= this._lifeTime) {
            this.node.destroy();
        }
    }
}