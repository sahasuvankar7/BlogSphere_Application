import React from "react";

const Footer = () => {
 return (
  <>
    <div className="mt-8 w-full bg-black px-4 md:px-[500px] flex flex-row md:flex-row items-start md:items-center justify-between text-xs md:text-md py-4 md:py-8 space-y-4 md:space-y-0 ">
      <div className="flex flex-col text-white  mt-4 md:mt-0 md:ml-8 space-y-1">
        <p>Feautured Blogs</p>
        <p>Most views</p>
        <p>Readers</p>
      </div>
      <div className="flex flex-col text-white mt-4 md:mt-0 md:ml-8 space-y-1">
        <p>forums</p>
        <p>Support</p>
        <p>Recent Posts</p>
      </div>
      <div className="flex flex-col text-white mt-4 md:mt-0 md:ml-8 space-y-1">
        <p>Privacy policy</p>
        <p>About us</p>
        <p>Terms & Conditions</p>
        <p>Terms of Service</p>
      </div>
    </div>
    <p className="py-6 text-center text-white bg-black">All rights reserved @Blog Market 2024</p>
  </>
);

};

export default Footer;
