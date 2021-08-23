import React, { useState, useEffect, useCallback} from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  const fetchSingleCocktail = useCallback( async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      // console.log(data);
      const { drinks } = data;
      // console.log(drinks);
      if (drinks) {
        const {
          strDrink: name,
          strCategory: category,
          strAlcoholic: info,
          strGlass: glass,
          strDrinkThumb: image,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = drinks[0];

        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ];

        const newCockTail = {
          name,
          image,
          category,
          info,
          glass,
          instructions,
          ingredients,
        };

        setCocktail(newCockTail);
        console.log(newCockTail);
      } else {
        console.log("nil");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  },[id]);
  useEffect(() => {
    fetchSingleCocktail();
  }, [id,fetchSingleCocktail]);
  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  }
  const { name, image, info, instructions, category, glass, ingredients } =
    cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />

        <div className="drink-info">
          <p>
            <span className="drink-data">name : </span>
            {name}
          </p>
          <p>
            <span className="drink-data">category : </span>
            {category}
          </p>
          <p>
            <span className="drink-data">info : </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass : </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions : </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data"> ingredients: </span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}> {item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
