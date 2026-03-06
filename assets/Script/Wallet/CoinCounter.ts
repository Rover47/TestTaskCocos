import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CoinCounter')
export class CoinCounter extends Component {
    @property(Label)
    public valueLabel: Label | null = null;

    @property
    public startValue: number = 0;

    private _value: number = 20;

    @property(Label)
    public targetLabel: Label | null = null;
    
    @property(Label)
    public targetLabel2: Label | null = null;

     private _startValue: number = 0;
    private _targetValue: number = 0;
    private _duration: number = 1;
    private _time: number = 0;
    private _isPlaying: boolean = false;

    onLoad() {
        this._value = this.startValue;
        this.updateLabel();
    }

    public add(amount: number) {
        this._value += amount;
        this.updateLabel();
    }

    public getValue(): number {
        return this._value;
    }

    private updateLabel() {
        if (this.valueLabel) {
            this.valueLabel.string = "$" + this._value.toString();
        }
    }

     start() {
        this.setLabelValue(0);
    }

    update(dt: number) {
        if (!this._isPlaying) return;

        this._time += dt;

        let t = this._time / this._duration;
        if (t > 1) t = 1;

        const value = Math.round(this._startValue + (this._targetValue - this._startValue) * t);
        this.setLabelValue(value);

        if (t >= 1) {
            this._isPlaying = false;
            this.setLabelValue(this._targetValue);
        }
    }

    public SetEndValue()
    {
        this.PlayCountTo(this._value, 1);
    }

     public SetFailValue()
    {
        this.PlayCountTo(this._value, 5);
    }

    public PlayCountTo(targetValue: number, duration: number) {
        this._startValue = 0;
        this._targetValue = Math.floor(targetValue);
        this._duration = Math.max(0.01, duration);
        this._time = 0;
        this._isPlaying = true;

        this.setLabelValue(0);
    }

    public StopCount() {
        this._isPlaying = false;
    }

    private setLabelValue(value: number) {
        if (!this.targetLabel) return;
        this.targetLabel.string = "$" + value.toString() + ".00";
        
        if (!this.targetLabel2) return;
        this.targetLabel2.string = "$" + value.toString() + ".00";
    }
}