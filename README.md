### ModelHaven Frontend

ModelHaven is a dynamic AI powered web platform that empowers users to discover and utilize AI models and tools tailored to their creative and technical needs. 
This is the frontend repository built with React to deliver an intuitive, futuristic, and responsive user experience.

## Features

Interactive Chat Interface: A modern chat system allowing users to describe their projects and receive curated AI tools and ML models
Search and Discovery: Easily find AI models and tools categorized by their purpose (e.g., animation, coding, video generation, Image generation).
Clickable Cards: Visually appealing model/tool cards with detailed information and external links.
Multicolor Theme: A futuristic color palette inspired by cyberpunk design principles.
Navigation Bar: Organized tabs for effortless browsing and quick access to models, favorite models, settings, and more.
Tech Stack

## Frontend Framework: React
Styling: CSS Modules and custom themes with cyberpunk-inspired designs.
API Integration: Utilizing groq api with llama-3.3-70b-versatile as the LLM for recommendations, Serper API as the search tool being used by the LLM. 
Getting Started

## Prerequisites
# Node.js (v16 or higher)
```npm or yarn package manager```
# Installation
Clone the repository:
``` git clone https://github.com/dom-inic/modelhaven.git ```
cd modelhaven-frontend
Install dependencies:
``` npm install ```
# or
``` yarn install```
Start the development server:
``` npm run dev```
# or
``` yarn run dev  ```
Open the app in your browser at http://localhost:3000.
Folder Structure

``` src/
│
├── components/         # Reusable UI components
├── pages/              # Main page components
├── contexts/           # Contexts
├── services/           # services
├── types/              # types
└── App.tsx             # Main app component
```
# Future Enhancements
AI trends finder - track and share AI trends as they come from popular X accounts, Huggingface, kaggle e.t.c
Personalization features for saved tools and user preferences.
# License

This project is licensed under the MIT License. See the LICENSE file for details.

# Contributions

We welcome contributions! Please submit a pull request or open an issue if you have ideas or find bugs.
