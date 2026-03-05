import { _decorator, Animation, AnimationClip, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimatioControl')
export class AnimatioControl extends Component {

    @property({ type: Animation })
    anim: Animation = null!;


    @property({ type: [AnimationClip] })
    clips: AnimationClip[] = [];

    private clipByName = new Map<string, AnimationClip>();

    onLoad() {
        if (!this.anim) this.anim = this.getComponent(Animation)!;

        for (const clip of this.clips) {
            if (!clip) continue;
            this.clipByName.set(clip.name, clip);
            this.anim.addClip(clip, clip.name);
        }
    }
    
    public play(name: string, fade = 0) {
        const clip = this.clipByName.get(name);
        if (!clip) {
            console.warn(`[HeroAnim] Clip not found: ${name}`);
            return;
        }

        const state = this.anim.getState(name);
        if (state?.isPlaying) return;

        if (fade > 0 && (this.anim as any).crossFade) {
            (this.anim as any).crossFade(name, fade);
        } else {
            this.anim.play(name);
        }
    }

    public playIdle() { this.play('HeroIdle', 0.1); }
    public playRun() { this.play('HeroRun', 0.1); }
    public playJump() { this.play('HeroJump', 0.05); }
    //public playHit() { this.play('HeroHit', 0.0); }
    public playHitThenRun() {
        this.play('HeroHit');
        this.anim.once(Animation.EventType.FINISHED, () => {
            this.playRun();
        }, this);
    }
    public playJumpThenRun() {
        this.play('HeroJump');
        console.log("Game Not started")
        
        this.anim.once(Animation.EventType.FINISHED, () => {
            this.playRun();
        }, this);
    }
}


