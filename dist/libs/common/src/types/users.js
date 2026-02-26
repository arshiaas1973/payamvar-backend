import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
export const protobufPackage = "v1.users";
export const V1_USERS_PACKAGE_NAME = "v1.users";
export function UsersServiceControllerMethods() {
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
            GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
export const USERS_SERVICE_NAME = "UsersService";
//# sourceMappingURL=users.js.map