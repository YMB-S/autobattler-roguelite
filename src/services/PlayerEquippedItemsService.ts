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
    ];

    equipItem(slot: EquipmentSlot, item: RogueLegionItem) {
        this.equippedItems.find(e => e.slot == slot)!.item = item;
    }
}