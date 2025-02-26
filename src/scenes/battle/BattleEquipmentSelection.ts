import { GameObjects, Scene } from "phaser";
import { ScreenConstants } from "../../constants/ScreenConstants";
import { GameDataService } from "../../services/GameDataService";
import { RogueLegionItem } from "../../models/RogueLegionItem";
import { PlayerEquippedItemsService } from "../../services/PlayerEquippedItemsService";
import { EquipmentSlot } from "../../constants/Enums";

export class BattleEquipmentSelection extends Scene {
    paperDollBase: GameObjects.Image;
    gameDataService: GameDataService;
    equippedItemsService: PlayerEquippedItemsService;

    playerPaperDollPosition: integer[] = [160, 160];
    playerPaperDollScale: integer = 4;
    inventoryTablePosition: integer[] = [380, 160];
    inventoryTableDimensions: integer[] = [5, 7];

    inventoryMouseHoverHighlight: GameObjects.Rectangle;

    selectedEquipmentTooltipBackground: GameObjects.Rectangle;
    selectedEquipmentTooltipText: GameObjects.BitmapText;


    constructor() {
        super('BattleEquipmentSelection');
        this.gameDataService = GameDataService.getInstance();
        this.equippedItemsService = PlayerEquippedItemsService.getInstance();
    }

    create() {
        const welcomeText = this.add.bitmapText(ScreenConstants.screenWidth / 2, ScreenConstants.topOfScreenTextYPosition, "pixelfont", 'EQUIPMENT SELECT', 30).setOrigin(0.5, 0.5);

        this.inventoryMouseHoverHighlight = this.add.rectangle(0, 0, ScreenConstants.spaceBetweenGridItems, ScreenConstants.spaceBetweenGridItems).setStrokeStyle(1, 0x000000).setAlpha(0);
        this.selectedEquipmentTooltipBackground = this.add.rectangle(0, 0, 64, 32, 0x000000).setOrigin(0, 0.5).setAlpha(0);
        this.selectedEquipmentTooltipText = this.add.bitmapText(0, 0, "pixelfont", "", 10).setOrigin(0).setAlpha(0);
        this.selectedEquipmentTooltipBackground.depth = 1;
        this.selectedEquipmentTooltipText.depth = 1;

        this.addPlayerPaperDollBase();
        this.addInventoryTable(this.gameDataService.getItemsInPlayerArsenal());
    }

    addPlayerPaperDollBase() {
        let playerBodyBaseSpriteName = this.gameDataService.getPlayerBodySpriteName();
        this.paperDollBase = this.add.image(this.playerPaperDollPosition[0], this.playerPaperDollPosition[1], playerBodyBaseSpriteName)
        this.paperDollBase.setScale(this.playerPaperDollScale);
    }

    addInventoryTable(items: RogueLegionItem[]) {
        for (let i = 0; i < this.inventoryTableDimensions[1]; i++) {
            for (let j = 0; j < this.inventoryTableDimensions[0]; j++) {
                if (items.length == 0) {
                    return;
                }
                const inventoryItemXPosition = this.inventoryTablePosition[0] + (j * ScreenConstants.spaceBetweenGridItems);
                const inventoryItemYPosition = this.inventoryTablePosition[1] + (i * ScreenConstants.spaceBetweenGridItems);
                const paperDollItemXPosition = this.playerPaperDollPosition[0];
                const paperDollItemYPosition = this.playerPaperDollPosition[1];

                const item = items.pop()!;
                item!.addToScene(
                    this,
                    [inventoryItemXPosition, inventoryItemYPosition],
                    [paperDollItemXPosition, paperDollItemYPosition],
                    ScreenConstants.defaultGridItemScale, this.playerPaperDollScale
                );

                // add some logic to highlight equipped items
                // something like this: 
                // retrieve all equipped items (they are RogueLegionItems)
                // instantiate rectangles for each item and keep them in a list
                // when needed the entire list of highlight-rectangles can be deleted and recreated
                // (un)equipping an item places/removes it from the highlight-rectangle list

                this.setInventoryTableItemCallbacks(item);
                this.setPaperDollItemCallbacks(item);

                item.setPaperDollSpriteAlpha(0);
            }
        }
    }

    setInventoryTableItemCallbacks(item: RogueLegionItem) {
        item.setInventorySpriteCallback("pointerdown", () => { this.equipItem(item); });

        item.setInventorySpriteCallback("pointerover", () => {
            this.inventoryMouseHoverHighlight.setAlpha(1);        
            this.inventoryMouseHoverHighlight.setPosition(
                item.getInventorySpritePosition()[0],
                item.getInventorySpritePosition()[1]
            );
            this.showSelectedEquipmentTooltip(item);
        });

        item.setInventorySpriteCallback('pointermove', () => {
            this.moveSelectedEquipmentTooltipToMouse();
        });

        item.setInventorySpriteCallback("pointerout", () => {
            this.inventoryMouseHoverHighlight.setAlpha(0);
            this.hideSelectedEquipmentTooltip();
        });
    }

    setPaperDollItemCallbacks(item: RogueLegionItem) {
        item.setPaperDollSpriteCallback("pointerdown", () => { this.unEquipItem(item); });

        item.setPaperDollSpriteCallback("pointerover", () => {
            this.showSelectedEquipmentTooltip(item);
        });

        item.setPaperDollSpriteCallback('pointermove', () => {
            this.moveSelectedEquipmentTooltipToMouse();
        });

        item.setPaperDollSpriteCallback("pointerout", () => {
            this.hideSelectedEquipmentTooltip();
        });
    }

    showSelectedEquipmentTooltip(selectedEquipment: RogueLegionItem) {
        this.selectedEquipmentTooltipText.text = selectedEquipment.itemName;
        this.tweens.add({
            targets: [this.selectedEquipmentTooltipBackground, this.selectedEquipmentTooltipText],
            alpha: { from: 0, to: 1 },
            repeat: 0,
            duration: 500
        });
    }

    hideSelectedEquipmentTooltip() {
        this.selectedEquipmentTooltipBackground.setAlpha(0);
        this.selectedEquipmentTooltipText.setAlpha(0);
        this.tweens.killTweensOf(this.selectedEquipmentTooltipBackground);
        this.tweens.killTweensOf(this.selectedEquipmentTooltipText);
    }

    moveSelectedEquipmentTooltipToMouse() {
        this.selectedEquipmentTooltipBackground.x = this.game.input.mousePointer!.x;
        this.selectedEquipmentTooltipBackground.y = this.game.input.mousePointer!.y - ScreenConstants.verticalSpaceBetweenTooltipAndMousePointer;
        this.selectedEquipmentTooltipText.x = this.game.input.mousePointer!.x;
        this.selectedEquipmentTooltipText.y = this.game.input.mousePointer!.y - ScreenConstants.verticalSpaceBetweenTooltipAndMousePointer;
    }

    equipItem(item: RogueLegionItem) {
        //item.setPaperDollSpriteAlpha(1);
        let itemSlot = EquipmentSlot.RIGHT_HAND;
        let currentlyEquippedItem = this.equippedItemsService.getItemEquippedInSlot(itemSlot);
        if (currentlyEquippedItem != undefined) {
            this.unEquipItem(currentlyEquippedItem);
        }
        this.equippedItemsService.equipItem(EquipmentSlot.RIGHT_HAND, item);
        this.showPaperDoll();
    }

    unEquipItem(item: RogueLegionItem) {
        item.setPaperDollSpriteAlpha(0);
    }

    showPaperDoll() {
        let items = this.equippedItemsService.getEquippedItems();
        items.forEach(item => {
            item.setPaperDollSpriteAlpha(1);
        });
    }

    highlightEquippedItemsInInventoryTable() {

    }
}