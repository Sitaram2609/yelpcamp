
const mongoose= require('mongoose');
const Campground = require('../models/campground')
const cities=require('./cities')
const {places,descriptors}=require('./seedHelpers')





mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    
    useUnifiedTopology:true
})







const db= mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() =>{
    console.log("Database connected")
})


const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB =async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i < 50;i++){
        const random1000=Math.floor(Math.random() * 1000);
        const price= Math.floor(Math.random()*20) + 10;
        const camp=new Campground({
            author:'676c343ce49e890aed27538c',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description: 'efiejoiejrijere',
            price,
            geometry: {
                type: 'Point',
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                 ]
              },
            images:[ {
                url: 'https://res.cloudinary.com/dltayqicd/image/upload/v1738671064/yelpcamp/l5om06sresdtd3x63eoe.png',
                filename: 'yelpcamp/gb5h9igmeoit1wtkntdc',
                
              },
              {
                url: 'https://res.cloudinary.com/dltayqicd/image/upload/v1738671064/yelpcamp/xscjaoahumn2envuxiai.png',
                filename: 'yelpcamp/sqym0msqdvquu1l2duk6',
            
              }]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})