import Phaser from 'phaser';
import { SCENE_KEYS } from '../data/GameOptions';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.MENU_SCENE });
    }

    create() {
        const { width, height } = this.game.scale;

        this.add.text(width / 2, 150, 'SPOT IT!', {
            fontSize: '64px',
            color: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        const startButton = this.add.text(width / 2, height / 2, 'Start Game', {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'monospace',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 },
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerover', () => {
            startButton.setStyle({ fill: '#ff0' });
        });

        startButton.on('pointerout', () => {
            startButton.setStyle({ fill: '#ffffff' });
        });

        startButton.on('pointerdown', () => {
            this.scene.start(SCENE_KEYS.GAME_SCENE);
        });
    }
}
