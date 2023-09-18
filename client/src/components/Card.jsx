import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useRef } from "react";
const Card = ({ book, cart, setCart, showBook, bookID, index }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
      className="relative flex"
      animate={{
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      onClick={() => {
        console.log("hello");
      }}
    >
      <div
        className="flex--0  "
        onMouseOver={() => !isMobile && setShowInfo(true)}
        onMouseLeave={() => !isMobile && setShowInfo(false)}
      >
        {/* {console.log(book)} */}
        <img
          className="h-[12.5rem] w-[8.5rem] object-cover rounded-lg rounded-b-none  "
          src={book.imageURL}
          alt={book.title}
          loading="lazy"
        />
        <div className="flex justify-between p-2 items-center bg-neutral rounded-b-lg">
          <div className="bookshelf__price-container">
            <div className="line-through text-sm">₹{book.price + 1000}</div>
            <h3 className="bookshelf__reduced-price">₹{book.price}</h3>
          </div>
          <button
            className=" btn btn-square btn-ghost"
            onClick={(e) => {
              e.stopPropagation();
              //   setCart([...cart, book]);
            }}
          >
            <TbShoppingCartPlus
              size={23}
              className="text-secondary stroke-[2]"
            />
          </button>
        </div>
      </div>
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
            {console.log(cols)}
            <h3 className="bookshelf__book-title">{book.title}</h3>
            <h3>{index}</h3>
            <h5 className="bookshelf__book-author">{book.author}</h5>
            <div className="bookshelf__book-rating">
              <p>Condition</p>
              {/* <Rating
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
              /> */}

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
