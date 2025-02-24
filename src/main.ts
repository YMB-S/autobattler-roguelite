import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { EntryScreen } from './scenes/EntryScreen';
import { MainMenu } from './scenes/MainMenu';
import { CharacterSelect } from './scenes/CharacterSelect';


import { Game, Types } from "phaser";
import { BattleZoneSelection } from './scenes/battle/BattleZoneSelection';
import { Battle } from './scenes/battle/Battle';
import { BattleEquipmentSelection } from './scenes/battle/BattleEquipmentSelection';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    width: 320,
    height: 320,
    parent: 'game-container',
    backgroundColor: '#404040',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        EntryScreen,
        MainMenu,
        CharacterSelect,
        BattleZoneSelection,
        BattleEquipmentSelection,
        Battle
    ]
};

export default new Game(config);
