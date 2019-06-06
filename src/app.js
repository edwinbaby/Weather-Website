const express = require('express')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//hbs is a express.js wrapper for the handlebars.js javascript template engine. 
//Handlebars.js is a template engine to make writing html code easier
//But handlebars.js is meant for client-side copilation(the browser compiles the templates)
//so you need a wrapper like hbs.
//A wrapper makes it possible to use for example a client-side library in express.js and that is what hbs does

const hbs = require('hbs')
const app = express()


const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialspath =path.join(__dirname,'../templates/partials')

// Setup handlebar
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialspath)

//setup static directory
app.use(express.static(publicDirectory))
app.get('',(req,res)=>{

    res.render('index',{
        title:'Whether',
        name:'Edwin Baby'
    })
})

app.get('/help',(req,res)=>{

    res.render('help',{
       label:'This is some helpful text',
       title:'Help',
       name:'Edwin Baby'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Edwin Baby'
    })
})

app.get('/weather',(req,res)=>{
   if(!req.query.address)
   {
       return res.send({
           error:'You must provide an address'
       })
   }

   geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
       if (error)
       {
           return res.send({
             error
           })
       }  
       forecast(latitude,longitude,(error,forecastData)=>{
           if (error)
           {
               return res.send({
                   error
               })
           }
           
           res.send({
            forecast: forecastData,
            location,
            address: req.query.address
           })

       })


   })
    
})

app.get('/products',(req,res)=>{
   if(!req.query.search) {
       return res.send({
           error:'You must provide a search term'
       })
   }

    console.log(req.query.search)
    res.send({
        product:[]
    })
})
 app.get('/help/*',(req,res)=>{
     res.render('404',{
         title:'404',
         errormsg:'Help article not found',
         name:'Edwin Baby'
     })
 })

app.get('*',(req,res)=> {

    res.render('404',{
        title:'404',
        errormsg:'My 404 Page',
        name:'Edwin Baby'
    })
})

app.listen(port,()=>{
    console.log('Server is up and running on port' + port)
})

