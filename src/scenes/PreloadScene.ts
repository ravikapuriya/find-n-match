import Phaser from "phaser";
import { GameOptions, SCENE_KEYS } from "../data/GameOptions";
import { AUDIO_ASSETS, IMAGE_ASSETS, SYMBOL_IMAGE_ASSETS } from "../data/assets";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.PRELOAD_SCENE });
    }

    init(): void {
        const barX: number = (this.game.config.width as number - GameOptions.preloadBar.size.width) / 2;
        const barY: number = (this.game.config.height as number - GameOptions.preloadBar.size.height) / 2;
        const bar: Phaser.GameObjects.Rectangle = this.add.rectangle(
            barX, barY, 1,
            GameOptions.preloadBar.size.height,
            GameOptions.preloadBar.color.fill
        );
        bar.setOrigin(0);

        this.add.rectangle(
            barX, barY,
            GameOptions.preloadBar.size.width,
            GameOptions.preloadBar.size.height
        ).setStrokeStyle(
            GameOptions.preloadBar.size.border,
            GameOptions.preloadBar.color.container
        ).setOrigin(0);

        this.load.on('progress', (progress: number) => {
            bar.width = GameOptions.preloadBar.size.width * progress;
        });

        this.load.on('complete', () => {
            console.log("✅ Assets loaded successfully!");
            bar.destroy();
        });
    }

    preload(): void {
        console.log("Preload SCENE");

        for (let i = 0; i < 57; i++) {
            this.load.image(`symbol_${i}`, `assets/symbols/symbol_${i}.png`);
        }

        SYMBOL_IMAGE_ASSETS.forEach((asset) => {
            this.load.image(asset.assetKey, asset.path);
        });

        IMAGE_ASSETS.forEach((asset) => {
            this.load.image(asset.assetKey, asset.path);
        });

        AUDIO_ASSETS.forEach((asset) => {
            this.load.audio(asset.assetKey, asset.path);
        });
    }

    create(): void {
        this.scene.launch(SCENE_KEYS.ANIMATED_BACKGROUND);
        this.scene.start(SCENE_KEYS.MENU_SCENE);
    }
}
