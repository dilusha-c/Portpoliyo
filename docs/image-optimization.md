# Image Optimization Best Practices

This document provides guidelines for optimizing images in your portfolio for SEO and accessibility.

## Alt Text Guidelines

All images in your portfolio should have descriptive alt text:

```jsx
// Example of proper alt text in JSX
<img 
  src={profileImg}
  alt="Dilusha Chamika - Software Developer and AI Enthusiast in professional attire" 
  className="w-full h-full object-cover rounded-full"
/>

// For decorative images only
<img 
  src={decorativeElement}
  alt="" 
  role="presentation"
  className="decorative-element"
/>
```

## Image Optimization

1. **Compress images** before adding them to your project
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Aim for file sizes under 200KB for most images

2. **Use appropriate dimensions**
   - Don't use 2000px images when displaying at 400px
   - Consider responsive images with multiple sizes

3. **Prefer modern formats**
   - Use WebP when possible with fallbacks for older browsers

4. **Lazy load images**
   - Use loading="lazy" for images below the fold

Example:
```jsx
<img 
  src={projectImg} 
  alt="GymSync Project Interface showing equipment tracking dashboard" 
  loading="lazy" 
  width="800" 
  height="600"
  className="w-full h-auto object-contain"
/>
```

## Performance Tips

1. Use a CDN for image delivery (Vercel provides this automatically)
2. Consider implementing responsive images with `srcset`
3. Add width and height attributes to reduce layout shifts

Remember: Well-optimized images improve user experience, page load times, and SEO ranking.