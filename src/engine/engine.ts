import { IRenderer } from './interfaces/irenderer';
import { Entity } from './entities/entity';
import { EmptyEntity } from './entities/emptyEntity';
export class Engine {
    rootEntity: Entity;

    hierarchyForEachEntity(callback: (entity: Entity) => void, from: Entity = undefined) {
        if (!from) {
            from = this.rootEntity;
        }
        callback(from);
        for(let entity of from.children) {
            this.hierarchyForEachEntity(callback, entity);
        }
    }

    constructor() {
        this.rootEntity = new EmptyEntity();
    }

    update() {
        this.hierarchyForEachEntity((entity) => {
            entity.update();
        });
    }
}