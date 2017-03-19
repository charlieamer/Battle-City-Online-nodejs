import { Transform } from '../transform';
import { Engine } from '../engine';

export interface IRenderer {
    translate(transform: mathjs.Matrix);
    saveState();
    restoreState();

    rectangle(lower: mathjs.Matrix, upper: mathjs.Matrix);

    engine: Engine;
}