import { Transform } from '../transform';
import { IRenderable } from '../interfaces/irenderable';
import { IRenderer } from '../interfaces/irenderer';

// Any entity that is on screen and that has its own update logic

export abstract class Entity implements IRenderable {
    transform: Transform;

    parent: Entity;
    children: Entity[] = [];

    abstract update();
    abstract render(renderer: IRenderer);

    prepareRender(renderer: IRenderer) {
        renderer.saveState();
        renderer.translate(this.transform.position);
    }
    cleanRender(renderer: IRenderer) {
        renderer.restoreState();
    }

}