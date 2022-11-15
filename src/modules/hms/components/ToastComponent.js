export default function ToastComponent({description,type}){
    return (
        <div className={`font-ny ${type==='success' ? 'bg-green-600' : type==='warning' ? 'bg-orange-600' : type==='error' ? 'bg-red-600' : ''} text-white max-w-[300px] p-5 rounded`}>
            <span>
                {description}
            </span>
        </div>
    )
}