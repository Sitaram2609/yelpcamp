# YelpCamp

YelpCamp is a web application that allows users to view, create, and review campgrounds. Users can register, log in, and share their experiences by adding descriptions and images of campgrounds.

## Features

- User authentication and authorization
- CRUD operations for campgrounds and reviews
- Image uploads using Cloudinary
- Responsive UI with Bootstrap
- Map integration using Mapbox
- Secure routes and data validation

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- Passport.js (Authentication)
- EJS (Templating Engine)
- Cloudinary (Image Uploads)
- Mapbox (Maps)
- Bootstrap (Styling)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/YelpCamp.git
   cd YelpCamp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the required environment variables:
   ```env
   DATABASE_URL=your_mongodb_url
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   MAPBOX_TOKEN=your_mapbox_token
   ```
4. Seed the database (optional):
   ```sh
   node seeds/index.js
   ```
5. Start the server:
   ```sh
   npm start
   ```
6. Visit the application at:
   ```
   http://localhost:3000
   ```

## Project Structure
```
YelpCamp/
│-- public/         # Static assets (CSS, JS, Images)
│-- routes/         # Express routes (campgrounds, reviews, users)
│-- models/         # Mongoose models (Campground, Review, User)
│-- views/          # EJS templates
│-- seeds/          # Database seeding scripts
│-- app.js          # Main Express application
│-- package.json    # Dependencies and scripts
│-- README.md       # Project documentation
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is open-source and available under the [MIT License](LICENSE).
