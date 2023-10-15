import React from "react";
import PageWrapper from "../../utils/PageWrapper";
import hero from "../../assets/hero-img.png";
import hero2 from "../../assets/hero-img-2.png";
import { TbBuildingStore } from "react-icons/tb";
import { NavLink } from "react-router-dom";
function HomePage() {
  return (
    <PageWrapper classes={' max-h-[90vh] lg:overflow-hidden'}>
      <section className="flex justify-center lg:flex-col items-center min-h-[90dvh] flex-col-reverse">
        <section className="flex flex-col items-center gap-6 mt-10">
          <h3 className="lg:text-md font-bold text-green-900 text-sm">
            PARADISE FOR BOOK LOVERS
          </h3>
          <h1 className="font-martel font-black lg:text-8xl text-secondary text-6xl">
            Bibliophile
          </h1>
          <h3 className="lg:text-2xl font-light text-center text-xl ">
            <span>Sharing knowledge has never been easier.</span>
            <br />
            <span>Find and sell used books at lower rates</span>
          </h3>
          <NavLink className="btn btn-primary text-white mb-3" to={"/bookshelf"}>
            <TbBuildingStore size={25} />
            <span>Get started </span>
          </NavLink>
        </section>
        <div className="lg:max-w-5xl mt-auto max-h-96 select-none">
          <picture>
            <source media="(min-width: 900px)" srcSet={hero} />
            <source media="(min-width: 80px)" srcSet={hero2} />
            <img
              src={hero}
              alt="IfItDoesntMatchAnyMedia"
              className="lg:max-h-full max-h-[28rem]"
            />
          </picture>
        </div>
      </section>
    </PageWrapper>
  );
}

export default HomePage;
