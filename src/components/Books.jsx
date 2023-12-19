import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/Logo.png";

function Books() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function getBooks() {
            try {
                const response = await fetch("https://reactnd-books-api.udacity.com/books",
                {
                    headers: { 'Authorization': 'whatever-you-want' }
                }
                );
                const data = await response.json();
                setBooks(data.books);
            } catch (error) {
                console.log(error);
            }
        }
        getBooks();
    }, []);

    const filteredBooks = books.filter((book) => {
        if(search === "") {
            return true;
        }
        const title = book.title.toLowerCase();
        return title.includes(search.toLocaleLowerCase());
        
    });
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            setSearch(e.target.value);
        }
    }
    return (
        <div>
            <div className="flex justify-between position sticky top-0 items-center px-5 py-5 max-w-screen bg-gray-100 shadow-md ">
                <img className="w-70" src={Logo} alt="Logo" />
                <div className="flex items-center shadow-lg">
                    <input className="w-full md:w-96 h-10 bg-white pl-4 outline-none rounded-l" type="text" placeholder="Search books" onKeyPress={handleSearch} />
                    <div className="w-20 h-10 rounded-r bg-gray-300 hover:bg-gray-400 flex items-center justify-center">
                        <SearchIcon />
                    </div>
                </div>
                <NavLink to="/register">
                    <button className="px-5 py-2 bg-blue-700 rounded text-white font-bold">Register</button>
                </NavLink>
            </div>
            
            <div className="flex justify-center  flex-wrap gap-20 mb-10 mt-6">
                {filteredBooks.map((book) => (
                <div key={book.id} className="bg-white cursor-pointer rounded-md  shadow-2xl hover:shadow-xl text-center  px-5 py-5 w-60 h-45 hover:bg-gray-200">
                    <div className="h-40 flex justify-center items-center mb-4">
                        <img src={book.imageLinks.thumbnail} alt={book.title} className=" mt-20 h-60 w-40 rounded-md" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-lg font-medium text-gray-800 mt-20 mb-2">{book.title}</p>
                        <p className="text-sm text-gray-500">{book.authors.join(", ")}</p>
                        <p className="text-sm mt-4 text-gray-400" >⭐ {book.averageRating || "-.-"}</p>

                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}
export default Books