import { Entity } from "./entity";
import { IRenderer } from "../interfaces/irenderer";

export class RectangleEntity extends Entity {
    render(renderer: IRenderer) {
        const halfSize = math.divide(this.bounds.size, 2);
        const from = <mathjs.Matrix>math.subtract(this.bounds.center, halfSize);
        const to = <mathjs.Matrix>math.add(this.bounds.center, halfSize);
        renderer.rectangle(from, to);
    }
}