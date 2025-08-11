export const GameOptions = {
    gameBackgroundColor: '#031827',
    preloadBar: {
        size: {
            width: 300,
            height: 60,
            border: 3
        },
        color: {
            container: 0x1CA2E2,
            fill: 0x0C4768
        }
    },
    gameFont: {
        monoSpace: "monospace"
    },
    bgColors: [
        0xff475c,
        0x8f16b2,
        0x588c7e,
        0x8c4646
    ],
}

export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 640;

export const SCENE_KEYS = {
    BOOT_SCENE: 'BootScene',
    ANIMATED_BACKGROUND: 'AnimatedBackground',
    PRELOAD_SCENE: 'PreloadScene',
    MENU_SCENE: 'MenuScene',
    GAME_SCENE: 'GameScene',
    GAME_OVER_SCENE: 'GameOverScene',
}
