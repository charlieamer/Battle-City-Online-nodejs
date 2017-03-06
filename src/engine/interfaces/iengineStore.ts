import { Entity } from '../entities/entity';

export enum EngineStoreActions {
    AddEntity, Update
}

export interface IEngineStore {
    entities: Entity[];
    root: Entity;
}