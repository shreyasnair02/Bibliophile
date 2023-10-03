import React from "react";
import PageWrapper from "../utils/PageWrapper";
import { useState } from "react";
import Card from "../components/Card";
import Filter from "../components/Sidebar/Filter";
import { useGetBooks } from "../hooks/apiQueries";
import { useQueryClient } from "@tanstack/react-query";

export const genres = [
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
  { genre: "Others", checked: false },
];

function Bookshelf() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(genres);
  const [sort, setSort] = useState("createdAt");
  const filterSelected = () =>
    selected
      .filter((genre) => genre.checked === true)
      .map((genre) => genre.genre);
  const books = useGetBooks({
    selectedGenres: filterSelected(),
    sort,
  });
  const handleChange = (e) => {
    if (e.target.checked) {
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
    queryClient.invalidateQueries("books");
  };
  const handleReset = () => {
    setSelected(genres);
    queryClient.invalidateQueries("books");
  };
  const handleSort = (e) => {
    setSort(e.target.dataset.sort);
    queryClient.invalidateQueries("books");
  };
  return (
    <PageWrapper classes="">
      <section className="">
        <Filter
          handleChange={handleChange}
          handleReset={handleReset}
          selected={selected}
          handleSort={handleSort}
        >
          <div className="grid m-5  2xl:grid-cols-9 xl:grid-cols-6 lg:grid-cols-5  md:grid-cols-4 grid-cols-3  gap-[clamp(0.5rem,4vw_-_1rem,1rem)] px-6 py-6  overflow-hidden">
            {books?.data?.map((book, i) => (
              <Card
                book={book}
                key={book._id}
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
