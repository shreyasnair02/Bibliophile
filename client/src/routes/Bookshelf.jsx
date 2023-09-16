import React from "react";
import PageWrapper from "../utils/PageWrapper";
import NavSidebar from "../components/Sidebar/NavSidebar";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";
import Filter from "../components/Sidebar/Filter";

const genres = [
  { genre: "Adventure", checked: false },
  { genre: "Business", checked: false },
  { genre: "Drama", checked: false },
  { genre: "Dystopian", checked: false },
  { genre: "Fantasy", checked: false },
  { genre: "Historical Fiction", checked: false },
  { genre: "Mystery", checked: false },
  { genre: "Relationship", checked: false },
  { genre: "Romance", checked: false },
  { genre: "Science Fiction", checked: false },
  { genre: "Self Help", checked: false },
  { genre: "Thriller", checked: false },
];

function Bookshelf() {
  const [data, setData] = useState();
  const [selected, setSelected] = useState(genres);
  useEffect(() => {
    const getData = async () => {
      const required = selected
        .filter((genre) => genre.checked === true)
        .map((genre) => genre.genre);
      console.log({ required });
      const URL = `http://localhost:3000/books?genre=${encodeURIComponent(
        required.join(",")
      )}`;
      const result = await fetch(URL);
      const data = await result.json();

      console.log(URL);
      setData(data);
    };
    getData();
  }, [selected]);
  const handleChange = (e) => {
    if (e.target.checked) {
      // setSelected(prev=> prev.map((selected)=>[ ...selected, checked:selected.genre===e.target.dataset.genre?true:selected.checked ]) )
      setSelected((prev) =>
        prev.map((selected) => {
          if (selected.genre.toLowerCase() === e.target.dataset.genre) {
            return { ...selected, checked: true };
          }
          return selected;
        })
      );
    } else {
      setSelected((prev) =>
        prev.map((selected) => {
          if (selected.genre.toLowerCase() === e.target.dataset.genre) {
            return { ...selected, checked: false };
          }
          return selected;
        })
      );
    }
  };
  const handleReset = () => {
    setSelected(genres);
  };
  return (
    <PageWrapper classes="">
      <section className="max-h-[90vh] ">
        <Filter
          handleChange={handleChange}
          handleReset={handleReset}
          selected={selected}
        >
          <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-[clamp(0.5rem,4vw_-_1rem,1rem)] px-6 py-6 max-h-[90vh] min-h-[90vh] overflow-y-auto overflow-x-hidden">
            {data?.map((book, i) => (
              <Card
                book={book}
                key={book._id}
                // cart={cart}
                // setCart={setCart}
                index={i + 1}
                bookID={book._id}
              />
            ))}
          </div>
        </Filter>
      </section>
    </PageWrapper>
  );
}

export default Bookshelf;
