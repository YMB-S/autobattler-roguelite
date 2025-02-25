import { GameObjects, Scene } from "phaser";
import { Constants } from "../../constants/Constants";
import { GameDataService } from "../../services/GameDataService";
import { RogueLegionItem } from "../../models/RogueLegionItem";

export class BattleEquipmentSelection extends Scene {
    paperDollBase: GameObjects.Image;
    gameData: GameDataService;

    playerPaperDollPosition: integer[] = [160, 160];
    playerPaperDollScale: integer = 4;
    inventoryTablePosition: integer[] = [380, 160];
    inventoryTableDimensions: integer[] = [5, 7];

    constructor() {
        super('BattleEquipmentSelection');
        this.gameData = GameDataService.getInstance();
    }

    create() {
        const welcomeText = this.add.bitmapText(Constants.screenWidth / 2, Constants.topOfScreenTextYPosition, "pixelfont", 'EQUIPMENT SELECT', 30).setOrigin(0.5, 0.5);
        
        // this.add.bitmapText(380, 160, "pixelfont", 'HEAD', 10).setOrigin(0.5, 0.5);
        // this.add.bitmapText(380, 170, "pixelfont", 'BODY', 10).setOrigin(0.5, 0.5);
        // this.add.bitmapText(380, 180, "pixelfont", 'LEGS', 10).setOrigin(0.5, 0.5);
        // this.add.bitmapText(380, 190, "pixelfont", 'BOOTS', 10).setOrigin(0.5, 0.5);

        //var item = GameDataService.getInstance().getItemsInPlayerArsenal()[0];
        //item.addToScene(this, [300, 320], this.playerPaperDollPosition, 1, this.playerPaperDollScale);

        this.addPlayerPaperdoll();
        this.addInventoryTable(this.gameData.getItemsInPlayerArsenal());
    }

    addPlayerPaperdoll() {
        let playerBodyBaseSpriteName = this.gameData.getPlayerBodySpriteName();
        this.paperDollBase = this.add.image(this.playerPaperDollPosition[0], this.playerPaperDollPosition[1], playerBodyBaseSpriteName)
        this.paperDollBase.setScale(this.playerPaperDollScale);
    }

    addInventoryTable(items: RogueLegionItem[]) {
        for (let i = 0; i < this.inventoryTableDimensions[1]; i++) {
            for (let j = 0; j < this.inventoryTableDimensions[0]; j++) {
                if (items.length == 0) {
                    return;
                }
                const inventoryItemXPosition = this.inventoryTablePosition[0] + (j * Constants.spaceBetweenGridItems);
                const inventoryItemYPosition = this.inventoryTablePosition[1] + (i * Constants.spaceBetweenGridItems);
                const paperDollItemXPosition = this.playerPaperDollPosition[0];
                const paperDollItemYPosition = this.playerPaperDollPosition[1];

                const item = items.pop();
                item!.addToScene(
                    this,
                    [inventoryItemXPosition, inventoryItemYPosition],
                    [paperDollItemXPosition, paperDollItemYPosition],
                    1.5, this.playerPaperDollScale
                );

                item!.setInventorySpriteOnClick(() => {console.log("item equipped");});
                item!.setPaperDollSpriteOnClick(() => { console.log("item unequipped"); });
            }
        }
    }
}