import { Entity } from "../entities/entity";

export interface ICollidable {
    isCollidingWith(other: Entity): boolean;
}

export function isCollidable(value: any): value is ICollidable {
    return value.isCollidingWith !== undefined;
}