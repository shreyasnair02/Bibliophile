import React from "react";
import PageWrapper from "../utils/PageWrapper";

function BookPage() {
  return (
    <PageWrapper classes="">
      <div>BookPage</div>
    </PageWrapper>
  );
}

export default BookPage;
function BookComponent({ cart, setCart, book, showBook, setShowBook, bookID }) {
  const [item, setItem] = useState(() => {
    return booksJson.filter((item) => bookID.current === item.id)[0];
  });
  const [trnct, setTrnct] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: "0" }}
      exit={{ opacity: 0, y: "-20px" }}
      className="bookshelf__book-page"
    >
      {item ? (
        <div className="bookshelf__book-page-container">
          <div className="bookshelf__book-page-bookDisplay">
            <div className="bookDisplay__image-container">
              <img src={item.url} alt="" />
            </div>
            <div>
              <button className="bookDisplay__CTA">
                <IconShoppingCartPlus
                  size={24}
                  stroke={2}
                  color="currentColor"
                />
                Add to cart
              </button>
            </div>
          </div>
          <div className="bookshelf__book-page-detailsDisplay">
            <h1 className="detailsDisplay-title">{item.title}</h1>
            <h4 className="detailsDisplay-authorName">{item.author}</h4>
            <div className="detailsDisplay-rating">
              <span className="stars">
                <Rating
                  emptyStyle={{ display: "flex" }}
                  fillStyle={{ display: "-webkit-inline-box" }}
                  readonly={true}
                  initialValue={item.rating}
                  allowFraction={true}
                  size={35}
                  SVGstrokeColor="#4d3505"
                  emptyColor="#f2e7d9"
                  SVGstorkeWidth={1}
                  fillColor="#4d3619"
                />
              </span>
              <span>{item.rating}</span>
            </div>
            <h4>₹{item.price}</h4>

            <p className={trnct ? "truncate" : ""}>{item.summary}</p>
            {trnct ? (
              <span onClick={() => setTrnct((prev) => !prev)} key={item.id}>
                ...
              </span>
            ) : (
              ""
            )}

            <div>
              <span>Genres:</span>
              {item.genre.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>
            <div className="detailsDisplay-recommendSection">
              <h3>Readers would Recommend</h3>
              <div className="detailsDisplay-recommended-books">
                {item.related.map((b) => (
                  <Book
                    book={booksJson.find((book) => book.id === b)}
                    key={b}
                    cart={cart}
                    setCart={setCart}
                  />
                ))}
                {/* <Book
									book={book}
									unikey={uuid4()}
									cart={cart}
									setCart={setCart}
									showBook={showBook}
									setShowBook={setShowBook}
									bookID={bookID}
								></Book> */}
                <img src={item.imageURL} alt="" />
              </div>
            </div>
            <div className="detailsDisplay-reviewsSection">
              <h3>Ratings and Reviews</h3>
              <div className="detailsDisplay-reviews">
                {comments.map((review) => (
                  <div className="review" key={review._id}>
                    <div className="review-displaySection">
                      <img src={review.avatar_link} alt="" />
                      <h5>{review.name}</h5>
                    </div>
                    <div className="review-detailsSection">
                      <div>
                        <span>
                          <Rating
                            emptyStyle={{ display: "flex" }}
                            fillStyle={{ display: "-webkit-inline-box" }}
                            readonly={true}
                            initialValue={review.rating}
                            allowFraction={true}
                            size={22}
                            SVGstrokeColor="#4d3505"
                            emptyColor="#f2e7d9"
                            SVGstorkeWidth={1}
                            fillColor="#4d3619"
                          />
                          {/* {review.rating} */}
                        </span>
                      </div>
                      <div>
                        <span className="truncate">{review.comment}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </motion.div>
  );
}
