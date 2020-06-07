const request = require('request');

const geocode =(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?types=poi&access_token=pk.eyJ1Ijoic2FpZHVsMTIzIiwiYSI6ImNrYWRqb3Y1YjFyODgzMG10dDkwYzZ6aHAifQ.HvOrvQWAREEJ2U1FSgHpUQ'

    request({url:url,json:true},(error,response)=>{

        if(error){

            callback('Unable to access',undefined)
       
        }
        else if(response.body.features===0){

             callback('Unable to find location.Try another search',undefined)
        
            }
        else{

            callback(undefined,{

                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name,

            })
            
        }
    
    })
}

module.exports=geocode;