const express = require('express');
const geocode = require('./utils/geoCode');
const weather =require('./utils/weatherCode')
const path = require('path');
const hbs = require('hbs');
const app = express();

const filePath = path.join(__dirname,"../public");
const hbsPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");

app.set('view engine','hbs');
app.set('views',hbsPath);
app.use(express.static(filePath));
hbs.registerPartials(partialsPath);
app.get('/',(req,res)=>{
    res.render('ok',{
        title:'Weather',
        name:'Saidul Mondal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Saidul Mondal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is some helpful text!',
        name:'Saidul Mondal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if (error){
            return res.send(error)
        }
        // console.log('Error',error)
        // console.log('Data',data)
        weather(data.latitude,data.longitude,(error,weatherData)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                location:data.location,
                forecast:weatherData,
                address:req.query.address
             
            })
            
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide an address'
        })
    }
    res.send({
        forecast:'It is rainning!',
        location:'Jamalpur'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Saidul Mondal',
        errorMassege:'Page not found'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Saidul Mondal',
        errorMassege:'Help article not found.'
    })
})

app.listen(8070,()=>{
    console.log('My server is running!')
});
//nodemon src/index.js -e js,hbs