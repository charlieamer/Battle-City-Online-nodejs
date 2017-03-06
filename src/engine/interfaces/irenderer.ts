import { Transform } from '../transform';
import { Engine } from '../engine';

export interface IRenderer {
    translate(transform: mathjs.Matrix);
    saveState();
    restoreState();
    engine: Engine;
}