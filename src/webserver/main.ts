import * as express from "express";
import * as dotenv from "dotenv";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as expressHandlebars from "express-handlebars";

const handlebars = expressHandlebars.create();

// Let the process crash on unhandled promises
process.on('unhandledRejection', err => { throw err; });

// Load configuration settings from the .env file in the same directory as this script
dotenv.config();

const app = express();
app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text());

// The route handler for when the user requests '/'
// Run handlebars on index.handlebars and respond with the output HTML
app.get("/", async (req, res, next) => {
	const html = await handlebars.render("src/webclient/index.handlebars", {
		
	});
	res.send(html);
});

app.use(express.static("src/webclient"));

// Start the webserver
app.listen(process.env.PORT || 8080, () => {
	console.log(`Listening at port ${process.env.PORT}`);
});
