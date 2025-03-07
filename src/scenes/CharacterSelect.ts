import { Scene } from 'phaser';
import { ScreenConstants } from '../constants/ScreenConstants';
import { GameDataService } from '../services/GameDataService';

export class CharacterSelect extends Scene {

    spriteNames: string[] = [
        "body_human_m", "body_human_f",
        "body_orc_m", "body_orc_f",
        "body_ogre_m", "body_ogre_f"
    ].reverse();

    selectionGridPosition: integer[] = [80, 150];
    rows: integer = 8;
    columns: integer = 8;
    spaceBetweenPortraits: integer = ScreenConstants.spaceBetweenGridItems;

    sprites: Phaser.GameObjects.Image[] = new Array();

    constructor() {
        super('CharacterSelect');
    }

    create() {
        this.setupText();
        this.setupSelectionGrid();
    }

    setupText() {
        this.add.bitmapText(ScreenConstants.screenWidth/2, ScreenConstants.topOfScreenTextYPosition, "pixelfont", 'Select your body type', 30).setOrigin(0.5, 0.5);
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
                var characterPortrait = this.add.image(xPos, yPos, spriteName).setOrigin(0.5, 0.5).setScale(ScreenConstants.defaultGridItemScale);
                this.sprites.push(characterPortrait);
            }
        }
    }

    setupBackgroundPanels() {
        this.sprites.forEach(element => {
            let background = this.add.image(element.x, element.y, "ui_32x32_black").setOrigin(0.5, 0.5).setScale(ScreenConstants.defaultGridItemScale);
            background.setDepth(-1);
            element.setInteractive();
            element.on("pointerdown", () => {
                GameDataService.getInstance().setPlayerBodySpriteName(element.texture.key);
                this.scene.start('MainMenu');
            });
        });
    }
}