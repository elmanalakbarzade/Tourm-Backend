const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path"); 
const connectdb = require('./config/connectdb');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Client routes
const surfaceRoute = require('./routers/client/surface');
app.use('/', surfaceRoute);

// Admin routes
const adHomeRoute = require("./routers/admin/homepage");
const adGuiderDetailsRoute = require("./routers/admin/guiderdetails");
const adActivityRoute = require("./routers/admin/activity");
const adAboutRoute = require("./routers/admin/about");
const adFaqRoute = require("./routers/admin/faq");
const adBlogRoute = require("./routers/admin/blog");
const adGeneralInformationRoute = require("./routers/admin/generalinformation");
const adTourRoute = require("./routers/admin/tour");
const adDestinationRoute = require("./routers/admin/destination");

app.use('/ad/homepage', adHomeRoute);
app.use('/ad/guiderdetails', adGuiderDetailsRoute);
app.use('/ad/activity', adActivityRoute);
app.use('/ad/about', adAboutRoute);
app.use('/ad/faq', adFaqRoute);
app.use('/ad/blog', adBlogRoute);
app.use('/ad/generalinformation', adGeneralInformationRoute);
app.use('/ad/tour' , adTourRoute);
app.use('/ad/destination' , adDestinationRoute);

connectdb();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} port is running`);

});