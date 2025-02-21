import { Scene } from 'phaser';
import { TextPositions } from '../constants/TextPositions';

export class CharacterSelect extends Scene {

    spriteNames: string[] = ["player_body_human_m", "player_body_human_f"].reverse();

    selectionGridPosition: integer[] = [50, 100];
    rows: integer = 4;
    columns: integer = 4;
    spaceBetweenPortraits: integer = 40;

    sprites: Phaser.GameObjects.Image[] = new Array();

    constructor() {
        super('CharacterSelect');
    }

    create() {
        this.setupText();
        this.setupCharacterPortraits();
    }

    setupText() {
        this.add.bitmapText(160, TextPositions.topOfScreenTextYPosition, "pixelfont", 'Select your body type', 10).setOrigin(0.5, 0.5);
    }

    setupCharacterPortraits() {

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

        this.sprites.forEach(element => {
            let background = this.add.image(element.x, element.y, "32x32_black").setOrigin(0.5, 0.5)
            background.setDepth(-1);
            element.setInteractive();
            element.on("pointerdown", () => {
                localStorage.setItem('playerBodySprite', element.texture.key);
                this.scene.start('MainMenu');
            });
        });
    }
}