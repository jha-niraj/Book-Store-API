import { useEffect, useState, CSSProperties } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

import InputBox from "../components/InputBox";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import useBookAPI from "../API/BookApi";

import "../index.css";
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Homepage = () => {
    const navigate = useNavigate();
    const [ searchQuery, setSearchQuery] = useState("");
    const [ debouncedQuery, setDebouncedQuery ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    const [ searchResults, setSearchResults ] = useState([]);
    const [ bookShelf, setBookShelf ] = useState([]);
    const [ personalBookShelf, setPersonalBookShelf ] = useState([]);

    const location = useLocation();
    const { pathname, search } = location;
    const currentRoute = (pathname + search).split("/")[1];

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500)
        return () => clearTimeout(timerId);
    }, [searchQuery])

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIsLoading(true);
                if(debouncedQuery) {
                    const results = await axios.get(`https://openlibrary.org/search.json?q=${debouncedQuery}&limit=10&page=1`);
                    setBookShelf(results.data.docs);
                }
            } catch(err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBooks(debouncedQuery);
    }, [debouncedQuery])

    useEffect(() => {
        const storedPersonalBooks = localStorage.getItem("personalBookShelf");
        if(storedPersonalBooks) {
            setPersonalBookShelf(JSON.parse(storedPersonalBooks));
        }
        }, [])

    const navigateToBookshelf = () => {
        navigate("/personalshelf");
    }
    const handleAdditionToPersonalShelf = (index, title, edition) => {
        const storedPersonalBooks = JSON.parse(localStorage.getItem("personalBookShelf"));
        let bookExists = false;
        if(storedPersonalBooks) {
            bookExists = storedPersonalBooks.find((book) => book.title === title);
        }
        
        if(!bookExists) {
            const newBooks = [ ...personalBookShelf, { index, title, edition }];
            localStorage.setItem("personalBookShelf", JSON.stringify(newBooks));
            setPersonalBookShelf(newBooks);
        } else {
            alert("Book with this credential is already added!!!");
        }
    }

    return (
        <section className="flex flex-col items-center justify-center w-full p-1 mt-3">
            <Navbar onClick={navigateToBookshelf} currentRoute={currentRoute} />
            <div className="w-[90%] flex">
                <InputBox label="Search by Book Name" type="text" id="searchBook" placeholder="Type your favourite book name" onChange={(e) => setSearchQuery(e.target.value)}  />
            </div>
            {   isLoading ? 
                <div className="h-96 flex items-center justify-center">
                    <ScaleLoader
                        color="#0d1413"
                        loading={isLoading}
                        cssOverride={override}
                        size={150}
                        height={70}
                        width={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div> :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-[90%]">
                    {
                        bookShelf.map((book, index) => {
                            return (
                                <Card key={index} title={book.title} edition={book.edition_count} onClick={()=> handleAdditionToPersonalShelf(index, book.title, book.edition_count)} route={currentRoute} personalBookShelf={personalBookShelf} />
                            )
                        })
                    }
                </div>
            }
        </section>
    )
}



export default Homepage;