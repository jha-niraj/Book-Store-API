const Button = ({ title, onClick, route, props }) => {
    title = route === "" ? title = "Add To My BookShelf" : route === "personalshelf" ? title = "Remove from Bookshelf" : title;

    return (
        <div className={`bg-gray-300 hover:text-white rounded-lg text-center w-full transition-all duration-200 ${route === "personalshelf" ? "hover:bg-red-500 hover:text-black" : "hover:bg-black"} ${props ? "hidden": "block"}`}>
            <button onClick={onClick} className="p-2 text-xl font-bold transition-all">{ title }</button>
        </div>   
    )
}

export default Button;