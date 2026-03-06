import { _decorator, Component, Node, tween, Vec3, UITransform } from 'cc';
import { CoinCounter } from './CoinCounter';

const { ccclass, property } = _decorator;

@ccclass('UICoinFlyFixedValue')
export class UICoinFlyFixedValue extends Component {
    @property(Node)
    public flyRoot: Node | null = null; 
    // Обычно Canvas или отдельная нода поверх UI

    @property(Node)
    public counterTarget: Node | null = null; 
    // Точка/иконка счетчика, куда летит монета

    @property(CoinCounter)
    public counter: CoinCounter | null = null;

    @property
    public reward: number = 1; 
    // Значение этой конкретной монеты, задается заранее в инспекторе

    @property
    public flyTime: number = 0.45;

    @property
    public targetScale: number = 0.35;

    @property
    public destroyAfterFly: boolean = true;

    private _isFlying: boolean = false;

    public PlayFlyToCounter() {
        if (this._isFlying) return;
        if (!this.flyRoot || !this.counterTarget || !this.counter) return;
        if (!this.node.parent || !this.counterTarget.parent) return;

        const coinParentUI = this.node.parent.getComponent(UITransform);
        const targetParentUI = this.counterTarget.parent.getComponent(UITransform);
        const flyRootUI = this.flyRoot.getComponent(UITransform);

        if (!coinParentUI || !targetParentUI || !flyRootUI) {
            console.warn('У родителя монеты, родителя target и flyRoot должен быть UITransform');
            return;
        }

        this._isFlying = true;

        // Текущая позиция монеты -> world
        const coinWorldPos = coinParentUI.convertToWorldSpaceAR(this.node.position);

        // Позиция target -> world
        const targetWorldPos = targetParentUI.convertToWorldSpaceAR(this.counterTarget.position);

        // Обе позиции -> в локальные координаты flyRoot
        const startPosInFlyRoot = flyRootUI.convertToNodeSpaceAR(coinWorldPos);
        const endPosInFlyRoot = flyRootUI.convertToNodeSpaceAR(targetWorldPos);

        // Переносим монету в flyRoot, чтобы она летела в одном UI-пространстве
        this.node.setParent(this.flyRoot);
        this.node.setPosition(new Vec3(startPosInFlyRoot.x, startPosInFlyRoot.y, 0));

        tween(this.node)
            .to(this.flyTime, {
                position: new Vec3(endPosInFlyRoot.x, endPosInFlyRoot.y, 0),
                scale: new Vec3(this.targetScale, this.targetScale, 1),
            }, {
                easing: 'quadIn'
            })
            .call(() => {
                this.counter?.add(this.reward);

                if (this.destroyAfterFly) {
                    this.node.destroy();
                } else {
                    this.node.active = false;
                }
            })
            .start();
    }
}