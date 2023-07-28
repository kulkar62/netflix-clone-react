import React from "react";
import SavedMovies from "../components/SavedMovies";

const Account = () => {
  return (
    <div className="w-full text-white">
      <img
        className="w-full h-[400px] object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/bff5732c-7d13-45d1-9fab-476db25a1827/bdaf67f1-0b55-41f1-97cb-89fafea5f6ff/US-en-20230710-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="/"
      />
      <div className="bg-black/60 fixed top-0 left-0  w-full h-[550px]"></div>
      <div className="absolute top-[20%] p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold">My Movies</h1>
      </div>
      <SavedMovies />
    </div>
  );
};

export default Account;
