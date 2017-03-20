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
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.element.width, this.element.height);
        this.engine.hierarchyForEachEntity((entity) => {
            entity.prepareRender(this);
            entity.render(this);
            entity.cleanRender(this);
        });
        window.requestAnimationFrame(this.refresh.bind(this));
    }

    constructor(protected element: HTMLCanvasElement, engine: Engine) {
        this.engine = engine;
        this.context = element.getContext('2d');
        window.requestAnimationFrame(this.refresh.bind(this));
    }

    rectangle(from: mathjs.Matrix, to: mathjs.Matrix, color: number[]) {
        this.context.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] +')';
        let dimensions = <mathjs.Matrix>math.subtract(to, from);
        this.context.fillRect(from.get([0]), from.get([1]), dimensions.get([0]), dimensions.get([1]));
    }
}