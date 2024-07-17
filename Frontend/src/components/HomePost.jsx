import React from "react";
import { format } from "date-fns";
import { IF } from "../url";

const HomePost = ({ post }) => {
  return (
    <div className="mt-24 w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      {/* left div */}
      <div className="w-full md:w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={IF + post.photo}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      {/* right div */}
      <div className="flex flex-col w-full md:w-[65%]">
        <h1 className="text-xl font-bold mb-1 md:mb-2 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex flex-col md:flex-row mb-2 text-sm font-semibold text-gray-500 space-y-2 md:space-y-0 md:space-x-4 md:mb-4 items-start md:items-center justify-between">
          <p>{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.createdAt).toDateString().slice(0, 15)}</p>
            <p>{new Date(post.createdAt).toString().slice(15, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-base">
          {post.desc.slice(0, 200) + " ...Read more"}
        </p>
      </div>
    </div>
  );
};

export default HomePost;
