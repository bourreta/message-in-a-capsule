const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const landing = require('./routes/index');
const messages = require('./routes/api/messages');

const app = express();

// Handlebars
const hbs = expressHandlebars.create({defaultLayout:'main'});

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Setup Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Client Resources
app.use(express.static('public/img')); 
app.use(express.static('public/js')); 
app.use(express.static('public/css')); 

// Use Routes
app.use('/api/messages', messages);
app.use('/', landing);

app.use((req,res) =>{
    res.status(404);
    res.render('404');
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server started on port ${port}`));
