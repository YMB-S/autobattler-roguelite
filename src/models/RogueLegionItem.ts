import { GameObjects, Scene } from "phaser";


export class RogueLegionItem {
    itemName: string;
    inventorySpriteName: string | undefined;
    paperDollSpriteName: string | undefined;
    inventorySprite: GameObjects.Image;
    paperDollSprite: GameObjects.Image;
    inventorySpriteOnClick: () => void;
    paperDollSpriteOnClick: () => void;


    constructor(itemName: string, inventorySpriteName: string | undefined, paperDollSpriteName: string | undefined) {
        this.itemName = itemName;
        this.inventorySpriteName = inventorySpriteName;
        this.paperDollSpriteName = paperDollSpriteName;
    }

    addToScene( scene: Scene, 
        positionOfInventorySprite: integer[] | undefined,
        positionOfPaperDollSprite: integer[] | undefined,
        scaleOfInventorySprite: number = 1,
        scaleOfPaperDollSprite: number = 1): void
    {
        if (positionOfInventorySprite != undefined) {
            if (this.inventorySpriteName == undefined) {
                alert("No inventory sprite name set for item: " + this.itemName);
            }
            this.inventorySprite = scene.add.sprite(positionOfInventorySprite[0], positionOfInventorySprite[1], this.inventorySpriteName!).setScale(scaleOfInventorySprite);
            this.inventorySprite.setInteractive();
        }

        if (positionOfPaperDollSprite != undefined) {
            if (this.paperDollSpriteName == undefined) {
                alert("No paperdoll sprite name set for item: " + this.itemName);
            }
            this.paperDollSprite = scene.add.sprite(positionOfPaperDollSprite[0], positionOfPaperDollSprite[1], this.paperDollSpriteName!).setScale(scaleOfPaperDollSprite);
            this.paperDollSprite.setInteractive(scene.input.makePixelPerfect());
        }
    }

    setInventorySpriteCallback(eventType: string, callback: () => void) {
        this.inventorySprite.on(eventType, () => {
            callback();
        });
    }

    setPaperDollSpriteCallback(eventType: string, callback: () => void) {
        this.paperDollSprite.on(eventType, () => {
            callback();
        });
    }

    getInventorySpritePosition() : integer[] {
        return [this.inventorySprite.x, this.inventorySprite.y];
    }
}