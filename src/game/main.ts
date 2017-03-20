import { Engine } from '../engine/engine';;
import { BrowserRenderer } from "../platforms/browser/browser-renderer";
import { RectangleEntity } from '../engine/entities/rectangleEntity';
import { Game } from "../engine/game";
import { Behaviour } from '../engine/behaviour';
import { Entity } from '../engine/entities/entity';
let engine = new Engine();

let renderer = new BrowserRenderer(<HTMLCanvasElement>document.getElementById('canvas'), engine);

class Wall extends RectangleEntity {
    constructor(x: number, y: number) {
        super();
        this.color = [255, 0, 0];
        this.bounds.size = math.matrix([10, 10]);
        this.transform.move(x, y);
        console.log(x, y);
    }
}

class Tank extends RectangleEntity {
    constructor() {
        super();
        this.color = [0, 255, 0];
        this.bounds.size = math.matrix([10, 10]);
        this.transform.move(10, 10);
    }
}

class TankControlBehaviour extends Behaviour<Tank> {

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

    constructor(entity: Tank) {
        super(entity);
        document.addEventListener('keydown', (evt: KeyboardEvent) => {
            if (this.translation[evt.key] !== undefined) {
                this.setMovement(evt.key);
            }
        });
        document.addEventListener('keyup', (evt: KeyboardEvent) => {
            if (this.translation[evt.key] !== undefined) {
                this.removeMovement(evt.key);
            }
        });
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
        if (this.entity.isColliding()) {
            this.entity.transform.move(-this.totalMovement.get([0]), -this.totalMovement.get([1]));
        }
    }
}

class TanksGame extends Game {

    map = [[0, 1, 0, 1, 0],
           [0, 1, 0, 0, 1],
           [0, 0, 0, 0, 0],
           [0, 1, 0, 1, 1],
           [0, 0, 1, 0, 0]];

    init() {
        this.engine.registerPrefab({
            entity: Tank,
            behaviours: [TankControlBehaviour],
            identifier: 'testTank'
        });

        this.engine.registerPrefab({
            entity: Wall,
            behaviours: [],
            identifier: 'wall'
        });

        for (let i=0; i<this.map.length; i++) {
            for (let j=0; j<this.map[i].length; j++) {
                if (this.map[i][j] !== 0) {
                    this.engine.instantiatePrefab('wall', j*10 + 20, i*10 + 20);
                }
            }
        }

        this.engine.instantiatePrefab('testTank');
    }
}

let game = new TanksGame(engine);
game.start();