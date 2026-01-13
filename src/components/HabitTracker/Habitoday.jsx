export default function Habitoday({index, date, popSound, habit, todate, checkHabit}){

    

    return(
        <button key={index} className="flex justify-between items-center min-h-[5rem] text-[1.5rem] relative rounded-xl overflow-hidden px-[1rem]"
            onClick={()=>{checkHabit(index, date.getDate());popSound.play()}}>
            <span className="z-10">{habit.name}</span>
            {habit.daysCompleted.find(e=>e===todate.getDate()) && <i className="fa-solid fa-check z-10"></i>}
            {!habit.daysCompleted.find(e=>e===todate.getDate()) && <i className="fa-solid fa-x z-10"></i>}
            <div className={`${habit.daysCompleted.find(e=>e===date.getDate()) && 'w-full!'} z-0 absolute left-0 w-[2%] h-full bg-[#2C74B3] transition-all`}></div>
        </button>
    )
}