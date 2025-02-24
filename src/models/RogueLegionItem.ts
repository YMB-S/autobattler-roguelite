import { GameObjects, Scene } from "phaser";


export class RogueLegionItem {
    itemName: string;
    inventorySpriteName: string | undefined;
    paperDollSpriteName: string | undefined;

    constructor(itemName: string, inventorySpriteName: string | undefined, paperDollSpriteName: string | undefined) {
        this.itemName = itemName;
        this.inventorySpriteName = inventorySpriteName;
        this.paperDollSpriteName = paperDollSpriteName;
    }

    addToScene( scene: Scene, 
        positionOfInventorySprite: integer[] | undefined,
        positionOfPaperDollSprite: integer[] | undefined): void
    {
        if (positionOfInventorySprite != undefined) {
            if (this.inventorySpriteName == undefined) {
                alert("No inventory sprite name set for item: " + this.itemName);
            }
            scene.add.sprite(positionOfInventorySprite[0], positionOfInventorySprite[1], this.inventorySpriteName!)
        }

        if (positionOfPaperDollSprite != undefined) {
            if (this.paperDollSpriteName == undefined) {
                alert("No paperdoll sprite name set for item: " + this.itemName);
            }
            scene.add.sprite(positionOfPaperDollSprite[0], positionOfPaperDollSprite[1], this.paperDollSpriteName!)
        }
    }
}