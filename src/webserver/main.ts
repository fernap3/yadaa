import * as dotenv from "dotenv";
// Load configuration settings from the .env file in the same directory as this script
dotenv.config();
import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as expressHandlebars from "express-handlebars";
import * as sql from "@fernap3/sql";
import * as utils from "./utils";

const handlebars = expressHandlebars.create();

// Let the process crash on unhandled promises
process.on('unhandledRejection', err => { throw err; });

const app = express();
app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text());

// The route handler for when the user requests '/'
// Run handlebars on index.handlebars and respond with the output HTML
app.get("/", async (req, res, next) =>
{
	const html = await handlebars.render("src/webclient/index.handlebars", {});
	res.send(html);
});

app.use("/static", express.static("src/webclient"));

app.post("/event", (req, res, next) =>
{
	const event = req.body as EventPostRequest;
	if (typeof event.type === "undefined" || typeof event.data === "undefined")
	{
		res.status(422).send(`Request body must contain 'type' and 'data' properties`);
		return;
	}
	
	sql.doQuery<void>(`INSERT INTO Event(EventId,Type,Data) VALUES(?, ?, ?)`, [
		utils.guid(),
		event.type,
		JSON.stringify(event.data),
	]);

	res.status(201).send();
});

// Start the webserver
app.listen(process.env.PORT || 8080, () => {
	console.log(`Listening at port ${process.env.PORT}`);
});

type EventType = "glucose-reading" | "meal" | "bolus-insulin" | "basil-insulin" | "note";
type EventPostRequest = GlucoseReadingEventPostRequest | MealEventPostRequest | BasilInsulinEventPostRequest | BolusInsulinEventPostRequest | NoteEventPostRequest;

interface GlucoseReadingEventPostRequest
{
	type: "glucose-reading";
	data: GlucoseReadingEventData;
}

interface MealEventPostRequest
{
	type: "meal";
	data: MealEventData;
}

interface BolusInsulinEventPostRequest
{
	type: "bolus-insulin";
	data: BolusInsulinEventData;
}

interface BasilInsulinEventPostRequest
{
	type: "basil-insulin";
	data: BasilInsulinEventData;
}

interface NoteEventPostRequest
{
	type: "note";
	data: NoteEventData;
}

interface GlucoseReadingEventData
{

}

interface MealEventData
{
	
}

interface BolusInsulinEventData
{
	
}

interface BasilInsulinEventData
{
	
}

interface NoteEventData
{
	
}