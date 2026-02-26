import { Observable } from "rxjs";
import { Empty } from "./general.ts";
export declare const protobufPackage = "v1.users";
export interface DeleteResponse {
    status: string;
    result: boolean;
    message?: string | undefined;
}
export interface DeleteUserByIdDto {
    id: number;
}
export interface GetUserByIdDto {
    id: number;
}
export interface GetSomeUsersByIdsDto {
    ids: number[];
}
export interface GetSomeUsersByUsernameDto {
    username: string;
}
export interface UsersResponse {
    status: string;
    result: Users | undefined;
    message?: string | undefined;
}
export interface Users {
    users: User[];
}
export interface UserResponse {
    status: string;
    result: User | undefined;
    message?: string | undefined;
}
export interface User {
    id: number;
}
export declare const V1_USERS_PACKAGE_NAME = "v1.users";
export interface UsersServiceClient {
    getUsers(request: Empty): Observable<UsersResponse>;
    getUserById(request: GetUserByIdDto): Observable<UserResponse>;
    getSomeUsersByIds(request: GetSomeUsersByIdsDto): Observable<UsersResponse>;
    getSomeUsersByUsername(request: GetSomeUsersByUsernameDto): Observable<UsersResponse>;
    createUser(request: User): Observable<UserResponse>;
    updateUser(request: User): Observable<UserResponse>;
    deleteUserById(request: DeleteUserByIdDto): Observable<DeleteResponse>;
}
export interface UsersServiceController {
    getUsers(request: Empty): Observable<UsersResponse>;
    getUserById(request: GetUserByIdDto): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
    getSomeUsersByIds(request: GetSomeUsersByIdsDto): Observable<UsersResponse>;
    getSomeUsersByUsername(request: GetSomeUsersByUsernameDto): Observable<UsersResponse>;
    createUser(request: User): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
    updateUser(request: User): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
    deleteUserById(request: DeleteUserByIdDto): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}
export declare function UsersServiceControllerMethods(): (constructor: Function) => void;
export declare const USERS_SERVICE_NAME = "UsersService";
