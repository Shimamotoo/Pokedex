import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    return(
        <div className="w-full min-h-screen font-sans bg-gray-800">
            <main className="flex min-h-screen text-white bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-600">

                {/* Lado esquerdo */}
                <section className="flex items-center justify-center flex-1 ">
                <div className="w-full max-w-sm">
                    <h1 className="mb-6 text-2xl font-bold">Login</h1>

                    <form className="flex flex-col gap-4" onSubmit={(e) => {
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
                    }}>
                        <div className="flex flex-col">
                            <TextField 
                                id="email" 
                                label="Email" 
                                variant="standard" 
                                type="text"
                                fullWidth 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!emailError}
                                helperText={emailError}
                                sx={{ 
                                    input: { color: 'white' }, 
                                    label: { color: 'gray' },
                                    '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                                }}
                            />
                        </div>

                        <div className="flex flex-col">
                            <TextField 
                                id="password" 
                                label="Senha" 
                                variant="standard" 
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                error={!!passwordError}
                                helperText={passwordError}
                                sx={{ 
                                    input: { color: 'white' }, 
                                    label: { color: 'gray' },
                                    '& .MuiInput-underline:before': { borderBottomColor: 'white' }
                                }}
                            />                        
                        </div>
                        <div>   
                            <Button 
                                type="submit"
                                variant="contained" 
                                sx={{ 
                                    backgroundColor: '#4f46e5', 
                                    '&:hover': {
                                    backgroundColor: '#4338ca', 
                                    }
                                }}
                                fullWidth
                            >
                                Entrar
                            </Button>
                        </div>
                    </form>
                </div>
                </section>

                {/* Lado direito */}
                <section className="flex items-center justify-center flex-1 ">
                <header>
                    <h1 className="text-3xl font-bold">Pokedex</h1>
                    <p className="text-sm text-indigo-200 opacity" >Projeto pessoal e portfólio</p>
                </header>
                </section>

            </main>
        </div>

    )
}

export default LoginPage;