import { RogueLegionItem } from "../models/RogueLegionItem";
import { PlayerEquippedItemsService } from "./PlayerEquippedItemsService";


export class BattleService {
    static instance: BattleService | undefined = undefined;
    public static getInstance(): BattleService {
        if (this.instance == undefined) {
            this.instance = new BattleService();
        }
        return this.instance;
    }

    equippedItemsService: PlayerEquippedItemsService;
    playerEquipment: RogueLegionItem[];

    constructor() {
        this.equippedItemsService = PlayerEquippedItemsService.getInstance();
    }

    startBattle() {
        this.playerEquipment = this.equippedItemsService.getEquippedItems();
        this.playerEquipment.forEach(element => {
            console.log(element);
        });
    }

    performTurn() {
        // TODO: add speed
        this.performPlayerTurn();
        this.performEnemyTurn();
    }

    performPlayerTurn() {

    }

    performEnemyTurn() {

    }
}