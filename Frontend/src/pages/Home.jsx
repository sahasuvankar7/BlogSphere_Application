import axios from "axios";
import Footer from "../components/Footer";
import HomePost from "../components/HomePost";
import Navbar from "../components/Navbar";
import { URL } from "../url"; // Ensure URL is correctly imported
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  // console.log(user);

  const fetchPosts = async () => {
    
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${search}`);
      // console.log(res.data, "this is data");
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Call fetchPosts to load posts on component mount
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh] ">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <div key={post._id}>
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePost key={post._id} post={post} />
              </Link>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <h3 className="text-center font-bold mt-20 ">No posts available</h3>

          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
