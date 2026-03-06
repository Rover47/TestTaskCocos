import { _decorator, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {

    @property({type: Number})
    private customSpeed = 800
    
    @property({type: Number})
    private renewWidth = 1000

    private speed = 0

   private anim: Animation | null = null;

    @property(Node)
    public pointsRoot: Node | null = null;

    @property
    public triggerX: number = 3000;

     @property(Node)
    private _pointsQueue: Node[] = [];


    start() {
        this.anim = this.getComponent(Animation);
        this.StopAnim();
        this.collectAndSortPoints();
    }

     protected update(deltaTime: number) {
        this.node.setPosition(this.node.getPosition().x += this.speed * deltaTime, this.node.position.y)
        //console.log(this.node.getPosition().x)
        this.processPoints();
    }
      
    public collectAndSortPoints() {
        if (!this.pointsRoot) return;

        this._pointsQueue = this.pointsRoot.children.slice();

        this._pointsQueue.sort((a, b) => {
            return a.worldPosition.x - b.worldPosition.x;
        });
    }

     private processPoints() {
        while (this._pointsQueue.length > 0) {
            const point = this._pointsQueue[0];

            //console.log(point.x)

            if (!point || !point.isValid) {
                this._pointsQueue.shift();
                continue;
            }

            if (point.worldPosition.x < this.triggerX) {
                this.spawnAt(point);
                this._pointsQueue.shift();
            } else {
                break;
            }
        }
    }

     private spawnAt(point: Node) {
        /*
        if (!this.spawnPrefab) return;

        const obj = instantiate(this.spawnPrefab);
        obj.setParent(this.spawnParent ? this.spawnParent : this.node);
        */
       this.node.setWorldPosition(point.worldPosition);
    }


    public PauseAnim() {
        this.anim?.pause();
        this.speed = 0;
    }

    public ResumeAnim() {
        this.anim?.resume();
        this.speed = this.customSpeed * -1;
    }

    public StopAnim() {
        this.anim?.stop();
    }

    public PlayAnim() {
        this.anim?.play();
        //this.speed = this.customSpeed * -1;
    }
    
}


