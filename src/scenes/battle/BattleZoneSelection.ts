import { Scene } from "phaser";
import { ScreenConstants } from "../../constants/ScreenConstants";
import { GameDataService } from "../../services/GameDataService";


export class BattleZoneSelection extends Scene {
    constructor() {
        super('BattleZoneSelection');
    }

    create() {

        const welcomeText = this.add.bitmapText(ScreenConstants.screenWidth / 2, ScreenConstants.topOfScreenTextYPosition, "pixelfont", 'SELECT ZONE', 30).setOrigin(0.5, 0.5);

        var demoLairPosition = [ScreenConstants.screenWidth / 2, ScreenConstants.screenHeight / 2];
        var demoLair = this.add.image(demoLairPosition[0], demoLairPosition[1], "environment_gateway_dngn_enter").setOrigin(0.5, 0.5)
        demoLair.setScale(1, 1);
        demoLair.setBlendMode(Phaser.BlendModes.LUMINOSITY);
        demoLair.setInteractive();
        demoLair.on('pointerdown', () => {
            this.scene.start('BattleEquipmentSelection');
        });

        const demoLairText = this.add.bitmapText(demoLairPosition[0], demoLairPosition[1]+25, "pixelfont", 'Plains Lair', 10).setOrigin(0.5, 0.5);
    
        var demoLairTooltip = this.add.rectangle(0, 0, 64, 32, 0x000000).setOrigin(0, 0.5);
        var demoLairTooltipText = this.add.bitmapText(0, 0, "pixelfont", "BASIC DUNGEON", 10).setOrigin(0);
        demoLairTooltip.alpha = 0;
        demoLairTooltipText.alpha = 0;

        demoLair.on('pointerover', () => {
            this.tweens.add({
                targets: [demoLairTooltip, demoLairTooltipText],
                alpha: { from: 0, to: 1 },
                repeat: 0,
                duration: 500
            })
        });

        demoLair.on('pointerout', () => {
            demoLairTooltip.alpha = 0;
            demoLairTooltipText.alpha = 0;
        });

        demoLair.on('pointermove', () => {
            demoLairTooltip.x = this.game.input.mousePointer!.x;
            demoLairTooltip.y = this.game.input.mousePointer!.y;
            demoLairTooltipText.x = this.game.input.mousePointer!.x;
            demoLairTooltipText.y = this.game.input.mousePointer!.y;
        });

    }
}