import { GameObjects } from "phaser";

export class GameSaveData {
    static instance: GameSaveData | undefined = undefined;
    gameSaveData: Map<string, string> = new Map<string, string>();

    public static getInstance() : GameSaveData {
        if (this.instance == undefined) {
            this.instance = new GameSaveData();
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

    public getPlayerBodySpriteName() : string | undefined {
        return this.gameSaveData.get("playerBodySpriteName");
    }

    public setPlayerBodySpriteName(spriteName: string): void {
        this.gameSaveData.set("playerBodySpriteName", spriteName);
        this.savePlayerData();
    }

    public getItemsInPlayerArsenal() : GameObjects.Image[] {
        var jsonItems = this.gameSaveData.get("itemsInPlayerArsenal") || "";
        if (jsonItems.length == 0) { return new Array(); }
        return JSON.parse(jsonItems);
    }
}