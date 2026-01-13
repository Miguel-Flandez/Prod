import React from "react"
import { useMemo } from "react"

export default function Habit({index, habit, todate, checkHabit, popSound, setEditIndex, setShowAddModal, setShowDeleteModal, setDeleteIndex, habits}){

    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const today = new Date().getDay();

    // days sorted with current day at the rightmost
    const sortedDays = useMemo(()=>{
        return [...days.slice(today+1), ...days.slice(0, today+1)]
    },[])

    // the last seven days that match the days
        const lastSevenDates = useMemo(()=>{
        let arr = []
        for(let i = 6; i>=0; i--){
            const date = new Date()
            date.setDate(todate.getDate()-i)
            arr.push(String(date.getDate()).padStart(2, '0'))
        }
        return arr
    
        }, [])

    return(
        <div key={index} className="flex flex-col w-full px-[1rem] py-[0.5rem] bg-[#205295] rounded-xl">
                                
            <div id="habit-header" className="flex justify-between items-center w-full">
                <span id="habit" className="text-[1.5rem]">{habit.name}</span>

                <div>
                    <span>Done:</span>
                    <span>{habit.done}</span>
                </div>

                

            </div>

            <div className="flex gap-1 bg-[#1211112f] w-max p-1 rounded-sm">
                {/* {habit.schedule.length>0 && sched!==habit.schedule[habit.schedule.length-1] ? ', ':''} */}
                <span>Every </span>
                {habit.schedule.length!==7 ? days.map((sched)=>(
                    habit.schedule.includes(sched) && (<span>{sched===habit.schedule[habit.schedule.length-1] && 'and ' }{sched}{sched!==habit.schedule[habit.schedule.length-1] ? ', ':''}</span>)
                )):<span>day</span>}
            </div>
                
            <div id="habit-content" className="flex justify-between">
                <div className="grid grid-cols-[repeat(7,1fr)] gap-[1vw] max-md:gap-1 items-center max-md:text-[0.75rem]
                w-full">
                    
                    {sortedDays.map((weekday,i)=>(
                        <div id="date-header" className='flex flex-col' key={weekday}>
                            <span>{weekday}</span>
                            <span>{lastSevenDates[i]}</span>
                        </div>
                            
                    ))}
            

                    {sortedDays.map((day, id)=>{
                        const date = new Date()
                        date.setDate(todate.getDate() - (6-id))
                        const isItDone = habit.daysCompleted.some(e=>e===date.getDate())
                    // checkboxes
                    return(
                        <React.Fragment key={id}>
                            {habit.schedule?.find(n=>n===day) && <button className={` border-2 overflow-hidden rounded-xl w-[2rem] max-md:w-[1rem] h-[2rem] max-md:h-[1rem]`}
                            onClick={()=>{checkHabit(index, date.getDate(), isItDone);popSound.play();console.log(habit.daysCompleted.some(e=>e===date.getDate()))}}>
                                <div className={`${isItDone && 'scale-200'} transition-all duration-500 rounded-[50%] bg-white w-full h-full scale-0`}></div>
                            </button>}
                            {!habit.schedule?.find(n=>n===day) && <div></div>}
                        </React.Fragment>
                    )})} 

                </div>
                {/* deleted and edit icons */}
                <div id="icons" className='flex flex-col justify-center items-center gap-2'>
                    <i className="fa-solid fa-pen-to-square hover:text-[#2C74B3]" onClick={()=>{setEditIndex(index);setShowAddModal(true);console.log(index);console.log(habits)}}></i>
                    <i className="fa-solid fa-trash hover:text-[#2C74B3] " onClick={()=>{setShowDeleteModal(true);setDeleteIndex(index)}}></i>
                </div> 
            </div>
            
            
            
            
            
                                    
        </div>
    )
}