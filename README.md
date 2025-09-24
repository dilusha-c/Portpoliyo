# Portpoliyo - Personal Portfolio Website

A sleek, responsive portfolio website built with React and Tailwind CSS.

## Features

- Modern, responsive design
- Dark theme optimized for readability
- Smooth scrolling navigation
- Projects showcase
- Contact form
- Mobile-friendly interface

## Technologies Used

- React
- Tailwind CSS
- Vite (for fast development)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. **Set up environment variables** (see Environment Setup below)
4. Start development server: `npm run dev`
5. Build for production: `npm run build`

## Environment Setup

This project uses Cloudinary for image hosting and EmailJS for contact form functionality. To set up your environment:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Get your Cloudinary credentials from [Cloudinary Console](https://cloudinary.com/console)

3. Get your EmailJS credentials from [EmailJS Dashboard](https://www.emailjs.com/)

4. Update the `.env` file with your actual values:
   ```
   # Cloudinary Configuration
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # EmailJS Configuration
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

**⚠️ Security Note:** Never commit your `.env` file to version control. It contains sensitive API credentials.

## Customization

To customize this portfolio for your own use:

1. Update the personal information in App.jsx
2. Replace project details with your own work
3. Add your own photos and assets
4. Update contact information and social links
5. Customize the color scheme by modifying the Tailwind classes

## License

This project is open source and available under the MIT License.
