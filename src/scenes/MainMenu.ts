import { Scene, GameObjects } from 'phaser';
import { ScreenConstants } from '../constants/ScreenConstants';

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
        const welcomeText = this.add.bitmapText(ScreenConstants.screenWidth / 2, ScreenConstants.topOfScreenTextYPosition, "pixelfont", 'MAIN MENU', 30).setOrigin(0.5, 0.5);

        const fightBtnPos = [ScreenConstants.screenWidth / 2, (ScreenConstants.screenHeight / 2) - 80];
        const fightButton = this.add.image(fightBtnPos[0], fightBtnPos[1], "ui_btn_demo").setOrigin(0.5, 0.5).setScale(2);
        const fightButtonText = this.add.bitmapText(fightBtnPos[0], fightBtnPos[1], "pixelfont", 'Fight', 10).setOrigin(0.5, 0.5).setScale(2);

        fightButton.setInteractive();
        fightButton.on('pointerdown', () => {
            this.startFight();
        });

        const arsenalBtnPos = [ScreenConstants.screenWidth / 2, ScreenConstants.screenHeight / 2];
        const arsenalButton = this.add.image(arsenalBtnPos[0], arsenalBtnPos[1], "ui_btn_demo").setOrigin(0.5, 0.5).setScale(2);
        const arsenalButtonText = this.add.bitmapText(arsenalBtnPos[0], arsenalBtnPos[1], "pixelfont", 'Arsenal', 10).setOrigin(0.5, 0.5).setScale(2);

        arsenalButton.setInteractive();
        arsenalButton.on('pointerdown', () => {
            this.openArsenal();
        });
    }

    startFight() {
        this.scene.start('BattleZoneSelection');
    }

    openArsenal() {
        console.log('arsenal');
    }
}
