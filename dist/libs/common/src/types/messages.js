import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
export const protobufPackage = "v1.messages";
export const V1_MESSAGES_PACKAGE_NAME = "v1.messages";
export function MessagesServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = [
            "getMessage",
            "getOneMessage",
            "getSomeMessages",
            "sendMessage",
            "removeMessage",
            "updateMessage",
        ];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcMethod("MessagesService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            GrpcStreamMethod("MessagesService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
export const MESSAGES_SERVICE_NAME = "MessagesService";
//# sourceMappingURL=messages.js.map