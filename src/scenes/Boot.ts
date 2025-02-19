import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.setPath('assets');
        this.load.json('testJson', 'all_sprites_filenames.json');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
