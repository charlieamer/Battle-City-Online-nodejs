import { Entity } from '../entities/entity';
import { IIdentifier } from "./iidentifier";
import { IPrefab } from "./iprefab";

export enum EngineStoreActions {
    AddEntity, Update, Init, RegisterPrefab, InstantiatePrefab
}

export interface IEngineStore {
    entities: Entity[];
    root: Entity;
    identifiers: {[index: string]: IIdentifier};
    prefabs: {[index: string]: IPrefab<Entity>};
}