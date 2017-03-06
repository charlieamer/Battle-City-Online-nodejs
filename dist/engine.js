System.register("renderable", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("transform", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Transform;
    return {
        setters: [],
        execute: function () {
            Transform = (function () {
                function Transform(x, y) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    this.position = math.matrix([x, y]);
                }
                Transform.prototype.move = function (x, y) {
                    this.position = math.add(this.position, [x, y]);
                };
                Object.defineProperty(Transform.prototype, "x", {
                    get: function () {
                        return this.position.get([0]);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Transform.prototype, "y", {
                    get: function () {
                        return this.position.get([1]);
                    },
                    enumerable: true,
                    configurable: true
                });
                return Transform;
            }());
            exports_2("Transform", Transform);
        }
    };
});
System.register("entities/entity", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Entity;
    return {
        setters: [],
        execute: function () {
            // Any entity that is on screen and that has its own update logic
            Entity = (function () {
                function Entity() {
                }
                Entity.prototype.prepareRender = function (context) {
                    context.save();
                    context.translate(this.transform.x, this.transform.y);
                };
                Entity.prototype.cleanRender = function (context) {
                    context.restore();
                };
                return Entity;
            }());
            exports_3("Entity", Entity);
        }
    };
});
System.register("user", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var User;
    return {
        setters: [],
        execute: function () {
            User = (function () {
                function User() {
                }
                return User;
            }());
            exports_4("User", User);
        }
    };
});
//# sourceMappingURL=engine.js.map