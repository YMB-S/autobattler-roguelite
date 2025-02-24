import { Scene } from 'phaser';
import { Constants } from '../constants/Constants';
import { GameDataService } from '../services/GameDataService';

export class CharacterSelect extends Scene {

    spriteNames: string[] = ["player_body_human_m", "player_body_human_f"].reverse();

    selectionGridPosition: integer[] = [50, 100];
    rows: integer = 4;
    columns: integer = 4;
    spaceBetweenPortraits: integer = Constants.spaceBetweenGridItems;

    sprites: Phaser.GameObjects.Image[] = new Array();

    constructor() {
        super('CharacterSelect');
    }

    create() {
        this.setupText();
        this.setupSelectionGrid();
    }

    setupText() {
        this.add.bitmapText(160, Constants.topOfScreenTextYPosition, "pixelfont", 'Select your body type', 10).setOrigin(0.5, 0.5);
    }

    setupSelectionGrid() {
        this.setupCharacterSprites();
        this.setupBackgroundPanels();
    }

    setupCharacterSprites() {
        for (var i = 0; i < this.columns; i++) {
            for (var j = 0; j < this.rows; j++) {
                if (this.spriteNames.length == 0) {
                    break;
                }
                var xPos = this.selectionGridPosition[0] + (j * this.spaceBetweenPortraits);
                var yPos = this.selectionGridPosition[1] + (i * this.spaceBetweenPortraits);

                var spriteName: string = this.spriteNames.pop()!;
                var characterPortrait = this.add.image(xPos, yPos, spriteName).setOrigin(0.5, 0.5)
                this.sprites.push(characterPortrait);
            }
        }
    }

    setupBackgroundPanels() {
        this.sprites.forEach(element => {
            let background = this.add.image(element.x, element.y, "32x32_black").setOrigin(0.5, 0.5)
            background.setDepth(-1);
            element.setInteractive();
            element.on("pointerdown", () => {
                GameDataService.getInstance().setPlayerBodySpriteName(element.texture.key);
                this.scene.start('MainMenu');
            });
        });
    }
}