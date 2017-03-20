import { Entity } from './entities/entity';
export class Bounds {
    size: mathjs.Matrix;
    constructor(protected parent: Entity, size: mathjs.Matrix = math.matrix([0, 0])) {
        this.size = size;
    }

    get halfSize() {
        return <mathjs.Matrix>math.divide(this.size, 2);
    }

    get upperLeft() {
        return <mathjs.Matrix>math.multiply(this.halfSize, -1);
    }

    get lowerRight() {
        return <mathjs.Matrix>this.halfSize;
    }

    get upperLeftGlobal() {
        return <mathjs.Matrix>this.parent.globalPointFromLocal(this.upperLeft);
    }

    get lowerRightGlobal() {
        return <mathjs.Matrix>this.parent.globalPointFromLocal(this.lowerRight);
    }

    isColliding(other: Bounds) {
        if (this.upperLeftGlobal.get([0]) < other.lowerRightGlobal.get([0]) &&
            this.lowerRightGlobal.get([0]) > other.upperLeftGlobal.get([0]) &&
            this.upperLeftGlobal.get([1]) < other.lowerRightGlobal.get([1]) &&
            this.lowerRightGlobal.get([1]) > other.upperLeftGlobal.get([1])) {
                return true;
        } else {
            return false
        }
    }
}