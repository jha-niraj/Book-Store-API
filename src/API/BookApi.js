import axios from "axios";

const useBookAPI = async (bookName) => {
    try {
        const response = await axios.get(
            `https://openlibrary.org/search.json?q=${bookName}&limit=10&page=1`,
        );
        return response.data.docs;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export default useBookAPI;
