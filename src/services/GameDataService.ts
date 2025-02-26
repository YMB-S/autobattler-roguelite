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
        for (let index = 0; index < 12; index++) {
            array.push(new RogueLegionItem(
                "Rapier",
                "rapier",
                "rapier_paperdoll"
            ));
            array.push(new RogueLegionItem(
                "Falchion I",
                "falchion_1",
                "falchion_1_paperdoll"
            ));
            array.push(new RogueLegionItem(
                "Falchion 2",
                "falchion_2",
                "falchion_2_paperdoll"
            ));
        }
        return array;
    }
}