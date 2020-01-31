const js2xmlparser = require('js2xmlparser')

/* use this class if the incomming data is json */
const convert = (input, output, format) => {
	if (output == '' || output == {} || output == null) {
		const item = {item: input}
		return xml(item, '')
	}
	return json(input, output, format)
	/*switch (format) {
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
	}*/
}

const json = (input, output, format = 'json', listName = 'item') => {
	const result = {}
	result[listName] = []

	if (Array.isArray(input)) {
		input.forEach(element => {
			result[listName].push(item = readOutputRecursive(element, output))
		})
	}else{
		if (output == '' || output == {} || output == null) {
			return console.log('if incomming and expected content-type is the same, use diffrent in/output')
		} else {
			result[listName].push(readOutputRecursive(input, output))
		}
	}

	switch (format) {
		case 'json':
			console.log(result)
			return result

		case 'xml':
			console.log('converting to xml')
			return xml(result, '')

		case 'csv':
			csv(input, output)	
			break;
	
		default:
			return console.log('Unsupported format')
	}
}

const readOutputRecursive = (input, output) => {
	const entries = Object.entries(output)
	//console.log(entries)

	const result = {}
	for (let i = 0; i < entries.length; i++) {
		const item = entries[i]

		switch (typeof item[1]) {
			case 'string':
				//console.log(`${item[i]} is type string`)
				const splitItem = item[1].split('::')
				if (splitItem.length === 1) {
					result[item[0]] = input[item[1]]
				}else{
					let target = input[item[0]]
					for (let i = 1; i < splitItem.length; i++) {
						target = target[splitItem[i]]
					}
					result[item[0]] = target
				}
				break;

			case 'object':
				//console.log(`${item[i]} is type object`)
				result[item[0]] = readOutputRecursive(input, item[1])
				break;
		
			default:
				console.log(`${i} type is not yet handled`)
				break;
		}	
	}
	return result
}

const xml = (input, output, rootName = 'root') => {
	const converted = js2xmlparser.parse(rootName, input)
	console.log(converted)
	return converted
}

const csv = (input, output) => {
	return console.log('Not yet implemented')
}

module.exports = {convert}