import type { LoginResponse } from "../types/LoginResponse"
import APIUrl from "./baseURL"

export const authService = {
    async login(email:string, password:string):Promise<LoginResponse>{

        try{
            const response = await APIUrl.post<LoginResponse>(`/auth/login`, {
                email,
                password
            });
    
            return response.data

        } catch(error){
            console.error(error)
            throw error; 
        }
    }   
}