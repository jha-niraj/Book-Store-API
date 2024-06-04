
const InputBox = ({ label, name, type, placeholder, id, onChange }) => {
    return (
        <div className="p-2 flex flex-col items-start justify-center gap-2 w-full">
            <label className='text-md font-semibold'>{label}</label>
            <input 
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                className="h-10 w-full bg-gray-200 rounded-lg text-mini font-semibold focus:border-collapse pl-3 animation-all"
            />
        </div>
    )
}

export default InputBox;