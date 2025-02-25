import { GameObjects } from "phaser";
import { RogueLegionItem } from "../models/RogueLegionItem";

export class GameDataService {
    static instance: GameDataService | undefined = undefined;
    gameSaveData: Map<string, string> = new Map<string, string>();

    public static getInstance() : GameDataService {
        if (this.instance == undefined) {
            this.instance = new GameDataService();
        }
        return this.instance;
    }

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
        for (let index = 0; index < 50; index++) {
            array.push(new RogueLegionItem(
                "Test Item",
                "demo_sword_inventory",
                "demo_sword_paperdoll"
            ));
        }
        return array;
        return [new RogueLegionItem(
            "Test Item",
            "demo_sword_inventory",
            "demo_sword_paperdoll"
        ), new RogueLegionItem(
            "Test Item",
            "demo_sword_inventory",
            "demo_sword_paperdoll"
        )
        ];
    }
}