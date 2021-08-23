import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktail, SetCocktail] = useState([]);
  const fetchCocktails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;

      if (drinks) {
        const newCockTail = drinks.map((item) => {
          const { idDrink, strDrink, strAlcoholic, strGlass, strDrinkThumb } =
            item;
          return {
            id: idDrink,
            image: strDrinkThumb,
            name: strDrink,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        SetCocktail(newCockTail);
      } else {
        SetCocktail([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchCocktails();
  }, [searchTerm, fetchCocktails]);
  return (
    <AppContext.Provider
      value={{ loading, searchTerm, setSearchTerm, cocktail }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
