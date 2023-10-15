import { CiSearch } from "react-icons/ci";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { useState } from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

const IconProps = { size: 18, color: "currentColor" };

const InputIcon = (type) => {
  switch (type) {
    case "email":
      return <MdOutlineAlternateEmail {...IconProps} />;
    case "password":
      return <BiLock {...IconProps} />;
    case "search":
      return <CiSearch {...IconProps} className="stroke-1" />;
    default:
      return null;
  }
};

export default function Input({
  required,
  type,
  name,
  placeholder,
  value,
  onChange,
  minlength,
  className = "",
  listData,
}) {
  const [show, setShow] = useState(false);
  const blurTimeoutRef = useRef(null);
  const handleInputBlur = () => {
    // Use a delay before closing the dropdown (e.g., 200 milliseconds)
    setTimeout(() => {
      setShow(false);
    }, 400);
  };

  return (
    <div
      className={`flex bg-neutral relative flex-grow lg:flex-grow-0 lg:w-[30rem] items-center rounded-md focus-within:outline focus-within:outline-primary focus-within:outline-2 join    ${className}`}
    >
      <div className="p-3 bg-base-200 rounded-md h-full rounded-r-none ">
        {InputIcon(type)}
      </div>
      <input
        className="w-full p-3 bg-neutral rounded-md  focus:outline-none "
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        minLength={minlength}
        required
        autoComplete="off"
        onBlur={handleInputBlur}
        onFocus={() => {
          setShow(true);
        }}
      />
      {listData?.length > 0 && (
        <ul
          className={`menu absolute p-0  top-full left-0 w-full  bg-base-200 z-20 rounded-box rounded-t-none ${
            !show && " hidden "
          }`}
        >
          {listData.map((item) => (
            <li key={item._id} className="p-0">
              <NavLink to={`/bookshelf/${item._id}`}>
                <img src={item.imageURL} className="h-14 rounded-sm" />{" "}
                <div>
                  <div className="font-martel font-black text-md text-secondary ">{item.title}</div>
                  <div className="font-martel text-xs">{item.author}</div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
