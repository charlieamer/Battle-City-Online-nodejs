import { Entity } from "./entity";
import { IRenderer } from "../interfaces/irenderer";
import { ICollidable } from "../interfaces/icollidable";

export class RectangleEntity extends Entity implements ICollidable {
    public color = [0, 0, 0];

    render(renderer: IRenderer) {
        renderer.rectangle(this.bounds.upperLeft, this.bounds.lowerRight, this.color);
    }

    isCollidingWith(other: Entity): boolean {
        return other.bounds.isColliding(this.bounds);
    }
}