import { Engine } from '../engine/engine';;
import { BrowserRenderer } from "../platforms/browser/browser-renderer";
import { RectangleEntity } from "../engine/entities/rectangleEntity";
import { Game } from "../engine/game";
import { Behaviour } from '../engine/behaviour';
import { Entity } from '../engine/entities/entity';
let engine = new Engine();
let game = new Game(engine);
let renderer = new BrowserRenderer(<HTMLCanvasElement>document.getElementById('canvas'), engine);

class hepek extends RectangleEntity {
    constructor() {
        super();
        this.bounds.size = math.matrix([10, 10]);
        this.transform.move(10, 10);
    }
}

class testBehaviour extends Behaviour<hepek> {

    totalMovement = math.matrix([0, 0]);
    
    translation = {
        "ArrowRight": math.matrix([1, 0]),
        "ArrowLeft": math.matrix([-1, 0]),
        "ArrowDown": math.matrix([0, 1]),
        "ArrowUp": math.matrix([0, -1])
    };

    setMovement(key: string) {
        this.dispatchEvent('SetMovement', key);
    }

    removeMovement(key: string) {
        this.dispatchEvent('RemoveMovement', key);
    }

    constructor(entity: hepek) {
        super(entity);
        window.onkeydown = (evt: KeyboardEvent) => {
            if (this.translation[evt.key] !== undefined) {
                this.setMovement(evt.key);
            }
        }
        window.onkeyup = (evt: KeyboardEvent) => {
            if (this.translation[evt.key] !== undefined) {
                this.removeMovement(evt.key);
            }
        }
    }

    reduce(action: any, value: any) {
        switch (action) {
            case 'SetMovement':
            this._setMovement(value);
            break;

            case 'RemoveMovement':
            this._removeMovement(value);
            break;
        }
    }

    movements: string[] = [];

    _setMovement(key: string) {
        if (this.movements.indexOf(key) === -1) {
            this.movements.push(key);
        }
    }

    _removeMovement(key: string) {
        const idx = this.movements.indexOf(key);
        if (idx !== -1) {
            this.movements.splice(idx, 1);
        }
    }

    update() {
        this.totalMovement = math.matrix([0, 0]);
        for (let movement of this.movements) {
            this.totalMovement = this.translation[movement];
        }
        this.entity.transform.move(this.totalMovement.get([0]), this.totalMovement.get([1]));
    }
}

engine.registerPrefab({
    entity: hepek,
    behaviours: [testBehaviour],
    identifier: 'hepek'
});

engine.instantiatePrefab('hepek');

game.start();