import { Scene, GameObjects } from 'phaser';
import { TextPositions } from '../constants/TextPositions';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create() {
        this.createUI();
    }

    createUI() {
        const welcomeText = this.add.bitmapText(160, TextPositions.topOfScreenTextYPosition, "pixelfont", 'MAIN MENU', 20).setOrigin(0.5, 0.5);

        const fightBtnPos = [160, 120];
        const fightButton = this.add.image(fightBtnPos[0], fightBtnPos[1], "btn_demo").setOrigin(0.5, 0.5);
        const fightButtonText = this.add.bitmapText(fightBtnPos[0], fightBtnPos[1], "pixelfont", 'Fight', 10).setOrigin(0.5, 0.5);

        fightButton.setInteractive();
        fightButton.on('pointerdown', () => {
            this.startFight();
        });

        const arsenalBtnPos = [160, 160];
        const arsenalButton = this.add.image(arsenalBtnPos[0], arsenalBtnPos[1], "btn_demo").setOrigin(0.5, 0.5);
        const arsenalButtonText = this.add.bitmapText(arsenalBtnPos[0], arsenalBtnPos[1], "pixelfont", 'Arsenal', 10).setOrigin(0.5, 0.5);

        arsenalButton.setInteractive();
        arsenalButton.on('pointerdown', () => {
            this.openArsenal();
        });
    }

    startFight() {
        //this.scene.start('MainMenu');
        console.log('fight');
    }

    openArsenal() {
        //this.scene.start('MainMenu');
        console.log('arsenal');
    }
}
