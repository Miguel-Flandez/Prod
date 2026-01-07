
import React from "react";
import { useMemo} from "react";
import { pop } from "@/assets";

export default function HabitTracker({ showAddModal,  setShowAddModal, habits, setHabits,
     setEditIndex, setShowDeleteModal, setDeleteIndex}){

    // show daily, weekly, or both
    // const [dailyOrWeekly, setDailyOrWeekly] = useState(0)

    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const today = new Date().getDay();
    const todate = new Date()

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
    
    const popSound = new Audio(pop)


    // handles checkbox saving
    function checkHabit(habitIndex, date, doneCount){
        const updatedEntry = (function(){
            return habits.map((habit, index)=>{

                return habitIndex===index ?{
                ...habit, 
                done: !doneCount ? habit.done+1 : habit.done-1,
                    
                daysCompleted: habit.daysCompleted.find(i=>i===date) ? habit.daysCompleted.filter(i=>i!==date) : [...habit.daysCompleted, date]
                } : habit
            })
            
        })()
        
        
        setHabits(updatedEntry)
        localStorage.setItem('habits', JSON.stringify(updatedEntry))
    }
    

    return(

        <div className="flex max-lg:flex-col gap-[1vw] h-[80%] justify-center m-auto">

            {/* left container (top on mobile) */}
            {/* ${dailyOrWeekly===1 ? 'max-md:h-full' : dailyOrWeekly===2 ? 'max-md:hidden' : ''} */}
            <div id="daily" className={` transition-all flex flex-col gap-[1vw] w-[25%] max-lg:w-full h-full max-lg:h-[50%]  bg bg-[#1211112f] rounded-xl p-[1rem]`}>
                <div id="daily-header" className=" text-[1rem] font-bold flex flex-col max-lg:flex-row max-lg:justify-center max-lg:gap-2  items-center">
                
                    <h1>{todate.toLocaleString('default',{month:'short'})} {todate.toLocaleString('default',{day:'numeric'})}</h1>
                    <h1>{todate.toLocaleString('default', {weekday:'long'})}</h1>
                    
                </div>

                {/* todays habits only */}
                <div className="flex flex-col h-full gap-[1vw] overflow-auto">
                    {habits.map((habit,index)=>{
                        const date = new Date()
                        date.setDate(todate.getDate())

                           return habit.schedule.find(e=>e===todate.toLocaleString('default',{weekday:'short'})) && (
                            
                            <button key={index} className="flex justify-between items-center min-h-[5rem] text-[1.5rem] relative rounded-xl overflow-hidden px-[1rem]"
                                onClick={()=>{checkHabit(index, date.getDate());popSound.play()}}>
                                <span className="z-10">{habit.name}</span>
                                {habit.daysCompleted.find(e=>e===todate.getDate()) && <i className="fa-solid fa-check z-10"></i>}
                                {!habit.daysCompleted.find(e=>e===todate.getDate()) && <i className="fa-solid fa-x z-10"></i>}
                                <div className={`${habit.daysCompleted.find(e=>e===date.getDate()) && 'w-full!'} z-0 absolute left-0 w-[2%] h-full bg-[#2C74B3] transition-all`}></div>
                            </button>
                            )
                        }
                    )}

                </div>

                <button className={`${showAddModal && 'hidden'} flex gap-[1rem] items-center justify-center cursor-default w-[8 rem] m-auto hover:bg-[#1211112f] hover:rounded-md py-[0.5rem] px-[1rem]`}
                        onClick={()=>setShowAddModal(true)}>
                        <i className="fa-solid fa-plus"></i>
                        <span className='whitespace-nowrap max-md:hidden'>Add Habit</span>
                </button>
                
            </div>
        
            {/* right container (bottom on mobile) */}
            {/* ${dailyOrWeekly===2 ? 'max-md:h-full' : dailyOrWeekly===1 ? 'max-md:hidden' : ''} */}
            <div id='weekly' className={` transition-all w-[70%] max-lg:w-full h-full max-lg:h-[50%] bg-[#1211112f] p-[1rem] rounded-xl overflow-auto max-lg:overflow-x-hidden`}>
                <div className='flex flex-col gap-1  items-center max-md:text-[0.75rem]'>
                    
                    <div id="weekly-header" className='text-[1rem] font-bold flex flex-col items-center max-md:text-transparent'>
                        <h1>{todate.toLocaleString("default", {month:"long"})}</h1>
                        <h1>{todate.toLocaleString("default", {year:"numeric"})}</h1>
                    </div>
                                                    
                    {/* buttons for adding habit and resetting the list */}
                        
                    {/* for testing */}
                    <button id="reset" className='hover:bg-red-800' onClick={()=>{localStorage.setItem('habits', []);setHabits([])}}>reset</button>
                        
                    
                    {/* contains the habits and the checkboxes  */}
                    {habits.map((habit, index)=>(
                        
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
                    ))}
                    
                    
                    

                    
                </div>
            
                    
            </div>
            {/* buttons for switching views on mobile */}
            {/* <div id="switch-view" className={`md:hidden flex gap-[5vw] absolute bottom-1 left-1/2 -translate-x-1/2 transition-all`}>
                <button className="bg-[#2C74B3] py-[0.2rem] px-[0.5rem] rounded-md whitespace-nowrap active:bg-[#1211112f]" onClick={()=>setDailyOrWeekly(0)}>All</button>
                <button className="bg-[#2C74B3] py-[0.2rem] px-[0.5rem] rounded-md whitespace-nowrap active:bg-[#1211112f]" onClick={()=>setDailyOrWeekly(1)}>Daily</button>
                <button className="bg-[#2C74B3] py-[0.2rem] px-[0.5rem] rounded-md whitespace-nowrap active:bg-[#1211112f]" onClick={()=>setDailyOrWeekly(2)}>Weekly</button>
            </div> */}

        </div>

    )
}