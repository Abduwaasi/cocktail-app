import React, { useRef } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = useRef("");
   React.useEffect(() => {
    searchValue.current.focus()
  }, [])
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };
  const handleSubmit =(e)=>{
    e.preventDefault();
  }
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Search for favorite cocktail</label>
          <input
            type="text"
            id="name"
            onChange={searchCocktail}
            ref={searchValue}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
