export class Bounds {
    center: mathjs.Matrix;
    size: mathjs.Matrix;
    constructor(center: mathjs.Matrix = math.matrix([0,0]), size: mathjs.Matrix = math.matrix([0, 0])) {
        this.center = center;
        this.size = size;
    }
}