import { Engine } from '../engine/engine';;
import { BrowserRenderer } from "../platforms/browser/browser-renderer";
import { RetangleEntity } from "../engine/entities/rectangleEntity";
import { Game } from "../engine/game";
import { Behaviour } from '../engine/behaviour';
let engine = new Engine();
let game = new Game(engine);
let renderer = new BrowserRenderer(<HTMLCanvasElement>document.getElementById('canvas'), engine);

class hepek extends RetangleEntity {
    constructor() {
        super();
        this.bounds.size = math.matrix([10, 10]);
    }
}

class testBehaviour extends Behaviour<hepek> {
    update() {
        this.entity.transform.move(1, 1);
    }
}

engine.registerPrefab({
    entity: hepek,
    behaviours: [testBehaviour],
    identifier: 'hepek'
});

engine.instantiatePrefab('hepek');

game.start();