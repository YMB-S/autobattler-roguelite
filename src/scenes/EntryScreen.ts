import { Scene } from 'phaser';
import { Constants } from '../constants/Constants';
import { GameDataService } from '../services/GameDataService';

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
        const welcomeText = this.add.bitmapText(Constants.screenWidth / 2, Constants.topOfScreenTextYPosition, "pixelfont", 'ROGUE LEGION', 30).setOrigin(0.5, 0.5);

        const startBtnPos = [Constants.screenWidth / 2, Constants.screenHeight / 2];
        const startButton = this.add.image(startBtnPos[0], startBtnPos[1], "btn_demo").setOrigin(0.5, 0.5).setScale(2);
        const startButtonText = this.add.bitmapText(startBtnPos[0], startBtnPos[1], "pixelfont", 'Start', 10).setOrigin(0.5, 0.5).setScale(2);

        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.startGame();
        });
    }

    startGame() {
        if (GameDataService.getInstance().saveDataExists()) {
            this.scene.start('MainMenu');
        } else {
            this.scene.start('CharacterSelect');
        }
    }
}