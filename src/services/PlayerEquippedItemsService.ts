import { EquipmentSlot } from "../constants/Enums";
import { RogueLegionItem } from "../models/RogueLegionItem";

interface EquippedItem {
    slot: EquipmentSlot;
    item: RogueLegionItem | undefined;
}

export class PlayerEquippedItemsService {

    static instance: PlayerEquippedItemsService | undefined = undefined;
    public static getInstance(): PlayerEquippedItemsService {
        if (this.instance == undefined) {
            this.instance = new PlayerEquippedItemsService();
        }
        return this.instance;
    }

    equippedItems: EquippedItem[] = [
        { slot: EquipmentSlot.HEAD, item: undefined },
        { slot: EquipmentSlot.BODY, item: undefined },
        { slot: EquipmentSlot.LEGS, item: undefined },
        { slot: EquipmentSlot.BOOTS, item: undefined },
        { slot: EquipmentSlot.RIGHT_HAND, item: undefined },
        { slot: EquipmentSlot.LEFT_HAND, item: undefined },
        { slot: EquipmentSlot.RING, item: undefined },
        { slot: EquipmentSlot.RING, item: undefined }
    ];
    
    getEquippedItems(): RogueLegionItem[] {
        let items: RogueLegionItem[] = new Array();
        this.equippedItems.forEach((e) => {
            if (e.item != undefined) {
                items.push(e.item);
            }
        });
        return items;
    }

    getItemEquippedInSlot(slot: EquipmentSlot) : RogueLegionItem | undefined{
        return this.equippedItems[slot].item;
    }

    equipItem(slot: EquipmentSlot, item: RogueLegionItem) {
        let availableSlot = this.equippedItems.find(e => e.slot == slot && e.item == undefined);
        if (availableSlot) {
            availableSlot.item = item;
        }
        else {
            let slotToMakeAvailable = this.equippedItems.find(e => e.slot == slot);
            slotToMakeAvailable!.item = item;
        }
    }

    unEquipItem(item: RogueLegionItem) {
        this.equippedItems.find(e => e.slot == item.equipmentSlot)!.item = undefined;
    }
}