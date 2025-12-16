# 4 APIs Project

[![Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-brightgreen)](https://webappjp.netlify.app/)

A modern web application that integrates with four different public APIs to provide various functionalities including meal recipes, cocktail recipes, Harry Potter books with character details, and bank information lookup.

## User Guide

### Home Page
- The landing page provides an overview of all available APIs
- Click on any card to navigate to the respective section

### Meal API
1. Navigate to the Meal section
2. Search for recipes by name, category, or ingredient
3. Click on any recipe to view detailed information including ingredients and instructions

### Cocktail API
1. Go to the Cocktail section
2. Search for drinks by name or ingredient
3. View cocktail details including ingredients, measurements, and preparation instructions

### Harry Potter Books & Characters
1. Access the Books section
2. Browse through the collection of Harry Potter books
3. View book details including cover image and description
4. Explore character information with the character filter
5. Click 'More' on any character to see detailed information

### Bank API
1. Navigate to the Bank section
2. Enter an IFSC code to look up bank branch details
3. View comprehensive bank information including branch address and contact details

## Features

- **Meal API**: Search and discover delicious recipes
- **Cocktail API**: Find cocktail recipes and ingredients
- **Harry Potter Books**: Explore Harry Potter books and character details
- **Bank API**: Look up bank information using IFSC code
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with React and styled with CSS

## Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Icons**: Font Awesome
- **Package Manager**: npm
- **Linting**: ESLint

## Prerequisites

- Node.js (v14 or later)
- npm (v7 or later)
- Git (for version control)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PARTH-JADAV20/four-api-project.git
   cd four-api-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

```bash
npm run dev
```
This will start the development server at `http://localhost:5173`

### Building for Production

```bash
npm run build
```
This will create an optimized production build in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── assets/          # Static assets (images, fonts, etc.)
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for the Meal API
- [TheCocktailDB](https://www.thecocktaildb.com/) for the Cocktail API
- [Open Library](https://openlibrary.org/) for the Books API
- [Razorpay IFSC](https://ifsc.razorpay.com/) for the Bank API

---

