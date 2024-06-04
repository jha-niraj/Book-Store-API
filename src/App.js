import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";


//Importing necessary pages to render:
import Homepage from "./Pages/Homepage";
import PersonalShelf from "./Pages/PersonalShelf";

function App() {
	const [ fetchedData, setFetchedData] = useState([]);

	const updateSearchResults = (data) => {
		setFetchedData(data);
	};
	return (
		<Routes className="bg-red-500">
			<Route path="/" element={<Homepage fetchedData={fetchedData} updateSearchResults={updateSearchResults} />} />
			<Route path="/personalshelf" element={<PersonalShelf />} />
		</Routes>
	);
}

export default App;
