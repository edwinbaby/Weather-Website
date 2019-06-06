const request= require('request')
const forecast = (latitude,longitude,callback)=>{

    const url='https://api.darksky.net/forecast/a8dfe6f16ba059fa22c76f09d19acee8/'+latitude+','+longitude
    request({url,json: true},(error,{body}={})=>{
    if (error)
     {
        callback('Unable to connect',undefined)
     }
    else if (body.error)
    {
        callback('Unable to find the location',undefined)
    }

    else {
 
        console.log(body.daily.data[0])
        callback(undefined,body.daily.data[0].summary +' It is currently ' + body.currently.temperature+' degress out. High is ' +body.daily.data[0].temperatureHigh + ' With a low of '+body.daily.data[0].temperatureLow +'. There is a '+ body.currently.precipProbability + '% Chance of rain')
    }
    })
       
}

module.exports = forecast

