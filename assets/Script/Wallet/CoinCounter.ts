import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CoinCounter')
export class CoinCounter extends Component {
    @property(Label)
    public valueLabel: Label | null = null;

    @property
    public startValue: number = 0;

    private _value: number = 20;

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
            this.valueLabel.string = this._value.toString();
        }
    }
}