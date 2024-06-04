import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";


//Importing necessary pages to render:
import Homepage from "./Pages/Homepage";
import PersonalShelf from "./Pages/PersonalShelf";

function App() {
	return (
		<Routes className="bg-red-500">
			<Route path="/" element={<Homepage />} />
			<Route path="/personalshelf" element={<PersonalShelf />} />
		</Routes>
	);
}

export default App;
