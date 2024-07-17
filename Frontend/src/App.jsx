import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import Comment from "./components/Comment";
import { UserContextProvider } from "./context/UserContext";
import MyBlogs from "./pages/MyBlogs";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/post/:id" element={<PostDetails />} />
            <Route path="/write" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/myblogs/:id" element={<MyBlogs />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/comments/:id" element={<Comment />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </ChakraProvider>
  );
};

export default App;
