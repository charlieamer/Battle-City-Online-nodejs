import { Renderable } from '../renderable';
import { Transform } from '../transform';

// Any entity that is on screen and that has its own update logic

export abstract class Entity implements Renderable {
    transform: Transform;

    abstract update();
    abstract render();

    prepareRender(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.transform.x, this.transform.y);
    }
    cleanRender(context: CanvasRenderingContext2D) {
        context.restore();
    }

}