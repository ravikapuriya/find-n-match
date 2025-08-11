import Phaser from "phaser";

export function addSymbolSprite(
    scene: Phaser.Scene,
    x: number,
    y: number,
    seed: number = 0,
    size: number = 96
): Phaser.GameObjects.Image {
    const frameCount = 57;
    const frameIndex = Math.abs(seed) % frameCount;
    const imageKey = `symbol_${frameIndex}`;
    const sprite = scene.add.image(x, y, imageKey);

    const baseWidth = 430;
    const baseHeight = 426;
    sprite.setDisplaySize(size, size * (baseHeight / baseWidth));

    return sprite;
}
