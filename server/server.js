// #region ------------------[ Requires ]-----------------------------------------------------------------------
const express = require('express')
const colors = require('colors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5001
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'})
const cors = require('cors')
const path = require('path')
// #endregion --------------------------------------------------------------------------------------------------

// #region ------------------[   App    ]-----------------------------------------------------------------------
const app = express();
app.use(express.json({extended: false}))
//app.use('/images', express.static(path.join(__dirname, './public/images')));
app.use(cors())
// #endregion --------------------------------------------------------------------------------------------------

// #region ------------------[ Database ]-----------------------------------------------------------------------
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline.bold)
    }catch(err){
        console.log(`ERROR: ${err.message}`.bgRed.underline.bold)
        process.exit(1)
    }
}

connectDB()
// #endregion --------------------------------------------------------------------------------------------------

// #region ------------------[  Routes  ]-----------------------------------------------------------------------
app.use ('/api/v1/users', require('./routes/usersRoutes'))
app.use ('/api/v1/user/', require('./routes/userRoutes'))

app.use ('/api/blogs/', require('./routes/blogRoutes'))
//app.use ('/api/v1/stories', require('./routes/blogsRoutes'))

app.use ('/api/v1/page', require('./routes/pageRoutes'))
app.use ('/api/v1/pages', require('./routes/pagesRoutes'))

// =========== THIS IS HOW I WANT IT TO LOOK LIKE 
/*
app.use ('/api/v1/categories', require('./routes/Categories-routes'))
app.use ('/api/v1/category', require('./routes/Category-routes'))

app.use ('/api/v1/portfolio', require('./routes/Portfolio-routes'))
app.use ('/api/v1/portfolios', require('./routes/Portfolios-routes'))

app.use ('/api/v1/portfolio/categories/', require('./routes/PortfolioCategories-routes'))
app.use ('/api/v1/portfolio/category/', require('./routes/PortfolioCategory-routes'))

app.use ('/api/v1/quams', require('./routes/Quams-routes'))
app.use ('/api/v1/quam', require('./routes/Quam-routes'))

app.use ('/api/v1/story', require('./routes/Story-routes'))
app.use ('/api/v1/stories', require('./routes/Stories-routes'))

app.use ('/api/v1/users', require('./routes/Users-routes'))
app.use ('/api/v1/user', require('./routes/User-routes'))
*/
// #endregion --------------------------------------------------------------------------------------------------

app.listen(PORT, () => console.info(`Server is running on port ${PORT}`.green.underline.bold))
// #endregion --------------------------------------------------------------------------------------------------