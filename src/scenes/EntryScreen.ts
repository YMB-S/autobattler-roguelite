import { Scene } from 'phaser';
import { UIElementPositions } from '../constants/UIElementPositions';
import { GameSaveData } from '../GameSaveData';

export class EntryScreen extends Scene {
    ypos: integer;
    dragon: Phaser.GameObjects.Image;
    msg_text: Phaser.GameObjects.BitmapText;
    msg_text2: Phaser.GameObjects.BitmapText;

    constructor() {
        super('EntryScreen');
    }

    create() {
        this.createUI();
    }

    createUI() {
        const welcomeText = this.add.bitmapText(160, UIElementPositions.topOfScreenTextYPosition, "pixelfont", 'ROGUE LEGION', 20).setOrigin(0.5, 0.5);

        const startBtnPos = [160, 160];
        const startButton = this.add.image(startBtnPos[0], startBtnPos[1], "btn_demo").setOrigin(0.5, 0.5);
        const startButtonText = this.add.bitmapText(startBtnPos[0], startBtnPos[1], "pixelfont", 'Start', 10).setOrigin(0.5, 0.5);

        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.startGame();
        });
    }

    startGame() {
        if (GameSaveData.getInstance().saveDataExists()) {
            this.scene.start('MainMenu');
        } else {
            this.scene.start('CharacterSelect');
        }
    }
}