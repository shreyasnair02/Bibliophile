import React from "react";
import PageWrapper from "../utils/PageWrapper";
import { useAddToCart, useGetBook } from "../hooks/apiQueries";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Card from "../components/Card";
import { TbShoppingCartPlus } from "react-icons/tb";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Context/LoginProvider";
import { useCart } from "../Context/CartProvider";
import { FiCheck } from "react-icons/fi";

function BookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { cart, handleCartChange } = useCart();
  const { isLoggedIn, user, setLoginData } = useLogin();
  const book = useGetBook([bookId]);
  const addToCart = useAddToCart();
  const [trnct, setTrnct] = useState(true);
  if (book.isLoading)
    return <div className="font-martel font-black text-2xl ">Loading...</div>;
  return (
    <PageWrapper classes={" min-h-[90dvh] p-6"}>
      <div className="flex flex-col lg:flex-row">
        <div className="flex mt-4 flex-col min-w-[30%] items-center gap-[1ch]">
          <div className="bookDisplay__image-container rounded-e-2xl rounded-s-lg overflow-hidden  ">
            <img
              src={book.data.imageURL}
              alt=""
              className="h-[16.5rem] w-[11rem] object-cover"
            />
          </div>
          <div>
            <button
              className="btn btn-primary text-white"
              onClick={(e) => {
                e.preventDefault();
                if (!isLoggedIn) {
                  navigate("/auth");
                }
                handleCartChange(book) &&
                  addToCart.mutate({ book_id: book._id, action: "push" });
              }}
            >
              {addToCart.isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary" />
              ) : addToCart.isSuccess ? (
                <FiCheck size={23} className="text-secondary" />
              ) : (
                <span className="flex items-center gap-2  ">
                  <TbShoppingCartPlus size={24} className="text-white" />
                  Add to cart
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="min-w-[60%] flex flex-col gap-4 ">
          <h1 className="font-martel font-black text-3xl text-secondary">
            {book.data.title}
          </h1>
          <h4 className="font-martel text-sm">{book.data.author}</h4>
          <div className="font">
            <span className="stars">
              <Rating
                emptyStyle={{ display: "flex" }}
                fillStyle={{ display: "-webkit-inline-box" }}
                readonly={true}
                initialValue={book.data.rating}
                allowFraction={true}
                size={35}
                SVGstrokeColor="#4d3505"
                emptyColor="#f2e7d9"
                SVGstorkeWidth={1}
                fillColor="#4d3619"
              />
            </span>
          </div>
          <h4 className="text-2xl font-martel">₹{book.data.price}</h4>

          <p className="font-montserrat max-w-[70%]">{book.data.summary}</p>

          <div className="flex items-center ">
            <span className="font-martel text-secondary font-black mr-2">
              Genres:
            </span>
            <div className="flex gap-1">
              {book.data.genre?.map((genre) => (
                <span
                  key={genre}
                  className="p-1 border-2 border-secondary bg-neutral rounded-2xl"
                >
                  {genre}
                </span>
              ))}
            </div>
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
            <h3 className="font-martel font-black">Ratings and Reviews:</h3>
            <div className=" flex flex-col mt-10 gap-10 ">
              {book.data.reviews.map((review) => (
                <div className="flex gap-2 w-5/6" key={review._id}>
                  <div className="flex flex-col justify-center items-center gap-2 min-w-[60px] lg:min-w-[100px] text-center ">
                    <img
                      src={review.avatar_link}
                      alt=""
                      className="h-16 w-16 lg:h-20 lg:w-20 rounded-full shadow-sm "
                    />
                    <h5 className="font-martel">{review.name}</h5>
                  </div>
                  <div className="flex flex-col gap-2">
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
                      <span className="line-clamp-3 ">{review.comment}</span>
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
