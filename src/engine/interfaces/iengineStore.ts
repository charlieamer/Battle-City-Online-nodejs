import { Entity } from '../entities/entity';

export enum EngineStoreActions {
    AddEntity, Update, Init
}

export interface IEngineStore {
    entities: Entity[];
    root: Entity;
}