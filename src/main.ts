

import Phaser from 'phaser';

import { GAME_HEIGHT, GAME_WIDTH, GameOptions, SCENE_KEYS } from './data/GameOptions';
import PreloadScene from './scenes/PreloadScene';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';
import BootScene from './scenes/BootScene';
import AnimatedBackground from './scenes/AnimatedBackground';

export default class Game {
    private readonly game: Phaser.Game;

    constructor() {
        // optimal game width and height
        let width: number = GAME_WIDTH;
        let height: number = GAME_HEIGHT;

        // get window ratio
        const windowRatio: number = window.innerWidth / window.innerHeight;

        // get default ratio
        const defaultRatio: number = width / height;

        // adjust width if window ratio is greater than default ratio
        if (windowRatio > defaultRatio) {
            width = GAME_HEIGHT * windowRatio;
        }

        // adjust height if window ratio is smaller than default ratio
        if (windowRatio < defaultRatio) {
            height = GAME_WIDTH / windowRatio;
        }

        // object to initialize the Phaser game
        const gameConfig: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: width,
            height: height,
            parent: 'game-container',
            backgroundColor: GameOptions.gameBackgroundColor,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
        }

        this.game = new Phaser.Game(gameConfig);

        this.game.scene.add(SCENE_KEYS.BOOT_SCENE, BootScene);
        this.game.scene.add(SCENE_KEYS.ANIMATED_BACKGROUND, AnimatedBackground);
        this.game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
        this.game.scene.add(SCENE_KEYS.MENU_SCENE, MenuScene);
        this.game.scene.add(SCENE_KEYS.GAME_SCENE, GameScene);

    }

    public start(): void {
        console.log("🚀 Game initialize start()");
        this.game.scene.start(SCENE_KEYS.BOOT_SCENE);
    }
}

window.onload = () => {
    new Game().start();
}
