import { Entity } from './entities/entity';
export abstract class Behaviour<T extends Entity> {
    constructor(protected entity: T){}
    abstract update();
}