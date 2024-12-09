### ModelHaven Frontend

ModelHaven is a dynamic web platform that empowers users to discover and utilize AI models and tools tailored to their creative and technical needs. This is the frontend repository built with React to deliver an intuitive, futuristic, and responsive user experience.

## Features

Interactive Chat Interface: A modern chat system allowing users to describe their projects and receive curated AI tools.
Search and Discovery: Easily find AI models and tools categorized by their purpose (e.g., animation, coding, video generation).
Clickable Cards: Visually appealing model/tool cards with detailed information and external links.
Multicolor Theme: A futuristic color palette inspired by cyberpunk design principles.
Navigation Bar: Organized tabs for effortless browsing and quick access to categories, saved tools, settings, and more.
Tech Stack

## Frontend Framework: React
Styling: CSS Modules and custom themes with cyberpunk-inspired designs.
State Management: Redux Toolkit for managing user interactions and data flow.
API Integration: Built to connect with a backend for model recommendations (e.g., via REST or GraphQL).
Testing: Jest and React Testing Library for unit and integration tests.
Getting Started

## Prerequisites
# Node.js (v16 or higher)
```npm or yarn package manager```
# Installation
Clone the repository:
``` git clone https://github.com/yourusername/modelhaven-frontend.git ```
cd modelhaven-frontend
Install dependencies:
``` npm install ```
# or
``` yarn install```
Start the development server:
``` npm start```
# or
``` yarn start ```
Open the app in your browser at http://localhost:3000.
Folder Structure

``` src/
│
├── components/         # Reusable UI components
├── pages/              # Main page components
├── assets/             # Static assets (images, icons, etc.)
├── styles/             # CSS modules for styling
├── store/              # Redux store and slices
├── utils/              # Utility functions
├── services/           # API calls and integrations
└── App.js              # Main app component
```
# Future Enhancements

Integration with a backend service for live AI recommendations.
Personalization features for saved tools and user preferences.
Support for multiple languages.
Dark mode toggle (default is dark).
# License

This project is licensed under the MIT License. See the LICENSE file for details.

# Contributions

We welcome contributions! Please submit a pull request or open an issue if you have ideas or find bugs.
