import { Entity } from '../entities/entity';
import { Behaviour } from '../behaviour';
import { IIdentifier } from './iidentifier';
import { Type } from "../utils";

export interface IPrefab<T extends Entity> extends IIdentifier {
    entity: Type<T>
    behaviours: Type<Behaviour<T>>[];
}