import { Engine } from './engine';
export abstract class Game {
    private finishedFrames: number;
    protected startTimestamp: number;

    constructor(protected engine: Engine, protected desiredFps = 50) {}

    start() {
        this.startTimestamp = new Date().getTime();
        this.finishedFrames = 0;
        this.init();
        this.refresh();
    }

    refresh() {
        const now = new Date().getTime();
        // In case we miss to render a frame, update the game as many time as it is necessary
        while((now - this.startTimestamp) / this.desiredFps - this.finishedFrames > 0) {
            this.engine.update();
            this.finishedFrames++;
        }
        setTimeout(this.refresh.bind(this), 1000 / this.desiredFps);
    }

    abstract init();
}