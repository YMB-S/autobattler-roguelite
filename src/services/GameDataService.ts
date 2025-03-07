import { EquipmentSlot } from "../constants/Enums";
import { RogueLegionItem } from "../models/RogueLegionItem";

export class GameDataService {
    static instance: GameDataService | undefined = undefined;
    public static getInstance() : GameDataService {
        if (this.instance == undefined) {
            this.instance = new GameDataService();
        }
        return this.instance;
    }

    gameSaveData: Map<string, string> = new Map<string, string>();

    constructor() {
        this.gameSaveData = new Map<string, string>();

        const loadedData = localStorage.getItem('rogueLegionSaveData');
        if (loadedData != null) {
            this.gameSaveData = new Map<string, string>(Object.entries(JSON.parse(loadedData)));
        }
    }

    savePlayerData() {
        localStorage.setItem('rogueLegionSaveData', JSON.stringify(Object.fromEntries(this.gameSaveData)));
    }

    public saveDataExists() : boolean {
        return this.gameSaveData.size > 0;
    }

    public getPlayerBodySpriteName() : string {
        return this.gameSaveData.get("playerBodySpriteName") ?? "";
    }

    public setPlayerBodySpriteName(spriteName: string): void {
        this.gameSaveData.set("playerBodySpriteName", spriteName);
        this.savePlayerData();
    }

    public getItemsInPlayerArsenal(): RogueLegionItem[] {
        let array:RogueLegionItem[] = [];
        for (let index = 0; index < 2; index++) {
            array.push(new RogueLegionItem(
                "Rapier",
                EquipmentSlot.RIGHT_HAND,
                "weapon_rapier",
                "weapon_paperdoll_rapier"
            ));
            array.push(new RogueLegionItem(
                "Falchion I",
                EquipmentSlot.RIGHT_HAND,
                "weapon_falchion_1",
                "weapon_paperdoll_falchion_1"
            ));
            array.push(new RogueLegionItem(
                "Falchion 2",
                EquipmentSlot.RIGHT_HAND,
                "weapon_falchion_2",
                "weapon_paperdoll_falchion_2"
            ));
            array.push(new RogueLegionItem(
                "Buckler",
                EquipmentSlot.LEFT_HAND,
                "shield_buckler_1",
                "shield_paperdoll_buckler_1"
            ));
            array.push(new RogueLegionItem(
                "Eternal Torment",
                EquipmentSlot.HEAD,
                "helmet_eternal_torment",
                "helmet_paperdoll_eternal_torment"
            ));
        }
        return array;
    }
}