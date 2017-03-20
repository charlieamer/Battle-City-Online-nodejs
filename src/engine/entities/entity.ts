import { Transform } from '../transform';
import { IRenderable } from '../interfaces/irenderable';
import { IRenderer } from '../interfaces/irenderer';
import { Bounds } from "../bounds";
import { Behaviour } from '../behaviour';
import { Engine } from '../engine';
import { BrowserRenderer } from '../../platforms/browser/browser-renderer';
import { isCollidable } from "../interfaces/icollidable";
import { IIdentifier } from '../interfaces/iidentifier';

// Any entity that is on screen and that has its own update logic

export abstract class Entity implements IRenderable, IIdentifier {
    identifier: string;

    transform: Transform;
    bounds: Bounds;
    parent: Entity;
    children: Entity[] = [];
    engine: Engine;
    private behaviours: Behaviour<Entity>[] = [];

    abstract render(renderer: IRenderer);

    update() {
        for (let behaviour of this.behaviours) {
            behaviour.update();
        }
    }

    prepareRender(renderer: IRenderer) {
        renderer.saveState();
        renderer.translate(this.transform.position);
    }
    cleanRender(renderer: IRenderer) {
        renderer.restoreState();
    }

    constructor() {
        this.bounds = new Bounds(this);
        this.transform = new Transform();
    }

    globalPointFromLocal(point: mathjs.Matrix) {
        return math.add(this.transform.position, point);
    }

    addBehaviour(behaviour: Behaviour<Entity>) {
        this.behaviours.push(behaviour);
    }

    isColliding(): boolean {
        if (!isCollidable(this)) {
            return false;
        }
        var ret = false;
        this.engine.hierarchyForEachEntity(entity => {
            if (isCollidable(entity) && entity.identifier != this.identifier) {
                ret = ret || entity.isCollidingWith(this);
                if (entity.isCollidingWith(this)) {
                    console.log(entity, this);
                }
            }
        });
        return ret;
    }

}