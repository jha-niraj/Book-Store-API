import { useState } from "react";
import Button from "./Button";

const Card = ({ title, edition, onClick, route }) => {
    const storedPersonalBooks = JSON.parse(localStorage.getItem("personalBookShelf"));
    let bookExists = false;
    if(storedPersonalBooks) {
        bookExists = storedPersonalBooks.find((book) => book.title === title);
    }

    return (
        <div className={`flex flex-col items-center justify-between w-full gap-5 shadow-2xl rounded-lg p-2 ${bookExists ? "bg-green-800 text-white" : ""}`}>
            <div className="w-full flex flex-col gap-2">
                <h1 className="text-xl font-bold">Book Title: <span className="font-medium">{title}</span></h1>
                <p className="text-xl font-bold">Edition Count: <span className="font-medium">{edition}</span></p>
            </div>
            { !bookExists &&
                <Button onClick={onClick} route={route} />
            }
        </div>
    )
}

export default Card;