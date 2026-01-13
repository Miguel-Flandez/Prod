import { Header } from "@/components"
import { useEffect, useState } from "react"

export default function Todolist(){

    const [todo, setodo] = useState([])

    function addTodo(){
        const newEntry = [...todo,{title:'', done:false}]
        setodo(newEntry)
        localStorage.setItem('to-do-list', JSON.stringify(newEntry))
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



    useEffect(()=>{
        document.body.style.backgroundColor = '#9290C3'

        const list = localStorage.getItem('to-do-list')
        list && setodo(JSON.parse(list))

    },[])

    return(
        <div className="w-screen h-screen">
            <Header/>
            <div className="flex justify-between w-full h-[80%]">
                <div id="pending" className=" w-[45%] h-full m-auto bg-[#1211112f] rounded-xl relative" >
                    <h1 className="text-center text-[2rem]">Pending</h1>
                    {todo.map((item, index)=>(
                        <div key={index} className="flex items-center gap-2 p-[1rem] bg-">
                            <button className={`border-2 overflow-hidden rounded-xl w-[2rem] max-md:w-[1rem] h-[2rem] max-md:h-[1rem]`}>
                                <div className={`${item.done ? 'scale-200' : 'scale-0'} transition-all duration-500 rounded-[50%] bg-white w-full h-full `}></div>
                            </button>
                            <input className="text-[2rem] outline-0" value={item.title} onChange={(e)=>change(e,index)}></input>
                        </div>  
                    ))}
                    
                    <button id="add" className="flex justify-between items-center p-[0.5rem] absolute bottom-1 left-1/2 -translate-x-1/2"
                    onClick={addTodo} >
                        <i className="fa-solid fa-plus hover:rotate-90 transition-transform"></i>
                    </button>
                    <button className="hover:text-red-900" onClick={()=>localStorage.setItem('to-do-list',JSON.stringify([]))}>Reset</button>
                </div>

                <div id="done" className=" w-[45%] h-full m-auto bg-[#1211112f] rounded-xl line-through" >
                        <h1 className="text-center text-[2rem]">Done</h1>
                    <div className="flex items-center gap-2 p-[1rem] bg-">
                        <button className={`border-2 overflow-hidden rounded-xl w-[2rem] max-md:w-[1rem] h-[2rem] max-md:h-[1rem]`}>
                            <div className={`transition-all duration-500 rounded-[50%] bg-white w-full h-full scale-200`}></div>
                        </button>
                        <span className="text-[2rem]">Habit</span>
                    </div>  
                </div>

                
            </div>
            
        </div>    
    )
}