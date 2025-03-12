if (process.env.NODE_ENV !== "production") {

    require('dotenv').config();
}



const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');

const userRoutes = require('./routes/users');
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');
const helmet = require("helmet");
const { MongoStore } = require('connect-mongo');



const MongoDBStore = require('connect-mongo')(session);
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

// process.env.DB_URL

mongoose.connect(dbUrl, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize({
    replaceWith: '_'
}));

const store=new MongoDBStore({
     url:dbUrl,
     secret: process.env.SECRET || 'thisshouldbeabettersecret',
     touchAfter: 24 * 60 * 60
})

store.on("error",function(e){
    console.log("Session store error",e)
})

const sessionConfig = {
    store,
    name: 'session',
   secret: process.env.SECRET || 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", // ✅ Allow MapTiler's CDN scripts
];

const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", // ✅ Allow MapTiler's CDN styles
];

const connectSrcUrls = [
    "https://api.maptiler.com/", // ✅ Allow MapTiler's API
];

const imgSrcUrls = [
    "'self'",
    "blob:",
    "data:",
    "https://res.cloudinary.com/dltayqicd/", // ✅ Update with your Cloudinary account
    "https://images.unsplash.com",
    "https://api.maptiler.com/", // ✅ Allow MapTiler images
];

const fontSrcUrls = [
    "https://fonts.gstatic.com",
    "https://cdnjs.cloudflare.com",
];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", ...scriptSrcUrls], 
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            fontSrc: ["'self'", ...fontSrcUrls],
            workerSrc: ["'self'", "blob:"],
            childSrc: ["blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dltayqicd/", // Update with your Cloudinary account
                "https://images.unsplash.com",
            ],
        },
    })
);



app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Logging session, flash messages, and current user
app.use((req, res, next) => {
    
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

//app.get('/fakeUser', async (req, res) => {
  //  const user = new User({ email: 'coltttt@gmail.com', username: 'colttt' });
   // const newUser = await User.register(user, 'chicken');
  //  res.send(newUser);
//});

app.use('/', userRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!';
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});
