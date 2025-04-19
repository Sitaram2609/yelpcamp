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


## IMAGES:


## Homepage
![Homepage](https://github.com/user-attachments/assets/f51c2259-61f1-4096-a1e1-2ba4af0b3de1)

## Login and Register
![Login and Register](https://github.com/user-attachments/assets/1e928d81-1a0d-4fdf-b8c6-2fe771204990)

## Dashboard / Main Page
![Main Page](https://github.com/user-attachments/assets/5ca1a5e2-1765-4d63-8248-d687e340e070)

## Show Page
![Show Page](https://github.com/user-attachments/assets/c19d87ef-ca88-46f0-b26c-b8a95790dcfa)

## Campground Details
![Campground Details](https://github.com/user-attachments/assets/7bc24cad-d5e9-4985-adb1-041f0de3789e)

## Add Campground
![Add Campground](https://github.com/user-attachments/assets/f875b491-2917-43de-a291-0fd7673bdb2d)

## Edit Campground
![Edit Campground](https://github.com/user-attachments/assets/50f1fd93-f9a5-48ed-a7ed-709aeca3937b)


## Live Demo
Try the app live:https://yelpcamp-asd9.onrender.com/campgrounds


