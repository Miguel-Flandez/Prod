import { pop } from "@/assets";
import {Habit, Habitoday} from '@/components'

export default function HabitTracker({ showAddModal,  setShowAddModal, habits, setHabits,
     setEditIndex, setShowDeleteModal, setDeleteIndex}){

    // show daily, weekly, or both
    // const [dailyOrWeekly, setDailyOrWeekly] = useState(0)
    
    const todate = new Date()

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
                           return habit.schedule.find(e=>e===todate.toLocaleString('default',{weekday:'short'})) && (
                            <Habitoday
                            index={index}
                            popSound={popSound}
                            habit={habit}
                            todate={todate}
                            checkHabit={checkHabit}
                            />
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
            <div id='weekly' className={` transition-all w-[70%] max-lg:w-full h-full max-lg:h-[50%] bg-[#1211112f] p-[1rem] rounded-xl `}>
                <div id="weekly-header" className='text-[1rem] font-bold flex flex-col items-center max-md:text-transparent'>
                            <h1>{todate.toLocaleString("default", {month:"long"})}</h1>
                            <h1>{todate.toLocaleString("default", {year:"numeric"})}</h1>
                        </div>
                                                        
                        {/* for testing */}
                        <button id="reset" className='hover:bg-red-800' onClick={()=>{localStorage.setItem('habits', []);setHabits([])}}>reset</button>
                <div className="w-full h-[85%] overflow-auto">
                    <div className='flex flex-col gap-1  items-center max-md:text-[0.75rem]'>
                        
                        
                        {/* contains the habits and the checkboxes  */}
                        {habits.map((habit, index)=>(
                            <Habit
                            index={index}
                            habit={habit}
                            todate={todate}
                            checkHabit={checkHabit}
                            popSound={popSound}
                            setEditIndex={setEditIndex}
                            setShowAddModal={setShowAddModal}
                            setShowDeleteModal={setShowDeleteModal}
                            setDeleteIndex={setDeleteIndex}
                            habits={habits}
                            />
                        ))}
                    </div>              
                </div>
                
            </div>
        </div>

    )
}