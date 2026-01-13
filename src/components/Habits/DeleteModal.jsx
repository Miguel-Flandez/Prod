
export default function DeleteModal({deleteHandler}){

    
    return(
        <div className={`fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.3)] cursor-default`}>
            <div className={`bg-[#2C74B3] flex flex-col gap-[12vw] justify-around absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                py-[1rem] px-[1.25rem] rounded-md`}>
                <span className="font-bold text-[1rem] m-auto">Are you sure you want to delete this habit?</span>
                <div id="choice" className="flex justify-around">
                    <span className="bg-red-800 hover:bg-red-700 rounded-md px-[1rem] py-[0.25rem]" onClick={()=>{deleteHandler(true)}}>Delete</span>
                    <span className="bg-[#1211112f] hover:bg-[#0000005f] rounded-md px-[1rem] py-[0.25rem]" onClick={()=>{deleteHandler(false)}}>Cancel</span>
                </div>
            </div>
        </div>
    )
}