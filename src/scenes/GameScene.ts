import Phaser from "phaser";
import { GameOptions, SCENE_KEYS } from "../data/GameOptions";
import AnimatedBackground from "./AnimatedBackground";
import { Card, generateDeck, validateDeck } from "../helper/deck";
import { addSymbolSprite } from "../helper/shapes";

export default class GameScene extends Phaser.Scene {
    protected gameOver: boolean;

    public symbolsCount = 0;

    private deck: Card[] = [];
    private leftCard!: Phaser.GameObjects.Container;
    private rightCard!: Phaser.GameObjects.Container;
    private currentPair: [Card, Card] | null = null;
    private score = 0;
    private scoreText!: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: SCENE_KEYS.GAME_SCENE
        });
        this.gameOver = false;
    }

    init() {
        // give the background a random tint color
        const tintColor: number = Phaser.Utils.Array.GetRandom(GameOptions.bgColors);
        const backgroundScene: AnimatedBackground = this.scene.get('AnimatedBackground') as AnimatedBackground;
        backgroundScene.tintBackground(tintColor);
    }

    create() {
        // Build deck
        const n = 7; // 8 symbols per card
        this.deck = generateDeck(n);
        this.symbolsCount = n * n + n + 1;

        // Optional: validate in dev
        console.log("Valid:", validateDeck(this.deck));

        // No need to generate textures; we use spritesheet now

        // UI
        this.scoreText = this.add.text(16, 16, "Score: 0", { fontFamily: "sans-serif", fontSize: "24px" });

        // Card containers
        this.leftCard = this.add.container(240, 320);
        this.rightCard = this.add.container(720, 320);

        this.nextRound();
    }

    private nextRound() {
        // Pick two distinct cards
        const a = Phaser.Math.Between(0, this.deck.length - 1);
        let b = Phaser.Math.Between(0, this.deck.length - 1);
        while (b === a) b = Phaser.Math.Between(0, this.deck.length - 1);
        const cardA = this.deck[a];
        const cardB = this.deck[b];
        this.currentPair = [cardA, cardB];

        this.renderCard(this.leftCard, cardA, 200);
        this.renderCard(this.rightCard, cardB, 200);

        // Enable symbol interaction
        this.input.off("gameobjectdown"); // clear old
        this.input.on("gameobjectdown", (_ptr: any, obj: any) => {
            const id: number | undefined = obj.getData("symbolId");
            if (id == null) return;
            if (this.isCommon(id)) {
                this.score++;
                this.scoreText.setText(`Score: ${this.score}`);
                this.cameras.main.flash(120);

                // Animate the correct symbol: scale up & down twice, then start next round
                const originalScaleX = obj.scaleX;
                const originalScaleY = obj.scaleY;

                this.tweens.add({
                    targets: obj,
                    scaleX: originalScaleX * 1.1,
                    scaleY: originalScaleY * 1.1,
                    duration: 100,
                    ease: 'Quad.easeOut',
                    onComplete: () => {
                        this.tweens.add({
                            targets: obj,
                            scaleX: originalScaleX * 0.9,
                            scaleY: originalScaleY * 0.9,
                            duration: 100,
                            ease: 'Quad.easeIn',
                            onComplete: () => {
                                this.tweens.add({
                                    targets: obj,
                                    scaleX: originalScaleX * 1.1,
                                    scaleY: originalScaleY * 1.1,
                                    duration: 100,
                                    ease: 'Quad.easeOut',
                                    onComplete: () => {
                                        this.tweens.add({
                                            targets: obj,
                                            scaleX: originalScaleX,
                                            scaleY: originalScaleY,
                                            duration: 100,
                                            ease: 'Quad.easeIn',
                                            onComplete: () => {
                                                this.time.delayedCall(500, () => {
                                                    this.nextRound();
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                this.cameras.main.shake(300, 0.002);
            }
        });
    }

    private renderCard(container: Phaser.GameObjects.Container, symbols: number[], radius: number) {
        container.removeAll(true);

        // Background circle
        const bg = this.add.circle(0, 0, radius + 20, 0xececec).setStrokeStyle(4, 0xffffff);
        container.add(bg);

        const count = symbols.length;
        const symbolSize = 80; // Fixed size for all symbols
        const symbolRadius = symbolSize * 0.5;
        const minDistance = 10; // Minimum gap between symbols
        const placedPositions: { x: number, y: number }[] = [];

        // Place symbols randomly within the circle with overlap prevention
        for (let i = 0; i < count; i++) {
            const symId = symbols[i];
            let placed = false;
            let attempts = 0;
            const maxAttempts = 200;

            while (!placed && attempts < maxAttempts) {
                // Random position within circle
                const angle = Math.random() * Math.PI * 2;
                const r = Math.sqrt(Math.random()) * (radius * 0.8); // Keep symbols well within circle bounds
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;

                // Check if position overlaps with existing symbols
                let overlaps = false;
                for (const pos of placedPositions) {
                    const distance = Math.hypot(x - pos.x, y - pos.y);
                    if (distance < (symbolRadius * 2 + minDistance)) {
                        overlaps = true;
                        break;
                    }
                }

                if (!overlaps) {
                    // Position is valid, place the symbol
                    placedPositions.push({ x, y });

                    // Random rotation
                    const rotation = Math.random() * Math.PI * 2;

                    const sprite = addSymbolSprite(this, x, y, symId, symbolSize);
                    sprite.setData("symbolId", symId);
                    sprite.setInteractive({ useHandCursor: true });
                    sprite.setRotation(rotation);

                    // Hover effect
                    sprite.on('pointerover', () => {
                        sprite.setDisplaySize(symbolSize * 1.15, symbolSize * 1.15 * (426 / 430));
                        sprite.setTint(0xffe066);
                        sprite.setDepth(1000);
                    });
                    sprite.on('pointerout', () => {
                        sprite.setDisplaySize(symbolSize, symbolSize * (426 / 430));
                        sprite.clearTint();
                        sprite.setDepth(0);
                    });

                    container.add(sprite);
                    placed = true;
                }

                attempts++;
            }

            // Fallback: if we couldn't find a non-overlapping position, place it anyway
            if (!placed) {
                console.warn(`Could not place symbol ${symId} without overlap after ${maxAttempts} attempts`);

                // Use a grid-like fallback position
                const fallbackAngle = (i / count) * Math.PI * 2;
                const fallbackR = radius * 0.6;
                const x = Math.cos(fallbackAngle) * fallbackR;
                const y = Math.sin(fallbackAngle) * fallbackR;

                const rotation = Math.random() * Math.PI * 2;

                const sprite = addSymbolSprite(this, x, y, symId, symbolSize);
                sprite.setData("symbolId", symId);
                sprite.setInteractive({ useHandCursor: true });
                sprite.setRotation(rotation);

                // Hover effect
                sprite.on('pointerover', () => {
                    sprite.setDisplaySize(symbolSize * 1.15, symbolSize * 1.15 * (426 / 430));
                    sprite.setTint(0xffe066);
                    sprite.setDepth(1000);
                });
                sprite.on('pointerout', () => {
                    sprite.setDisplaySize(symbolSize, symbolSize * (426 / 430));
                    sprite.clearTint();
                    sprite.setDepth(0);
                });

                container.add(sprite);
            }
        }
    }

    private isCommon(symId: number): boolean {
        if (!this.currentPair) return false;
        const [A, B] = this.currentPair;
        return A.includes(symId) && B.includes(symId);
    }



}
