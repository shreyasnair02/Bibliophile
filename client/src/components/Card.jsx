import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useRef } from "react";
import { useCart } from "../Context/CartProvider";
import { useAddToCart } from "../hooks/apiQueries";
import { FiCheck } from "react-icons/fi";
import { Rating } from "react-simple-star-rating";
const Card = ({ book, showBook, bookID, index }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cart, handleCartChange } = useCart();
  const addToCart = useAddToCart();
  const cols = useRef(9);
  const setCols = () => {
    if (window.innerWidth < 768) {
      cols.current = 3;
    } else if (window.innerWidth < 1024) {
      cols.current = 4;
    } else if (window.innerWidth < 1280) {
      cols.current = 5;
    } else if (window.innerWidth < 1536) {
      cols.current = 6;
    } else {
      cols.current = 9;
    }
  };
  useEffect(() => {
    setCols();
    if (window.innerWidth < 600) {
      setIsMobile(true);
      setShowInfo(false);
    }

    window.addEventListener("resize", () => {
      setCols();
      if (window.innerWidth < 600) {
        setIsMobile(true);
        setShowInfo(false);
      }

      if (window.innerWidth < 600) {
        setIsMobile(true);
        setShowInfo(false);
      } else {
        setIsMobile(false);
        setShowInfo(false);
      }
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative flex shadow-lg"
      animate={{
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
    >
      <NavLink
        className="group overflow-hidden rounded-lg"
        onMouseOver={() => !isMobile && setShowInfo(true)}
        onMouseLeave={() => !isMobile && setShowInfo(false)}
        to={`/bookshelf/${bookID}`}
      >
        {/* {console.log(book)} */}
        <img
          className="h-[12.5rem] w-[8.5rem] object-cover rounded-lg rounded-b-none "
          src={book.imageURL}
          alt={book.title}
          loading="lazy"
        />
        <div className="flex justify-between p-2 items-center bg-neutral rounded-b-full">
          <div className="bookshelf__price-container">
            <span className="line-through text-xs">
              ₹{Math.round(book.price + 0.8 * book.price)}
            </span>
            <h3 className="text-xl font-martel">₹{Math.round(book.price)}</h3>
          </div>
          <button
            className=" btn btn-square btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              //   setCart([...cart, book]);
              handleCartChange(book) &&
                addToCart.mutate({ book_id: book._id, action: "push" });
            }}
          >
            {addToCart.isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary" />
            ) : addToCart.isSuccess ? (
              <FiCheck size={23} className="text-secondary" />
            ) : (
              <TbShoppingCartPlus
                size={23}
                className="text-secondary stroke-[2]"
              />
            )}
          </button>
        </div>
      </NavLink>
      <AnimatePresence initial={false}>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, x: "-20px" }}
            animate={{ opacity: 1, x: "0px" }}
            exit={{ opacity: 0, x: "20px" }}
            className={`absolute  w-80 top-14 rounded-lg z-20 bg-neutral p-5 flex flex-col justify-center shadow-lg gap-3 
            ${
              index % cols.current > cols.current / 2 ||
              index % cols.current == 0
                ? ` right-[110%] left-auto `
                : ` right-auto left-[110%] `
            }
            `}
          >
            <h3 className="bookshelf__book-title">{book.title}</h3>
            <h3>{index}</h3>
            <h5 className="bookshelf__book-author">{book.author}</h5>
            <div className="bookshelf__book-rating">
              <p>Condition</p>
              <Rating
                emptyStyle={{ display: "flex" }}
                fillStyle={{ display: "-webkit-inline-box" }}
                readonly={true}
                initialValue={book.rating}
                allowFraction={true}
                size={25}
                SVGstrokeColor="#4d3505"
                emptyColor="#f2e7d9"
                SVGstorkeWidth={1}
                fillColor="#4d3619"
              />
              <div className="rate"></div>
            </div>
            <div className="bookshelf__about-container">
              <h5>About the book</h5>
              <p className=" line-clamp-2">{book.summary}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Card;

// index%9 < 4
//
