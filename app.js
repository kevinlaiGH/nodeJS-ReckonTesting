//test1
const express = require('express');
const app = express();
const axios = require('axios');

var payload = []
app.use(express.static('dist'))

app.get('/test', (req, res) => {
	execute().then(() => {
		res.send({
			body: payload
		})
	})
})

app.listen(9999, () => {
	console.log('Example app listening on port 9999!')
})

function call1() {
	return axios.get('https://join.reckon.com/test1/rangeInfo')
		.then((res) => {
			return res.data
		})
}

function call2() {
	return axios.get('https://join.reckon.com/test1/divisorInfo')
		.then((res) => {
			return res.data
		})
}

async function execute() {
	var bounds = await call1()
	var divisors = await call2()
	var divisorsArr = divisors.outputDetails
	console.log(bounds, divisors)
	var lower = bounds.lower
	var upper = bounds.upper
	for (var i = lower; i < upper; i++) {
		if (i % divisorsArr[0].divisor == 0) {
			if (i % divisorsArr[1].divisor == 0) {
				payload.push(i + ': ' + divisorsArr[0].output + divisorsArr[1].output)
			}
			payload.push(i + ': ' + divisorsArr[0].output)
		}
		else if (i % divisorsArr[1].divisor == 0) {
			payload.push(i + ': ' + divisorsArr[1].output)
		}
		else {
			payload.push(i + ': ')
		}
	}

	// console.log(payload)

	//This returns a promise, not a value.
}