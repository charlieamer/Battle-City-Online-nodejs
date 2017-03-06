import { IRenderer } from '../../engine/interfaces/irenderer';
import { Engine } from '../../engine/engine';

export class BrowserRenderer implements IRenderer {
    
    engine: Engine;
    context: CanvasRenderingContext2D;
    
    translate(transform: mathjs.Matrix) {
        this.context.translate(transform.get([0]), transform.get([1]));
    }
    saveState() {
        this.context.save();
    }
    restoreState() {
        this.context.restore();
    }
    refresh() {
        this.engine.hierarchyForEachEntity((entity) => {
            entity.render(this);
        });
        window.requestAnimationFrame(this.refresh.bind(this));
    }

    constructor(element: HTMLCanvasElement) {
        this.context = element.getContext('2d');
        window.requestAnimationFrame(this.refresh.bind(this));
    }
}