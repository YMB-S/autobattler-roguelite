import { Scene } from "phaser";
import { UIElementPositions } from "../../constants/UIElementPositions";

export class BattleEquipmentSelection extends Scene {
    constructor() {
        super('BattleEquipmentSelection');
    }

    create() {
        const welcomeText = this.add.bitmapText(160, UIElementPositions.topOfScreenTextYPosition, "pixelfont", 'EQUIPMENT SELECT', 20).setOrigin(0.5, 0.5);
        // this.add.bitmapText(50, 160, "pixelfont", 'HEAD', 10).setOrigin(0.5, 0.5);
        // this.add.bitmapText(50, 170, "pixelfont", 'BODY', 10).setOrigin(0.5, 0.5);
        // this.add.bitmapText(50, 180, "pixelfont", 'LEGS', 10).setOrigin(0.5, 0.5);
        // this.add.bitmapText(50, 190, "pixelfont", 'BOOTS', 10).setOrigin(0.5, 0.5);
    }
}