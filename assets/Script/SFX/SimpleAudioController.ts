import { _decorator, Component, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SimpleAudioController')
export class SimpleAudioController extends Component {
    @property(AudioSource)
    public audioSource: AudioSource | null = null;

    private _isPlaying: boolean = false;
    private _isDisabledForever: boolean = false;

    onLoad() {
        if (!this.audioSource) {
            this.audioSource = this.getComponent(AudioSource);
        }
    }

    onEnable() {
        if (!this.audioSource) return;

        this.audioSource.node.on(AudioSource.EventType.STARTED, this.onAudioStarted, this);
        this.audioSource.node.on(AudioSource.EventType.ENDED, this.onAudioEnded, this);
    }

    onDisable() {
        if (!this.audioSource) return;

        this.audioSource.node.off(AudioSource.EventType.STARTED, this.onAudioStarted, this);
        this.audioSource.node.off(AudioSource.EventType.ENDED, this.onAudioEnded, this);
    }

    public PlaySound() {
        if (!this.audioSource) return;
        if (this._isDisabledForever) return;
        if (this._isPlaying) return;

        this.audioSource.play();
    }

    public DisableSoundForever() {
        if (this._isDisabledForever) return;

        this._isDisabledForever = true;
        this._isPlaying = false;

        if (this.audioSource) {
            this.audioSource.stop();
        }
    }

    public IsSoundDisabledForever(): boolean {
        return this._isDisabledForever;
    }

    public IsPlaying(): boolean {
        return this._isPlaying;
    }

    private onAudioStarted() {
        this._isPlaying = true;
    }

    private onAudioEnded() {
        this._isPlaying = false;
    }
}