# Boot Screen Component for Portfolio

This component provides a sci-fi boot-up sequence that displays only on first visit to the portfolio. On subsequent visits, users will go directly to the main portfolio content.

## Features

- Shows a full-screen sci-fi boot animation on first visit only
- Uses localStorage to remember returning visitors
- Includes animated robot Lottie animation
- Features typing text and loading indicators
- Smooth transition to portfolio content with Framer Motion

## How It Works

1. On first visit, the BootScreen component appears with the robot animation
2. After 4 seconds, the boot sequence completes and the main portfolio content fades in
3. A flag is saved in localStorage to indicate the user has visited before
4. On subsequent visits, the boot screen is skipped, and the portfolio content shows immediately

## File Structure

- `src/components/BootScreen.jsx` - The main component
- `public/animations/robot-loading.json` - Lottie animation file for the robot

## Dependencies

- Framer Motion for animations
- Lottie Player for robot animation
- Tailwind CSS for styling

## Customization

You can customize the boot screen by:

1. Modifying the Lottie robot animation file
2. Changing the boot duration (currently set to 4 seconds)
3. Updating the text and colors to match your branding
4. Adjusting animations and effects in the BootScreen component

## Usage

No additional setup is required. The App.jsx file has been configured to check for first-time visitors and display the boot screen accordingly.

If you want to test the boot screen again, you can clear localStorage by running:
```javascript
localStorage.removeItem('hasVisited');
```
in the browser console and refreshing the page.
