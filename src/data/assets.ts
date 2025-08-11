export const ASSET_KEYS = Object.freeze({
    // Image assets
    BACKGROUND: 'BACKGROUND',
    PLANET: 'PLANET',
    SHIP: 'SHIP',
    BLUE_PIECE: 'BLUE_PIECE',
    SYMBOLS: 'SYMBOLS',

    // Audio assets
    BACKGROUND_MUSIC: 'BACKGROUND_MUSIC',
    SFX_BTN_CLICK: 'SFX_BTN_CLICK',

    // Font asset
    GAME_FONT: 'GAME_FONT',
});

// No longer using spritesheet for symbols
export const SYMBOL_IMAGE_COUNT = 57;
export const SYMBOL_IMAGE_ASSETS = Array.from({ length: SYMBOL_IMAGE_COUNT }, (_, i) => ({
    assetKey: `symbol_${i}`,
    path: `assets/symbols/symbol_${i}.png`,
}));

export const IMAGE_ASSETS = [
    {
        assetKey: ASSET_KEYS.BACKGROUND,
        path: 'assets/images/background.png'
    },
    {
        assetKey: ASSET_KEYS.BLUE_PIECE,
        path: 'assets/images/bluePiece.png',
    },
];

export const AUDIO_ASSETS = [
    {
        assetKey: ASSET_KEYS.SFX_BTN_CLICK,
        path: 'assets/sounds/sfx-click.mp3',
    },
];

export const FONT_ASSETS = [
    {
        assetKey: ASSET_KEYS.GAME_FONT,
        path: 'assets/fonts/gameFont.ttf',
    },
];
