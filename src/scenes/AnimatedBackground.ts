import { ASSET_KEYS } from "../data/assets";
import { GameOptions, SCENE_KEYS } from "../data/GameOptions";

export default class AnimatedBackground extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;

    constructor() {
        super({ key: SCENE_KEYS.ANIMATED_BACKGROUND });
    }

    create(): void {
        this.background = this.add.tileSprite(
            0, 0,
            this.game.config.width as number,
            this.game.config.height as number,
            ASSET_KEYS.BACKGROUND
        );
        this.background.setOrigin(0);

        this.tweens.addCounter({
            from: 0,
            to: 256,
            duration: 15000,
            onUpdate: tween => {
                this.background.setTilePosition(tween.getValue(), -tween.getValue());
            },
            repeat: -1
        });

        const tintColor: number = Phaser.Utils.Array.GetRandom(GameOptions.bgColors);
        const backgroundScene: AnimatedBackground = this.scene.get('AnimatedBackground') as AnimatedBackground;
        backgroundScene.tintBackground(tintColor);
    }

    tintBackground(color: number): void {
        this.background.setTint(color);
    }
}
