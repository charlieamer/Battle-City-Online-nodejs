export class Transform {
    position: mathjs.Matrix;
    constructor(x = 0, y = 0) {
        this.position = math.matrix([x,y]);
    }
    move(x: number, y: number) {
        this.position = <mathjs.Matrix>math.add(this.position, [x,y]);
    }
    get x(): number {
        return this.position.get([0]);
    }
    get y(): number {
        return this.position.get([1]);
    }
}