import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import Button from "../components/Button";
import { useEffect } from "react";

const PersonalShelf = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { pathname, search } = location;
    const currentRoute = (pathname + search).split("/")[1];

    const [ personalBooks, setPersonalBooks ] = useState([]);

    useEffect(() => {
        const storedPersonalBooks = JSON.parse(localStorage.getItem("personalBookShelf"));
        if (storedPersonalBooks) {
            setPersonalBooks(storedPersonalBooks);
        }
    }, [])


    const handleRemovalFromBookShelf = (title) => {
        const updatedBooksList = personalBooks.filter((book) => book.title !== title);
        setPersonalBooks(updatedBooksList);
        localStorage.setItem("personalBookShelf", JSON.stringify(updatedBooksList));
        toast.success("Book Removed");
    }

    return (
        <div className="flex flex-col gap-5 items-center">
            <Toaster />
            <div className="flex mt-2 items-center justify-between w-[95%]">
                <h1 className="text-3xl font-bold">My Bookshelf</h1>
                <div className="">
                    <Button onClick={() => navigate("/")} title="Main page" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-[90%]">
                {
                    personalBooks.map((book, index) => {
                        return (
                            <PersonalBookCard key={index} title={book.title} edition={book.edition} onClick={() => handleRemovalFromBookShelf(book.title)} route={currentRoute} />
                        )
                    })
                }
            </div>
        </div>
    )
}

const PersonalBookCard = ({ title, edition, onClick, route }) => {
    return (
        <div className="flex flex-col items-center justify-between w-full gap-5 shadow-2xl rounded-lg p-2">
            <div className="w-full flex flex-col gap-2">
                <h1 className="text-xl font-bold">Book Title: <span className="font-medium">{title}</span></h1>
                <p className="text-xl font-bold">Edition Count: <span className="font-medium">{edition}</span></p>
            </div>
            <Button onClick={onClick} route={route} />
        </div>
    )
}

export default PersonalShelf;