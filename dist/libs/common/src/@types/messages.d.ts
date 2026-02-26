import { Observable } from "rxjs";
export declare const protobufPackage = "messages.v1";
export interface Empty {
}
export interface UpdateMessageDto {
    id: number;
    content?: string | undefined;
}
export interface RemoveMessageDto {
    id?: number | undefined;
    senderId?: number | undefined;
    receiverId?: number | undefined;
    content?: string | undefined;
    createdAt?: string | undefined;
}
export interface SendMessageDto {
    senderId: number;
    receiverId: number;
    content: string;
}
export interface GetMessageDto {
    id?: number | undefined;
    senderId?: number | undefined;
    receiverId?: number | undefined;
    content?: string | undefined;
    createdAt?: string | undefined;
    viewerId?: string | undefined;
    viewedAt?: string | undefined;
}
export interface MessageResponse {
    status: string;
    result: Message | undefined;
    message?: string | undefined;
}
export interface MessagesResponse {
    status: string;
    result: Messages | undefined;
    message?: string | undefined;
}
export interface Messages {
    messages: Message[];
}
export interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    createdAt: string;
    viewers: Viewers | undefined;
}
export interface Viewers {
    viewers: Viewer[];
}
export interface Viewer {
    user: User | undefined;
    viewedAt: string;
}
export interface User {
    id: number;
}
export declare const MESSAGES_V1_PACKAGE_NAME = "messages.v1";
export interface MessagesServiceClient {
    getMessage(request: Empty): Observable<MessagesResponse>;
    getOneMessage(request: GetMessageDto): Observable<MessageResponse>;
    getSomeMessages(request: GetMessageDto): Observable<MessageResponse>;
    sendMessage(request: SendMessageDto): Observable<MessageResponse>;
    removeMessage(request: RemoveMessageDto): Observable<MessageResponse>;
    updateMessage(request: UpdateMessageDto): Observable<MessageResponse>;
}
export interface MessagesServiceController {
    getMessage(request: Empty): Observable<MessagesResponse>;
    getOneMessage(request: GetMessageDto): Promise<MessageResponse> | Observable<MessageResponse> | MessageResponse;
    getSomeMessages(request: GetMessageDto): Observable<MessageResponse>;
    sendMessage(request: SendMessageDto): Promise<MessageResponse> | Observable<MessageResponse> | MessageResponse;
    removeMessage(request: RemoveMessageDto): Promise<MessageResponse> | Observable<MessageResponse> | MessageResponse;
    updateMessage(request: UpdateMessageDto): Promise<MessageResponse> | Observable<MessageResponse> | MessageResponse;
}
export declare function MessagesServiceControllerMethods(): (constructor: Function) => void;
export declare const MESSAGES_SERVICE_NAME = "MessagesService";
