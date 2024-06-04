import { useState } from "react";
import Button from "./Button";

const Card = ({ title, edition, onClick, route }) => {
    const storedPersonalBooks = JSON.parse(localStorage.getItem("personalBookShelf"));
    const bookExists = storedPersonalBooks.find((book) => book.title === title);

    return (
        <div className="flex flex-col items-center justify-between w-full gap-5 shadow-2xl rounded-lg p-2">
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