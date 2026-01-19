import { useEffect } from "react"


export default function Warning({prompt, setPrompt}){

    useEffect(()=>{

        if(!prompt) return

        const timeout = setTimeout(() => {
            setPrompt(false)
        }, 3000);

        return ()=> clearTimeout(timeout)
        
    },[prompt])

    return(
        <div className={`${prompt ? '' : '-translate-y-full'} p-[2rem] absolute top-0 left-1/2 -translate-x-1/2 transition-transform
        border-xl bg-red-600 z-50`}>
            <h1 className="text-[1rem]">Please name the Habit</h1>
        </div>
    )
}