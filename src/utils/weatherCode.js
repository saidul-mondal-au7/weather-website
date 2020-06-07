const request = require('request');

const weather = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=6d8339e842a6bc467470c4ba00cfed53&query="+latitude+','+longitude+'&units=f'

    request({url:url,json:true},(error,response)=>{
        // const data = JSON.parse(response.body)
        // console.log(response.body.current)
        if(error){
            callback('Unable to connect to weather service.',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location.',undefined)
        }
        else{
            // console.log(response.body.current)
            const temp = response.body.current.temperature
            const feel = response.body.current.feelslike
            const cloudy = response.body.current.weather_descriptions
            const wind_speed = response.body.current.wind_speed
            const humidity = response.body.current.humidity
            const cloudcover = response.body.current.cloudcover

            callback(undefined,'It is '+cloudy
            +' and currently '+ temp +' degrees out. It feels like '+feel+' degrees out.The wind speed is '+wind_speed+'. The humidity is '+humidity+'% and cloudcover '+cloudcover +'% .')
        }
    })
}

module.exports = weather
