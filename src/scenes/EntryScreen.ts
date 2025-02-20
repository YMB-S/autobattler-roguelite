import { Scene } from 'phaser';

export class EntryScreen extends Scene {
    ypos: integer;
    dragon: Phaser.GameObjects.Image;
    msg_text: Phaser.GameObjects.Text;

    constructor() {
        super('EntryScreen');
        this.ypos = 0;
    }

    preload() {
        

    }

    create() {
        this.dragon = this.add.image(160, this.ypos, "evil_claymore");
        this.msg_text = this.add.text(160, 15, 'SELECT CHARACTER\n', {
            fontFamily: 'courier new', fontSize: 17, color: '#ffffff',
            stroke: '#000000', strokeThickness: 0,
            align: 'center', 
            
        }).setOrigin(0.5, 0);
        //this.cameras.main.setRoundPixels(true);

    }

    update(){
        this.dragon.y++;
        if (this.dragon.y >= 320){
            this.dragon.y = 0;
        }
    }
}