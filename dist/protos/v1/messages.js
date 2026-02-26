"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES_SERVICE_NAME = exports.V1_MESSAGES_PACKAGE_NAME = exports.protobufPackage = void 0;
exports.MessagesServiceControllerMethods = MessagesServiceControllerMethods;
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "v1.messages";
exports.V1_MESSAGES_PACKAGE_NAME = "v1.messages";
function MessagesServiceControllerMethods() {
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
            (0, microservices_1.GrpcMethod)("MessagesService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("MessagesService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.MESSAGES_SERVICE_NAME = "MessagesService";
//# sourceMappingURL=messages.js.map