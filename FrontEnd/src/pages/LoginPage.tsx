import { useState } from "react";
import { useAuth } from "../contexts/useAuth";

export function LoginPage() {
    const { login } = useAuth();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();

        let hasError = false;

        if(!email){
            setEmailError("Campo de email é obrigatório.");
            hasError = true
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Campo de senha é obrigatório");
            hasError = true;
        } else {
            setPasswordError("");
        }
        
        if (hasError) return; 

        try{
            await login(email, password);                      
        } catch(error) {
            console.log(error);
        }
        
               
    }

    return(
        <div className="w-full min-h-screen font-sans bg-gray-800">
            <main className="flex min-h-screen text-white ">

                {/* Lado esquerdo */}
                <section className="flex items-center justify-center flex-1 bg-gray-900">
                <div className="w-full max-w-sm">
                    <h1 className="mb-6 text-2xl font-bold">Login</h1>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <input 
                                type="text" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className={`
                                    p-3 bg-gray-800 rounded-md outline-none transition-all border
                                    ${emailError 
                                        ? 'border-red-500 focus:border-red-500' 
                                        : 'border-transparent focus:border-blue-500'}
                                `} 
                            />
                            {emailError && <span className="mt-1 text-sm text-red-500">{emailError}</span>}
                        </div>

                        <div className="flex flex-col">
                            <input 
                                type="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Senha"  
                                className={`
                                    p-3 bg-gray-800 rounded-md outline-none transition-all border
                                    ${passwordError 
                                        ? 'border-red-500 focus:border-red-500' 
                                        : 'border-transparent focus:border-blue-500'}
                                `}                                 
                            />
                            {passwordError && <span className="mt-1 text-sm text-red-500">{passwordError}</span>}
                        </div>
                        <div>
                            <button type="submit" className="w-full p-3 font-semibold rounded-md bg-gradient-to-r from-indigo-800 to-indigo-600">
                                Entrar
                            </button>   
                        </div>
                    </form>
                </div>
                </section>
                {/* Lado direito */}
                <section className="flex items-center justify-center flex-1 bg-gradient-to-r from-indigo-800 to-indigo-600">
                <header>
                    <h1 className="text-3xl font-bold">Pokedex</h1>
                    <h2 className="text-indigo-200 opacity" >Projeto pessoal e portfólio</h2>
                </header>
                </section>

            </main>
        </div>

    )
}

export default LoginPage;