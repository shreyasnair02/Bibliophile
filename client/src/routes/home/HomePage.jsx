import React from "react";
import PageWrapper from "../../utils/PageWrapper";
import hero from "../../assets/hero-img.png";
function HomePage() {
  return (
    <PageWrapper>
      <div className="flex justify-center flex-col items-center min-h-[90vh]">
        <section className="flex flex-col items-center gap-6 mt-10">
          <h3 className="text-md font-bold text-green-900  ">
            PARADISE FOR BOOK LOVERS
          </h3>
          <h1 className="font-martel font-black text-8xl text-secondary">
            Bibliophile
          </h1>
          <h3 className="text-2xl font-light text-center  ">
            <span>Sharing knowledge has never been easier.</span>
            <br />
            <span>Find and sell used books at lower rates</span>
          </h3>
        </section>
        <div className="max-w-6xl mt-auto">
          <img src={hero} alt="book image" />
        </div>
      </div>
      
    </PageWrapper>
  );
}

export default HomePage;
