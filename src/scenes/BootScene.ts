import Phaser from 'phaser';
import { SCENE_KEYS } from '../data/GameOptions';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.BOOT_SCENE });
    }

    preload(): void {
    }

    create(): void {
        this.scene.start(SCENE_KEYS.PRELOAD_SCENE);
    }
}
