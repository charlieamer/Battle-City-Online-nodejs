import { IRenderer } from './interfaces/irenderer';
import { Entity } from './entities/entity';
import { EmptyEntity } from './entities/emptyEntity';
import { createStore } from 'redux';
import { IEngineStore, EngineStoreActions } from './interfaces/iengineStore';
import { IPrefab } from "./interfaces/iprefab";
import { IIdentifier } from "./interfaces/iidentifier";
import { Behaviour } from './behaviour';

export class Engine {

    store: Redux.Store<IEngineStore>;

    hierarchyForEachEntity(callback: (entity: Entity) => void, from: Entity = undefined) {
        if (!from) {
            from = this.store.getState().root;
        }
        callback(from);
        for(let entity of from.children) {
            this.hierarchyForEachEntity(callback, entity);
        }
    }

    constructor() {
        this.store = createStore<IEngineStore>(this.reducer.bind(this));
        this.init();
    }

    update() {
        this.store.dispatch({
            type: EngineStoreActions.Update
        });
    }

    registerPrefab<T extends Entity>(prefab: IPrefab<T>) {
        this.store.dispatch({
            type: EngineStoreActions.RegisterPrefab,
            value: prefab
        });
    }

    instantiatePrefab(prefabIdentifier: string) {
        this.store.dispatch({
            type: EngineStoreActions.InstantiatePrefab,
            value: prefabIdentifier
        });
    }

    init() {
        this.store.dispatch({
            type: EngineStoreActions.Init
        });
    }

    private addEntity(entity: Entity) {
        this.store.dispatch({
            type: EngineStoreActions.AddEntity,
            value: entity
        })
    }

    reducer(state: IEngineStore = {
        entities: [],
        root: undefined,
        identifiers: {},
        prefabs: {}
    }, action: any) {
        state = clone(state);
        switch (action.type) {
            case EngineStoreActions.AddEntity:
            this._addEntity(state, action.value);
            break;

            case EngineStoreActions.Init:
            this._initState(state);
            break;

            case EngineStoreActions.Update:
            this._update(state);
            break;

            case EngineStoreActions.RegisterPrefab:
            this._registerPrefab(state, action.value);
            break;

            case EngineStoreActions.InstantiatePrefab:
            this._instantiatePrefab(state, action.value);
            break;

            case '@@redux/INIT':
            break;

            default:
            throw new Error('Unknown action type: ' + action.type);
        }
        return state;
    }

    private _initState(state: IEngineStore) {
        state.root = new EmptyEntity();
        state.entities.push(state.root);
        this._refreshChildren(state);
    }

    private _addEntity(state: IEngineStore, entity: Entity) {
        if (!entity.parent) {
            entity.parent = state.root;
        }
        state.entities.push(entity);
        this._refreshChildren(state);
    }
    
    private _refreshChildren(state: IEngineStore) {
        state.entities.forEach((entity => {
            entity.children = state.entities.filter(candidate => candidate.parent === entity);
        }));
    }

    private _update(state: IEngineStore) {
        this.hierarchyForEachEntity((entity) => {
            entity.update();
        }, state.root);
    }

    private _registerPrefab(state: IEngineStore, prefab: IPrefab<Entity>) {
        this._addIdentifier(state, prefab);
        state.prefabs[prefab.identifier] = prefab;
    }

    private _instantiatePrefab(state: IEngineStore, identifier: string) {
        if (state.prefabs[identifier] === undefined) {
            throw new Error('Prefab not found: ' + identifier);
        }
        let newEntity = new state.prefabs[identifier].entity();
        this._addEntity(state, newEntity);
        for (let behaviour of state.prefabs[identifier].behaviours) {
            newEntity.addBehaviour(new behaviour(newEntity));
        }
    }

    private _addIdentifier(state: IEngineStore, identifier: IIdentifier) {
        if (state.identifiers[identifier.identifier] !== undefined) {
            throw new Error('Identifier ' + identifier.identifier + ' already exists!');
        } else {
            state.identifiers[identifier.identifier] = identifier;
        }
    }
}