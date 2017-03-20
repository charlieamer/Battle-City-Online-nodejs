import { Entity } from './entities/entity';
import { IIdentifier } from './interfaces/iidentifier';
import { IReduxReducer } from "./interfaces/ireduxreducer";

export abstract class Behaviour<T extends Entity> implements IReduxReducer {
    identifier: string;

    constructor(protected entity: T){}
    abstract reduce(action: any, value: any);
    abstract update();

    dispatchEvent(action: any, value: any, target = this.identifier) {
        this.entity.engine.dispatchBehaviourEvent(target, action, value);
    }
}