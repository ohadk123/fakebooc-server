import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

require("custom-env").env(process.env.NODE_ENV, "./config");
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.listen(process.env.PORT);