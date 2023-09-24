import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons from react-icons library
import { motion } from "framer-motion";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useRef } from "react";
function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  // const newUserMutation = useSignUp();
  // const newCheckMutation = useLogin();
  // const queryClient = useQueryClient();
  // const { isLoggedIn, user, setLoginData } = useLoginContext();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // newCheckMutation
    //   .mutateAsync({
    //     email_id: loginEmail,
    //     password: loginPassword,
    //   })
    //   .then((data) => {
    //     if (!data.errors) {
    //       window.my_modal_1.close();
    //       setLoginEmail("");
    //       setLoginPassword("");
    //       setLoginData(true, data);
    //       window.location.reload();
    //     }
    //   });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // newUserMutation
    //   .mutateAsync({
    //     email_id: signupEmail,
    //     name: signupName,
    //     password: signupPassword,
    //   })
    //   .then((data) => {
    //     if (!data.errors) {
    //       window.my_modal_1.close();
    //       setSignupEmail("");
    //       setSignupPassword("");
    //       setSignupName("");
    //       setLoginData(true, data);
    //       window.location.reload();
    //     }
    //   });
  };

  return (
    <motion.section
      className=" relative overflow-x-hidden min-w-[90vh] flex justify-center p-5"
      initial={{ opacity: 0, y: "30px" }}
      animate={{ opacity: 1, y: "0px" }}
      exit={{ opacity: 0, y: "-30px" }}
    >
      <div className="max-w-[90vh] ">
        <h1 className="text-7xl font-martel text-secondary select-none">
          Bibliophile
        </h1>
        <div className="form-container p-1">
          {/* <div className="tabs">
            <a
              className={`tab tab-bordered ${
                activeTab === "login" ? "tab-active" : ""
              }`}
              onClick={() => handleTabClick("login")}
            >
              Login
            </a>
            <a
              className={`tab tab-bordered ${
                activeTab === "signup" ? "tab-active" : ""
              }`}
              onClick={() => handleTabClick("signup")}
            >
              Sign Up
            </a>
          </div> */}
          <div className="divider">OR</div>
          {activeTab === "login" ? (
            <form
              onSubmit={handleLoginSubmit}
              className="form-content flex flex-col gap-6 m-3 "
            >
              <div className="input-group  flex flex-col ">
                <label htmlFor="loginemail">Email:</label>
                <div>
                  <input
                    id="loginemail"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="input input-bordered w-full  focus:outline-offset-1"
                  />

                  {/* {newCheckMutation.isSuccess &&
                  newCheckMutation.data?.errors?.email && (
                    <span className="flex-wrap text-sm text-red-500 bg-transparent">
                      <MdErrorOutline fill="red" />
  
                      {newCheckMutation.data?.errors?.email}
                    </span>
                  )} */}
                </div>
              </div>

              <div className="input-group  flex flex-col">
                <label htmlFor="loginpassword">Password:</label>
                <div>
                  <div className="relative">
                    <input
                      id="loginpassword"
                      type={loginShowPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="input input-bordered focus:outline-offset-1 w-full"
                    />
                    <span
                      className="absolute bg-transparent inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => {
                        setLoginShowPassword((prev) => !prev);
                      }}
                    >
                      {loginShowPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                    </span>
                  </div>
                  {/* {newCheckMutation.isSuccess &&
                  newCheckMutation.data?.errors?.password && (
                    <span className="flex-wrap text-sm text-red-500 bg-transparent">
                      <MdErrorOutline fill="red" />
                      {newCheckMutation.data?.errors?.password}
                    </span>
                  )} */}
                </div>
              </div>
              <button type="submit" className="btn btn-primary text-white">
                Login
              </button>
              <span className="text-center select-none">
                Don't have an account?{" "}
                <a
                  className="link link-primary"
                  onClick={() => handleTabClick("signup")}
                >
                  Sign in
                </a>
              </span>
            </form>
          ) : (
            <form
              onSubmit={handleSignupSubmit}
              className="form-content flex flex-col gap-5 m-3"
            >
              <div className="input-group gap-1 flex flex-col ">
                <label htmlFor="signupname">Name:</label>
                <div>
                  <input
                    id="signupname"
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    className="input input-bordered w-full"
                  />
                  {/* {newUserMutation.isSuccess &&
                  newUserMutation.data?.errors?.name && (
                    <span className="flex-wrap text-sm text-red-500 bg-transparent">
                      <MdErrorOutline fill="red" />
                      {"  "}
                      {newUserMutation.data?.errors?.name}
                    </span>
                  )} */}
                </div>
              </div>
              <div className="input-group flex flex-col">
                <label htmlFor="signupemail">Email:</label>
                <div>
                  <input
                    id="signupemail"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="input input-bordered w-full"
                  />
                  {/* {newUserMutation.isSuccess &&
                  newUserMutation.data?.errors?.email && (
                    <span className="flex-wrap text-sm text-red-500 bg-transparent">
                      <MdErrorOutline fill="red" />
                      {"  "}
                      {newUserMutation.data?.errors?.email}
                    </span>
                  )} */}
                </div>
              </div>

              <div className="input-group  gap-1 flex flex-col">
                <label htmlFor="signuppassword">Password:</label>
                <div>
                  <div className="relative">
                    <input
                      id="signuppassword"
                      type={signupShowPassword ? "text" : "password"}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="input input-bordered w-full"
                    />
                    <span
                      className="absolute bg-transparent inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setSignupShowPassword((prev) => !prev)}
                    >
                      {signupShowPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                    </span>
                  </div>
                  {/* {newUserMutation.isSuccess &&
                  newUserMutation.data?.errors?.password && (
                    <span className="flex-wrap text-sm text-red-500 bg-transparent">
                      <MdErrorOutline fill="red" />
                      {"  "}
                      {newUserMutation.data?.errors?.password}
                    </span>
                  )} */}
                </div>
              </div>
              <button type="submit" className="btn btn-primary text-white">
                {/* {newUserMutation.isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <span>Sign Up</span>
              )} */}
                <span>Sign Up</span>
              </button>
              <span className="text-center select-none">
                Already have an account?
                <a
                  className="link link-primary"
                  onClick={() => handleTabClick("login")}
                >
                  Login
                </a>
              </span>
            </form>
          )}
        </div>
      </div>
    </motion.section>
  );
}

export default Auth;
