export interface LoginResponse{
    message:string;
    token:string;
    user:User;
}

export interface User{
    name:string;
    email:string;
}