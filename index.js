const express = require("express");
const app = express();
const port = 4000;
// const AuthRoute = require("./routes/auth/Auth");
const ArticleRoutes = require("./routers/articleRouter");
const FactRoutes = require("./routers/factRouter");

require("dotenv").config();

// cors
const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://http://192.168.100.72:5173/",
    ],
    credentials: true,
  })
);

app.use(express.json());

// express session
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    // do not expire session
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  })
);

app.post("/check", (req, res) => {
  console.log(req.session);
  res.send(req.session);
});

app.use("/api/articles", ArticleRoutes);
app.use("/api/facts", FactRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
