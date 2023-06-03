const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/userRoute");
const path = require("path");
const app = express();
const cors = require("cors");
const postAdsRoute = require("./routes/postAdsRoute");
const authentication = require("./middleware/authentication");
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    app.use(express.static(path.join(__dirname, "../", "frontend")));
    res.sendFile(path.resolve(__dirname, "../", "frontend", "index.html"));
});
app.use("/api/user", userRouter);

app.use("/api/postads", authentication, postAdsRoute);
app.use("/api/browseads", postAdsRoute);


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log(`Server is running at the port ${process.env.port}`);
    } catch (error) {
        console.log("Something went wrong " + error);
    }
})