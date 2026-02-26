"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERS_SERVICE_NAME = exports.USERS_V1_PACKAGE_NAME = exports.protobufPackage = void 0;
exports.UsersServiceControllerMethods = UsersServiceControllerMethods;
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "users.v1";
exports.USERS_V1_PACKAGE_NAME = "users.v1";
function UsersServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = [
            "getUsers",
            "getUserById",
            "getSomeUsersByIds",
            "getSomeUsersByUsername",
            "createUser",
            "updateUser",
            "deleteUserById",
        ];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("UsersService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("UsersService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.USERS_SERVICE_NAME = "UsersService";
//# sourceMappingURL=users.js.map