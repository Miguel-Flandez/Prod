import { Header, Warning } from "@/components"
import { useEffect, useState } from "react"
import { pop } from "@/assets"

export default function Todolist(){

    const [todo, setodo] = useState([])

    const [prompt, setPrompt] = useState(false)
    const popSound = new Audio(pop)

    function addTodo(){
        const newEntry = [...todo,{title:'', done:0}]
        const condition = todo.find((obj, index)=>{
            return ((index===todo.length-1) && obj.title.trim()) && true
        })

        if(!todo.length || condition){
            setodo(newEntry)
            localStorage.setItem('to-do-list', JSON.stringify(newEntry))
        }else(
            setPrompt(true)
        )
        console.log(newEntry)
    }

    function change(event, index){
        const updatedEntry = todo.map((obj,i)=>{
            console.log(event.target.value, index, i)
               return index===i ? {...obj, title:event.target.value} : obj
            })

            console.log(updatedEntry)


        setodo(updatedEntry)
        localStorage.setItem('to-do-list', JSON.stringify(updatedEntry))

    }

    function check(index){
        const updatedEntry = todo.map((obj,i)=>{
            return (index===i && obj.title.trim()) ? {...obj, done:!obj.done ? true : !obj.done} : obj
        })
        popSound.play()

        if(todo[index].title.trim()){
            setodo(updatedEntry)
            localStorage.setItem('to-do-list', JSON.stringify(updatedEntry))
        }else{
            setPrompt(true)
        }
        
    }


    useEffect(()=>{
        document.body.style.backgroundColor = '#9290C3'

        const list = localStorage.getItem('to-do-list')
        list && setodo(JSON.parse(list))

        async function getTodos(){
            const res = await fetch('http://localhost:3000/todos')
            const data = await res.json()

            data && setodo(data)

            console.log('api')
        }

        getTodos()

    },[])

    return(
        <div className="w-screen h-screen">
            <Header/>
            <Warning prompt={prompt} setPrompt={setPrompt}/>
            <div className="flex justify-between w-full h-[80%]">
                <div id="pending" className=" w-[45%] h-full m-auto bg-[#1211112f] rounded-xl relative z-10" >
                    <div className="h-[90%] w-full overflow-auto overflow-x-hidden">
                        <h1 className="text-center text-[2rem] max-sm:text-[1rem]">PENDING</h1>
                        <button className="hover:text-red-900 m-auto" onClick={()=>{localStorage.setItem('to-do-list',JSON.stringify([]));setodo([])}}>Reset</button>
                        <button id="maximize" className="absolute top-[1rem] max-md:top-[0.25rem] right-[1rem] max-md:right-[0.25rem] p-[0.25rem]
                         rounded-sm hover:bg-[#c4b7b72f] flex align-center">
                            <i class="fa-solid fa-expand max-sm:text-[0.75rem]"></i>
                        </button>
                        {todo.map((item, index)=>(
                                <div key={"pending" + index} className={`${item.done && 'translate-x-full opacity-0 absolute'} flex items-center gap-2 p-[1rem] transition-all z-0`}>
                                    <button className={`border-2 overflow-hidden rounded-[50%] min-w-[2rem] max-md:min-w-[1rem] h-[2rem] max-md:h-[1rem] group`}
                                    onClick={()=>check(index)}>
                                        <div className={`${item.done ? 'scale-200' : 'scale-0'} group-hover:scale-50 transition-all duration-500 rounded-[50%] bg-white w-full h-full `}></div>
                                    </button>
                                    <input className="text-[2rem] outline-0 max-md:text-[1rem]" placeholder="Title" value={item.title} onChange={(e)=>change(e,index)}></input>
                                </div>  
                            )
                            
                        )}
                    </div>
                    
                    
                    <button id="add" className="flex justify-between items-center p-[0.5rem] absolute bottom-1 left-1/2 -translate-x-1/2"
                    onClick={addTodo} >
                        <i className="fa-solid fa-plus hover:rotate-90 transition-transform"></i>
                    </button>
                    
                </div>

                <div id="done" className=" w-[45%] h-full m-auto bg-[#1211112f] rounded-xl overflow-auto overflow-x-hidden z-10" >
                        <h1 className="text-center text-[2rem] max-sm:text-[1rem]">Done</h1>
                    {todo.map((item, index)=>(
                            <div key={"done" + index} className={`${!item.done && 'translate-x-full opacity-0 absolute'} flex items-center gap-2 p-[1rem] transition-all z-0`}>
                                <button className={`border-2 overflow-hidden rounded-[50%] min-w-[2rem] max-md:min-w-[1rem] h-[2rem] max-md:h-[1rem]`}
                                onClick={()=>check(index)}>
                                    <div className={`transition-all duration-500 rounded-[50%] bg-white w-full h-full scale-200`}></div>
                                </button>
                                <span className="text-[2rem] line-through max-md:text-[1rem]">{item.title}</span>
                            </div>  
                    ))}
                    
                </div>

                
            </div>
            
        </div>    
    )
}