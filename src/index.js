const express = require("express")
const app = express()
const json = require('./json')

app.get('/url', (req, res, next) => {
	res.json(["Tony","Lisa","Michael","Ginger","Food"])
})


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/', (req, res) => {
	/* expects body to contains .input + .output and header needs a format */
	let result = ''
	switch (req.headers["content-type"]) {
		case 'application/json':
			//console.log((req.body.input))
			result = json.convert(req.body.input, req.body.output, req.headers.format)
			break;

		case 'application/xml':
			throw 'xml requests have not yet been implemented'
			break;
	
		default:
			break;
	}
	
	//console.log('receiving a post:', req.body, ' + ', req.headers)
	//parser.convert(req.body.input, req.body.output, req.headers.format)
	//parser.parser(req.body)
	console.log(result)
	res.send(result)
})




app.listen(3000, () => {
	console.log("Server running on port 3000");
})