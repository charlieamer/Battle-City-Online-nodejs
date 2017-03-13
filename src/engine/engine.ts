import { IRenderer } from './interfaces/irenderer';
import { Entity } from './entities/entity';
import { EmptyEntity } from './entities/emptyEntity';
import { createStore } from 'redux';
import { IEngineStore, EngineStoreActions } from './interfaces/iengineStore';
import clone = require('clone');

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

    addEntity(entity: Entity) {
        this.store.dispatch({
            type: EngineStoreActions.AddEntity,
            value: entity
        })
    }

    init() {
        this.store.dispatch({
            type: EngineStoreActions.Init
        });
    }

    reducer(state: IEngineStore = {
        entities: [],
        root: new EmptyEntity()
    }, action: any) {
        let newState = state;
        switch (action.type) {
            case EngineStoreActions.AddEntity:
            this._addEntity(newState, action.value);
            break;

            case EngineStoreActions.Init:
            this._initState(newState);
            break;
        }
        return newState;
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
        });
    }
}