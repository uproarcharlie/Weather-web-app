const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c5522fe6131e038796a5dfbc5738e5a5/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=en' 

request({url, json: true}, (error, { body }) => {
    if (error) {
        callback('Unable to connect to the weather service!', undefined)
    } else if (body.error) {
        callback('unable to find location', undefined)
    } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% change of rain.')
}
})
}

module.exports = forecast