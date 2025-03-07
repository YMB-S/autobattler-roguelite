import { GameObjects, Scene } from "phaser";
import { GameDataService } from "../../services/GameDataService";
import { PlayerEquippedItemsService } from "../../services/PlayerEquippedItemsService";
import { BattleService } from "../../services/BattleService";

export class Battle extends Scene {
    gameDataService: GameDataService;
    battleService: BattleService;
    equippedItemsService: PlayerEquippedItemsService;

    paperDollBase: GameObjects.Image;
    playerPaperDollScale: integer = 4;
    playerPaperDollPosition: integer[] = [160, 160];

    constructor() {
        super('Battle');
        this.gameDataService = GameDataService.getInstance();
        this.equippedItemsService = PlayerEquippedItemsService.getInstance();
        this.battleService = BattleService.getInstance();
    }

    create() {
        this.addPlayerPaperDollBase();
        this.battleService.startBattle();
    }

    addPlayerPaperDollBase() {
        let playerBodyBaseSpriteName = this.gameDataService.getPlayerBodySpriteName();
        this.paperDollBase = this.add.image(this.playerPaperDollPosition[0], this.playerPaperDollPosition[1], playerBodyBaseSpriteName)
        this.paperDollBase.setScale(this.playerPaperDollScale);
    }
}