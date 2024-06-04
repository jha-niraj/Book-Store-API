import Button from "./Button";

const Navbar = ({ onClick }) => {
    return (
        <section className="w-[95%] sm:w-[90%] flex items-center navbar justify-between">
            <div className="">
                <h1 className="text-3xl font-bold">Book Search</h1>
            </div>
            <div className="flex items-center justify-center bg-gray-300 hover:bg-black hover:text-white rounded-lg">
                <Button onClick={onClick} title="My Bookshelf" />
            </div>
        </section>
    )
}

export default Navbar;