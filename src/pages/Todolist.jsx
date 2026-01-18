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

    },[])

    return(
        <div className="w-screen h-screen">
            <Header/>
            <Warning prompt={prompt} setPrompt={setPrompt}/>
            <div className="flex justify-between w-full h-[80%]">
                <div id="pending" className=" w-[45%] h-full m-auto bg-[#1211112f] rounded-xl relative overflow-auto" >
                    <h1 className="text-center text-[2rem]">Pending</h1>
                    <button className="hover:text-red-900 m-auto" onClick={()=>{localStorage.setItem('to-do-list',JSON.stringify([]));setodo([])}}>Reset</button>
                    <button id="maximize" className="absolute top-[1rem] right-[1rem] p-[0.25rem] rounded-sm hover:bg-[#c4b7b72f] flex align-center">
                        <i class="fa-solid fa-expand"></i>
                    </button>
                    {todo.map((item, index)=>{

                        return !item.done && (
                            <div key={"pending" + index} className={`${item.done && 'translate-x-full'} flex items-center gap-2 p-[1rem] transition-transform`}>
                                <button className={`border-2 overflow-hidden rounded-[50%] w-[2rem] max-md:w-[1rem] h-[2rem] max-md:h-[1rem]`}
                                onClick={()=>check(index)}>
                                    <div className={`${item.done ? 'scale-200' : 'scale-0'} transition-all duration-500 rounded-[50%] bg-white w-full h-full `}></div>
                                </button>
                                <input className="text-[2rem] outline-0" placeholder="Title" value={item.title} onChange={(e)=>change(e,index)}></input>
                            </div>  
                        )
                        
                    })}
                    
                    <button id="add" className="flex justify-between items-center p-[0.5rem] absolute bottom-1 left-1/2 -translate-x-1/2"
                    onClick={addTodo} >
                        <i className="fa-solid fa-plus hover:rotate-90 transition-transform"></i>
                    </button>
                    
                </div>

                <div id="done" className=" w-[45%] h-full m-auto bg-[#1211112f] rounded-xl overflow-auto" >
                        <h1 className="text-center text-[2rem]">Done</h1>
                    {todo.map((item, index)=>{

                        return Boolean(item.done) && (
                            <div key={"done" + index} className="flex items-center gap-2 p-[1rem] bg-">
                                <button className={`border-2 overflow-hidden rounded-[50%] w-[2rem] max-md:w-[1rem] h-[2rem] max-md:h-[1rem]`}
                                onClick={()=>check(index)}>
                                    <div className={`transition-all duration-500 rounded-[50%] bg-white w-full h-full scale-200`}></div>
                                </button>
                                <span className="text-[2rem] line-through">{item.title}</span>
                            </div>  
                    )})}
                    
                </div>

                
            </div>
            
        </div>    
    )
}