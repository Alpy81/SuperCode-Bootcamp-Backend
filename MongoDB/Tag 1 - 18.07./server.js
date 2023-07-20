import express from "express";
import "./models/index.js";
import { Post } from "./models/PostModel.js";
import { Author } from "./models/AuthorModel.js";
import multer from "multer";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "de3tbljvy",
  api_key: "122113981293266",
  api_secret: "VlNJYAKJgZVMucgrJwe0IsLT9LU",
});

const app = express();
const PORT = 3001;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/posts", async (req, res) => {
  const data = await Post.find();
  res.json(data);
});

app.post("/api/addPost", upload.single("image"), async (req, res) => {
  try {
    const author = await Author.findById(req.body.author);

    if (author === null) {
      return res.send("Author is invalid");
    }
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "MyBlog" },
        async (err, result) => {
          const response = await Post.create({
            ...req.body,
            image: { url: result.secure_url, imageId: result.public_id },
          });
          res.json(response);
        }
      )
      .end(req.file.buffer);
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

app.put("/api/editPost/:id", async (req, res) => {
  const edits = req.body;
  const postId = req.params.id;

  try {
    const dbRes = await Post.findByIdAndUpdate(postId, edits, { new: true });
    res.json(dbRes);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

app.delete("/api/deletePost/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const dbRes = await Post.findByIdAndDelete(postId);
    cloudinary.uploader.destroy(dbRes.image?.imageId, (err) =>
      console.log(err)
    );
    res.send("post has been deleted");
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

app.post("/api/newAuthor", async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.json(newAuthor);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

app.get("/api/getPostsByAuthor/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const posts = await Post.find({ author: authorId });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

app.listen(PORT, () => console.log("Der Server läuft", PORT));
