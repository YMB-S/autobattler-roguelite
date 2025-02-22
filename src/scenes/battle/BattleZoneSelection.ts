import { Scene } from "phaser";
import { UIElementPositions } from "../../constants/UIElementPositions";
import { GameSaveData } from "../../GameSaveData";


export class BattleZoneSelection extends Scene {
    constructor() {
        super('BattleZoneSelection');
    }

    create() {

        const welcomeText = this.add.bitmapText(160, UIElementPositions.topOfScreenTextYPosition, "pixelfont", 'SELECT ZONE', 20).setOrigin(0.5, 0.5);

        var demoLairPosition = [100, 100];
        var demoLair = this.add.image(demoLairPosition[0], demoLairPosition[1], "gateway_dngn_enter").setOrigin(0.5, 0.5)
        demoLair.setScale(1, 1);
        demoLair.setBlendMode(Phaser.BlendModes.LUMINOSITY);

        demoLair.setInteractive();
        demoLair.on('pointerdown', () => {
            GameSaveData.getInstance().getItemsInPlayerArsenal();

            this.scene.start('Battle');

        });

        const demoLairText = this.add.bitmapText(demoLairPosition[0], demoLairPosition[1]+25, "pixelfont", 'Plains Lair', 10).setOrigin(0.5, 0.5);
    }
}