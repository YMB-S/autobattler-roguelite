import { Scene } from "phaser";
import { Constants } from "../../constants/Constants";
import { GameDataService } from "../../services/GameDataService";

export class BattleEquipmentSelection extends Scene {
    constructor() {
        super('BattleEquipmentSelection');
    }

    create() {
        const welcomeText = this.add.bitmapText(Constants.screenWidth / 2, Constants.topOfScreenTextYPosition, "pixelfont", 'EQUIPMENT SELECT', 30).setOrigin(0.5, 0.5);
        
        // this.add.bitmapText(50, 160, "pixelfont", 'HEAD', 10).setOrigin(0.5, 0.5);
        // this.add.bitmapText(50, 170, "pixelfont", 'BODY', 10).setOrigin(0.5, 0.5);
        // this.add.bitmapText(50, 180, "pixelfont", 'LEGS', 10).setOrigin(0.5, 0.5);
        // this.add.bitmapText(50, 190, "pixelfont", 'BOOTS', 10).setOrigin(0.5, 0.5);

        var item = GameDataService.getInstance().getItemsInPlayerArsenal()[0];
        item.addToScene(this, [300, 320], [340, 320]);
    }
}