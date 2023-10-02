import React from "react";
import PageWrapper from "../utils/PageWrapper";
import { useGetBook } from "../hooks/apiQueries";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Card from "../components/Card";
import { TbShoppingCartPlus } from "react-icons/tb";
import { BiCartAlt, BiCartDownload, BiCheck } from "react-icons/bi";
function BookPage() {
  const { bookId } = useParams();
  const book = useGetBook([bookId]);
  const [trnct, setTrnct] = useState(true);
  if (book.isLoading) return <div>Loading...</div>;
  return (
    <PageWrapper classes={" min-h-[90vh] "}>
      <div className="flex flex-col lg:flex-row">
        <div className="flex mt-4 flex-col min-w-[30%] items-center gap-[1ch]">
          <div className="bookDisplay__image-container">
            <img src={book.data.imageURL} alt="" />
          </div>
          <div>
            <button className="btn btn-primary text-white">
              <TbShoppingCartPlus size={24} className="text-white" />
              Add to cart
            </button>
          </div>
        </div>
        <div className="min-w-[60%] ">
          <h1 className="detailsDisplay-title">{book.data.title}</h1>
          <h4 className="detailsDisplay-authorName">{book.data.author}</h4>
          <div className="detailsDisplay-rating">
            <span className="stars">
              {/* <Rating
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
              /> */}
            </span>
            <span>{book.data.rating}</span>
          </div>
          <h4>₹{book.data.price}</h4>

          <p>{book.data.summary}</p>

          <div>
            <span>Genres:</span>
            {book.data.genre.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
          {/* <div className="flex mt-[2ch] flex-wrap justify-start gap-[1ch]">
            <h3>Readers would Recommend</h3>
            <div className="flex gap-[1ch]">
              {book.data.related.map((b) => (
                <Card />
              ))}
            
              <img src={item.imageURL} alt="" />
            </div>
          </div> */}
          <div className="detailsDisplay-reviewsSection">
            <h3>Ratings and Reviews</h3>
            <div className="flex flex-col mt-10 gap-10 ">
              {book.data.reviews.map((review) => (
                <div className="flex gap-2" key={review._id}>
                  <div className="flex flex-col justify-center items-center gap-2 min-w-[60px] lg:min-w-[100px] text-center ">
                    <img
                      src={review.avatar_link}
                      alt=""
                      className="h-16 w-16 lg:h-20 lg:w-20 rounded-full shadow-sm "
                    />
                    <h5>{review.name}</h5>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <span>
                        {/* <Rating
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
                        /> */}
                        {review.rating}
                      </span>
                    </div>
                    <div>
                      <span className="truncate line-clamp-3">
                        {review.comment}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
export default BookPage;
// {
//     "_id": "646358711f0ad5668b00a784",
//     "title": "Harry Potter and the Chamber of Secrets",
//     "author": "J.K. Rowling",
//     "price": 285,
//     "imageURL": "",
//     "genre": [
//         "Fantasy",
//         "Adventure",
//         "Mystery"
//     ],
//     "rating": 4.1,
//     "summary": "Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series. The plot follows Harry's second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the school's corridors warn that the \"Chamber of Secrets\" has been opened and that the \"heir of Slytherin\" would kill all pupils who do not come from all-magical families. These threats are found after attacks which leave residents of the school petrified. Throughout the year, Harry and his friends Ron and Hermione investigate the attacks.",
//     "reviews": [
//         {
//             "_id": "646379b9ecab06a8b1e6767e",
//             "book_id": "646358711f0ad5668b00a784",
//             "name": "Mark Johnson",
//             "comment": "I was really disappointed by this book. The characters were flat and uninteresting, and the plot was predictable. I struggled to get through it and found myself skimming the last few chapters just to finish it.",
//             "rating": 2,
//             "avatar_link": "https://randomuser.me/api/portraits/men/6.jpg",
//             "__v": 0
//         },
//         {
//             "_id": "646379b9ecab06a8b1e67683",
//             "book_id": "646358711f0ad5668b00a784",
//             "name": "Emily Nguyen",
//             "comment": "I've read a lot of books in this genre, but this one really stood out to me. The writing was top-notch and the author had such a way with words that I found myself underlining passages and quotes throughout. The story itself was also incredibly engaging, and I loved the way the author wove together different threads to create a cohesive whole.",
//             "rating": 5,
//             "avatar_link": "https://randomuser.me/api/portraits/women/5.jpg",
//             "__v": 0
//         },
//         {
//             "_id": "646379b9ecab06a8b1e6767f",
//             "book_id": "646358711f0ad5668b00a784",
//             "name": "Sarah Lee",
//             "comment": "I picked up this book on a whim and I'm so glad I did. It was such a delightful surprise! The story was engaging and the characters were so well-drawn that I felt like I knew them personally. I was sad to say goodbye to them when I finished the book.",
//             "rating": 4,
//             "avatar_link": "https://randomuser.me/api/portraits/women/3.jpg",
//             "__v": 0
//         },
//         {
//             "_id": "646bd6d3fc31a18ccc93dcba",
//             "book_id": "646358711f0ad5668b00a784",
//             "name": "Emma Smith",
//             "comment": "I couldn't stop reading this book! The characters were so relatable, and the emotional depth of the story had me in tears. A must-read!",
//             "rating": 4.7,
//             "avatar_link": "https://randomuser.me/api/portraits/women/3.jpg",
//             "__v": 0
//         },
//         {
//             "_id": "646bd6d3fc31a18ccc93dcbb",
//             "book_id": "646358711f0ad5668b00a784",
//             "name": "Liam Johnson",
//             "comment": "This book is a true masterpiece. The author's attention to detail and descriptive language brought the story to life. I was completely engrossed!",
//             "rating": 4.9,
//             "avatar_link": "https://randomuser.me/api/portraits/men/4.jpg",
//             "__v": 0
//         },
//         {
//             "_id": "646bd6d3fc31a18ccc93dcbc",
//             "book_id": "646358711f0ad5668b00a784",
//             "name": "Noah Smith",
//             "comment": "This book touched my heart in ways I can't even describe. The themes explored were deep and thought-provoking. A truly remarkable read.",
//             "rating": 4.6,
//             "avatar_link": "https://randomuser.me/api/portraits/men/6.jpg",
//             "__v": 0
//         },
//         {
//             "_id": "646bd6d3fc31a18ccc93dcbd",
//             "book_id": "646358711f0ad5668b00a784",
//             "name": "Sophia Johnson",
//             "comment": "I couldn't get enough of this book! The author's storytelling skills are phenomenal, and I was completely immersed in the world they created.",
//             "rating": 4.3,
//             "avatar_link": "https://randomuser.me/api/portraits/women/7.jpg",
//             "__v": 0
//         },
//         {
//             "_id": "646c52d1997f7eb351ed6ade",
//             "book_id": "646358711f0ad5668b00a784",
//             "name": "Vikram",
//             "comment": "Definitely recommend this book to young adults, adventures and mysterious",
//             "rating": 4,
//             "avatar_link": "https://www.gravatar.com/avatar/2179e13d6b36e0d2c49b45d425093bde",
//             "__v": 0
//         }
//     ],
//     "related": []
// }
