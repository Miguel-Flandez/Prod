import { useEffect, useState } from 'react'
import {Header, AddHabitModal, DeleteModal , HabitTracker} from '@/components'


export default function Habits(){

    // state for showing and hiding modals
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [editIndex, setEditIndex] = useState(null)

    // state for confirming delete and index of the item to be deleted
    const [deleteIndex, setDeleteIndex] = useState(null)
    const [habits, setHabits] = useState([])

    


    // inputs the habit name and schedule
    function handleHabitInput(value1, value2){
        console.log(value2)
        const newEntry = (function(){
            if(editIndex!==null){
                return habits.map((obj, i)=>{
                if(editIndex===i){
                    return {...obj, name:value1, schedule:value2}
                }else{
                    return {...obj}
                }
                })
            }else{
                return [...habits,{
                name: value1,
                schedule: value2,
                done: 0,
                daysCompleted:[]
                }]
            }
            
            
        })()

        setHabits(newEntry);
        localStorage.setItem('habits', JSON.stringify(newEntry))
            
        console.log(habits)
    }

    // deletes the selected habit
    function handleDelete(value){

        const deletedValue = (() => habits.filter((_,i)=>i!==deleteIndex))()
        if(value){
            setHabits(deletedValue)
            localStorage.setItem('habits', JSON.stringify(deletedValue))
            setDeleteIndex(null)
            setShowDeleteModal(false)
            return
        }else{
            setDeleteIndex(null)
            setShowDeleteModal(false)
            return
        }

    }

    // sets the body's color 
    useEffect(() => {
        document.body.style.backgroundColor = '#205295'
        const stored = localStorage.getItem('habits')

        stored && setHabits(JSON.parse(stored))


    }, [])
    

    return(

        <div className='h-screen w-screen'>

            <Header/>

            <div className={`${!showAddModal && '-translate-x-[100vw] opacity-0'} fixed w-full top-0 left-0 transition-all duration-500 z-50`}>
                <AddHabitModal setShowAddModal={setShowAddModal} habitHandler={handleHabitInput} 
                editValues={habits[editIndex]} resetHandler={arg=> arg ? setEditIndex(null) : null}/>    
            </div>
            
        
            <HabitTracker showAddModal={showAddModal} setShowAddModal={setShowAddModal} habits={habits} 
            setHabits={setHabits} setEditIndex={setEditIndex} setShowDeleteModal={setShowDeleteModal} 
            setDeleteIndex={setDeleteIndex}/>

            {showDeleteModal && <DeleteModal deleteHandler={handleDelete}/>}
        </div>
        
    )
}