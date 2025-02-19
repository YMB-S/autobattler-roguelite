import { Scene } from 'phaser';
import { SpriteRepository } from '../util/SpriteRepository';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    async init ()
    {
        // Add a progress bar
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);
        this.load.on('progress', (progress: number) => {
            bar.width = 4 + (460 * progress);
        });

    }

    preload ()
    {
        this.load.setPath('assets');

        let data = this.cache.json.get('testJson');
        //SpriteRepository.imageMap = data;

        for (var entry in data) {
            this.load.image(entry, data[entry]);
        }
        this.load.start();
    }

    create ()
    {
        this.scene.start('EntryScreen');
    }
}
