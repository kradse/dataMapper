const js2xmlparser = require('js2xmlparser')

const parser = (input) => {
	console.log(input.body)
}

const convert = (input, output, format) => {
	switch (format) {
		case 'json':
			json(input, output)	
			break;

		case 'xml':
			xml(input, output)	
			break;

		case 'csv':
			csv(input, output)	
			break;
	
		default:
			return console.log('Unsupported format')
	}
}

const json = (input, output) => {
	




	return console.log('Not yet implemented')
}

const xml = (input, output) => {
	console.log(input, output)
	if (output == '' || output == {} || output == null) {
		console.log('do i get here?')
		return console.log(js2xmlparser.parse('root', input))
	} else {
		return console.log('Not yet implemented')
	}
}

const csv = (input, output) => {
	return console.log('Not yet implemented')
}

module.exports = {convert}