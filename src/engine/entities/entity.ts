import { Transform } from '../transform';
import { IRenderable } from '../interfaces/irenderable';
import { IRenderer } from '../interfaces/irenderer';
import { Bounds } from "../bounds";
import { Behaviour } from '../behaviour';

// Any entity that is on screen and that has its own update logic

export abstract class Entity implements IRenderable {
    transform: Transform;
    bounds: Bounds;
    parent: Entity;
    children: Entity[] = [];
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
        this.bounds = new Bounds();
        this.transform = new Transform();
    }

    addBehaviour(behaviour: Behaviour<Entity>) {
        this.behaviours.push(behaviour);
    }

}