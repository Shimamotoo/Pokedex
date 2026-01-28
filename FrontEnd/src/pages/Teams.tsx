import { ChevronRight, SquarePen, Trash2 } from "lucide-react";


function Teams(){
    return(
        <div className="min-h-screen">
            <section>
                <div className="flex justify-end p-3">
                    <div className="p-3 bg-gray-800 border border-gray-700 rounded-md">
                        Total de times: <span className="font-bold">1</span> / 5
                    </div>
                </div>
            </section>

            <section>
                <div className="p-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800 border border-gray-700 rounded-md ">
                        <div>
                            Nome Time Exemplo
                        </div>
                        <div  className="flex gap-2">
                            <div className="content-center p-3 bg-gray-800 border border-gray-700 rounded-md cursor-pointer">
                                <Trash2 size={20} color="red"/>
                            </div>
                            <div className="content-center p-3 bg-gray-800 border border-gray-700 rounded-md cursor-pointer">
                                <SquarePen size={20}/> 
                            </div>
                            <div className="p-3 cursor-pointer">
                                <ChevronRight size={25}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Teams;