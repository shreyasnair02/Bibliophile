import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { genres } from "./Bookshelf";
import { Rating } from "react-simple-star-rating";
import PageWrapper from "../utils/PageWrapper";
import { useUploadBook } from "../hooks/apiQueries";
import { BiErrorCircle } from "react-icons/bi";
const SellBook = () => {
  const [base64Image, setBase64Image] = useState(null);
  const newBook = useUploadBook();
  const [bookInfo, setBookInfo] = useState({
    title: "",
    summary: "",
    condition: 0,
    author: "",
    price: "",
    selectedGenres: [],
    imageURL: null,
  });

  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 300; // Adjust the desired width
          canvas.height = (300 * img.height) / img.width; // Maintain aspect ratio

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            async (blob) => {
              const compressedBase64 = await convertBlobToBase64(blob);
              resolve(compressedBase64);
            },
            "image/jpeg",
            0.6
          ); // Adjust the desired quality
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        resolve(base64String);
      };
      reader.readAsDataURL(blob);
    });
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    minSize: 0,
    maxSize: 5242880,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const compressedBase64 = await compressImage(file);
        setBase64Image(compressedBase64);
      }
      setBookInfo({ ...bookInfo, imageURL: file });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({ ...bookInfo, [name]: value });
  };

  const handleGenreChange = (e, genre) => {
    e.preventDefault();
    const isSelected = bookInfo.selectedGenres.includes(genre);
    if (isSelected) {
      setBookInfo({
        ...bookInfo,
        selectedGenres: bookInfo.selectedGenres.filter((g) => g !== genre),
      });
    } else {
      setBookInfo({
        ...bookInfo,
        selectedGenres: [...bookInfo.selectedGenres, genre],
      });
    }
  };

  const handleSubmit = (e) => {
    // Handle form submkission with bookInfo
    e.preventDefault();
    newBook.mutate({
      ...bookInfo,
      imageURL: base64Image,
      genre: bookInfo.selectedGenres,
      rating: bookInfo.condition,
    });
  };

  return (
    <PageWrapper>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4 font-martel font-black">Sell Your Book</h1>
        <form className="flex flex-col items-center " onSubmit={handleSubmit}>
          <div className="lg:w-1/2 flex flex-col items-center   ">
            {/* Image Upload */}
            {newBook.data?.errors?.imageURL ? (
              <label className=" text-red-600 mb-2 flex items-center gap-1">
                <BiErrorCircle className="text-red-600 animate-ping" /> Upload
                Book Image
              </label>
            ) : (
              <label className="block text-gray-600 mb-2">
                Upload Book Image
              </label>
            )}
            <div className="mb-4 flex flex-col-reverse items-center border-dashed border-secondary border rounded-xl max-w-[70%] p-10">
              <div
                {...getRootProps()}
                className="relative lg:max-w-[15vw] h-max border-dashed  border-secondary rounded-lg p-2"
              >
                <input {...getInputProps()} />
                <FaUpload className="text-4xl text-gray-400 mx-auto mb-2" />
                {!bookInfo.imageURL ? (
                  <p className="text-gray-600 text-center">
                    Drag &amp; drop an image here, or click to upload
                  </p>
                ) : (
                  <p className="text-gray-600 text-center">
                    Choose another image
                  </p>
                )}
              </div>
              {bookInfo.imageURL && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(bookInfo.imageURL)}
                    alt="Uploaded Cover"
                    className="w-32 h-48 object-fill"
                  />
                </div>
              )}
            </div>
            {/* Other Form Fields */}
            {/* ... (Title, Summary, Author, Price) */}
          </div>
          <div className="mb-4 lg:w-1/2">
            <label className="flex gap-1 text-gray-600 mb-2">
              Title{" "}
              {newBook.data?.errors?.title && (
                <span className="text-red-600 flex items-center">
                  <BiErrorCircle />
                  {newBook.data?.errors?.title}
                </span>
              )}
            </label>
            <input
              required
              type="text"
              name="title"
              className="input input-bordered w-full mb-2"
              placeholder="Harry Potter and the ... "
              value={bookInfo.title}
              onChange={handleInputChange}
            />
            <label className="flex gap-1 text-gray-600 mb-2">
              Author{" "}
              {newBook.data?.errors?.author && (
                <span className="text-red-600 flex items-center">
                  <BiErrorCircle />
                  {newBook.data?.errors?.author}
                </span>
              )}
            </label>
            <input
              required
              type="text"
              name="author"
              className="input input-bordered w-full mb-2"
              placeholder="JK Rowling..."
              value={bookInfo.author}
              onChange={handleInputChange}
            />
            <label className="flex gap-1 text-gray-600 mb-2">
              Summary{" "}
              {newBook.data?.errors?.summary && (
                <span className="text-red-600 flex items-center">
                  <BiErrorCircle />
                  {newBook.data?.errors?.summary}
                </span>
              )}
            </label>
            <textarea
              required
              rows={5}
              type="text"
              name="summary"
              className="textarea textarea-bordered w-full"
              placeholder="Enter a summary"
              value={bookInfo.summary}
              onChange={handleInputChange}
            />
            <div className="flex items-center justify-around lg:flex-row flex-col gap-3">
              <div className=" flex gap-2 items-center">
                {newBook.data?.errors?.price ? (
                  <span className="text-red-600 flex items-center gap-1">
                    <BiErrorCircle />
                    <label className=" text-red-600 ">Price: </label>
                  </span>
                ) : (
                  <label className=" text-gray-600 mb-2">Price: </label>
                )}
                <span className="font-martel font-black text-2xl">₹</span>
                <input
                  type="number"
                  name="price"
                  min="0"
                  max="10000"
                  className="input max-w-[10rem]"
                  placeholder="0 - 10000"
                  value={bookInfo.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2 items-center">
                {newBook.data?.errors?.rating ? (
                  <span className="text-red-600 flex items-center gap-1">
                    <BiErrorCircle /> Condition:
                  </span>
                ) : (
                  <label className=" text-gray-600 ">Condition:</label>
                )}
                <Rating
                  emptyStyle={{ display: "flex" }}
                  fillStyle={{ display: "-webkit-inline-box" }}
                  allowFraction={true}
                  size={25}
                  SVGstrokeColor="#4d3505"
                  emptyColor="#f2e7d9"
                  SVGstorkeWidth={1}
                  allowHover={false}
                  initialValue={bookInfo.condition}
                  fillColor="#4d3619"
                  onClick={(rate) =>
                    setBookInfo({ ...bookInfo, condition: rate })
                  }
                />
                <span>{bookInfo.condition.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 lg:ml-4">
            <div className="mb-4">
              <label className="flex items-center text-gray-600 mb-2">
                Select Genres
                {newBook.data?.errors?.genre && (
                  <span className="text-red-600 flex items-center">
                    <BiErrorCircle />
                    {newBook.data?.errors?.genre}
                  </span>
                )}
              </label>
              <div
                className={` container h-32 w-full overflow-y-scroll border`}
              >
                {genres.map((genre) => (
                  <button
                    key={genre.genre}
                    className={`btn border border-gray-400 rounded-md p-2 m-1 cursor-pointer min-h-0 ${
                      bookInfo.selectedGenres.includes(genre.genre)
                        ? "bg-primary text-white"
                        : ""
                    }`}
                    onClick={(e) => handleGenreChange(e, genre.genre)}
                  >
                    {genre.genre}
                  </button>
                ))}
              </div>
            </div>
            {/* Submit Button */}
            <div className="text-center">
              <button
                className="btn btn-primary w-[50%] text-white"
                type="submit"
                disabled={
                  !bookInfo.imageURL ||
                  !bookInfo.title ||
                  !bookInfo.price ||
                  !bookInfo.summary ||
                  !bookInfo.condition ||
                  bookInfo.selectedGenres.length === 0
                }
              >
                {newBook.isLoading && (
                  <span className="loading loading-spinner"></span>
                )}
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default SellBook;
