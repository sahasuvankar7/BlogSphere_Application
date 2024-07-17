const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv/config");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require('multer');
const path = require('path');

const { PORT, MONGO_URL, CLIENT_URL } = process.env;

// database
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// middlewares

app.use(express.json());
app.use('/images',express.static(path.join(__dirname,'images'))); // to access images
app.use(
  cors({
    origin: CLIENT_URL, // specify the origin for CORS
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // specify the methods for CORS
    credentials: true, // this allows session cookies to be sent with requests
    optionsSuccessStatus: 200, // some legacy browsers choke on 204
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);


app.get("/",(req,res)=>{
  res.json("hello")
})
//image upload
// const storage = multer.diskStorage({
//   destination:(req,file,fn)=>{
//     fn(null,path.join(__dirname,'images'));
//   },
//   filename:(req,file,fn)=>{
//     fn(null,file.originalname)

//   }
// }) 

// const upload = multer({storage:storage});
// app.post("/api/upload",upload.single("file"),(req,res)=>{
//   res.status(200).json("image has been uploaded succcess fully")
// })



const storage=multer.diskStorage({
  destination:(req,file,fn)=>{
      fn(null,"images")
  },
  filename:(req,file,fn)=>{
      fn(null,req.body.img)
      // fn(null,"image1.jpg")
  }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
  // console.log(req.body)
  res.status(200).json("Image has been uploaded successfully!")
})



app.listen(PORT, () => {
  connectDB();
  console.log(
    `Server is running on port ${PORT} get ready to code!`
  );
});
