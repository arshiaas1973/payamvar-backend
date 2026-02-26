"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const configuration_1 = __importDefault(require("../config/configuration"));
let ConnectionGateway = class ConnectionGateway {
    handleConnection(client, ...args) {
        console.log('Client connected');
        client.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));
    }
    handleDisconnect(client) {
        console.log('Client disconnected');
    }
    handleMessage(client, body) {
        console.log(client);
        console.log(typeof client);
        console.log(`The Request is "${JSON.stringify(body)}"`);
        return "Hello";
    }
};
exports.ConnectionGateway = ConnectionGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('connection'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", String)
], ConnectionGateway.prototype, "handleMessage", null);
exports.ConnectionGateway = ConnectionGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3050, {
        cors: {
            origin: [
                (0, configuration_1.default)().origins.frontend
            ],
        },
    })
], ConnectionGateway);
//# sourceMappingURL=connection.gateway.js.map