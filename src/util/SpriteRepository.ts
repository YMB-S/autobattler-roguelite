import { cwd } from "process";

/*
export class SpriteRepository {
    private static imageMap: Record<string, string> = {};
    private static instance: SpriteRepository;

    public static getInstance(): SpriteRepository {
        if (SpriteRepository.imageMap.isEmpty) {console.error("No filenames have been loaded yet.")};
        if (this.instance == null) {
            this.instance = new SpriteRepository();
        }
        return this.instance;
    }

    public static async loadImageMap(scene: Phaser.Scene): Promise<void> {
        scene.load.json('imageMap', '../public/assets/all_sprites_filenames.json');
        scene.load.start();
        scene.load.once('complete', () => {
            const loadedMap = scene.cache.json.get('imageMap') || {};
            SpriteRepository.imageMap = loadedMap;
            console.log(loadedMap);

            // ✅ Load each image file into Phaser
            Object.entries(loadedMap).forEach(([key, path]) => {
                scene.load.image(key, `assets/${path}`); // Adjust if path needs tweaking
            });

            console.log("✅ All sprites loaded into Phaser:", SpriteRepository.imageMap);
            scene.load.start();
        });
        //
    }

    public static getImageKey(filename: string): string | undefined {
        return SpriteRepository.imageMap[filename];
    }
}

*/
export class SpriteRepository {
    private static imageMap: Record<string, string> = {};

    /** ✅ Loads JSON & Registers All Sprites */
    public static async loadImageMap(scene: Phaser.Scene): Promise<void> {
        scene.load.json('imageMap', 'all_sprites_filenames.json'); // ✅ Correct path
        scene.load.start(); // Ensure loading starts

        scene.load.once('complete', () => {
            const loadedMap = scene.cache.json.get('imageMap'); // ✅ Get JSON data
            console.log(loadedMap);
            if (!loadedMap || typeof loadedMap !== 'object') {
                console.error("❌ Failed to load image map.");
                return;
            }

            SpriteRepository.imageMap = loadedMap;
            console.log("✅ Loaded Image Map:", SpriteRepository.imageMap);

            // ✅ Load images into Phaser's cache
            Object.entries(SpriteRepository.imageMap).forEach(([key, path]) => {
                scene.load.image(key, `assets/${path}`);
            });

            scene.load.start(); // ✅ Start loading images
        });

        scene.load.start(); // Ensure loading starts
    }

    /** ✅ Get the image key */
    public static getImageKey(filename: string): string | undefined {
        return SpriteRepository.imageMap[filename];
    }
}
