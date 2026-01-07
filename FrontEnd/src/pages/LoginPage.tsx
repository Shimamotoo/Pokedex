export function LoginPage() {

    return(
        <div className="w-full min-h-screen font-sans bg-gray-800">
            <main className="flex min-h-screen text-white">

                {/* Lado esquerdo */}
                <section className="flex items-center justify-center flex-1 bg-gray-900">
                <div className="w-full max-w-sm">
                    <h1 className="mb-6 text-2xl font-bold">Login</h1>

                    <form className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    </form>
                </div>
                </section>

                {/* Lado direito */}
                <section className="flex items-center justify-center flex-1 bg-indigo-600">
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