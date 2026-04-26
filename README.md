# Freelancer Portfolio Website

A modern, responsive freelancer portfolio website built with HTML5, CSS3, and Vanilla JavaScript. Features include dark mode toggle, smooth animations, and a contact form.

## ✨ Features

- 🌙 **Dark Mode Toggle** - Switch between light and dark themes with persistent storage
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop devices
- ⚡ **Lightweight** - No frameworks or build tools required
- 🎨 **Modern Design** - Beautiful UI with smooth animations and transitions
- 🔍 **SEO Optimized** - Meta tags and semantic HTML for better search rankings
- 📧 **Contact Form** - Ready to integrate with Formspree or your preferred service
- ♿ **Accessible** - WCAG compliant with proper ARIA labels

## 📁 Project Structure

```
TESTWEB/
├── index.html                 # Homepage
├── pages/
│   ├── about.html            # About/bio page
│   ├── projects.html         # Portfolio showcase
│   ├── skills.html           # Skills and expertise
│   └── contact.html          # Contact form
├── css/
│   └── styles.css            # Main stylesheet with dark mode support
├── js/
│   └── main.js               # JavaScript for interactivity
├── assets/                   # Images, files, and media
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🚀 Getting Started

### Option 1: Using GitHub Pages (Recommended)

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose `main` branch as source
   - Save

3. **Access Your Site**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`
   - Or with custom domain at: `https://yourportfolio.com`

### Option 2: Local Development

1. **Open index.html in your browser**
   - Right-click `index.html` → Open with → Browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     # Using Python 2
     python -m SimpleHTTPServer 8000
     ```

2. **Edit files with your preferred editor**
   - Update content in HTML files
   - Modify styling in `css/styles.css`
   - Add functionality in `js/main.js`

## 🎨 Customization

### Update Your Information

1. **index.html** - Edit "Welcome to My Portfolio" section with your intro
2. **pages/about.html** - Add your bio, experience, and education
3. **pages/projects.html** - Add your project details and links
4. **pages/skills.html** - List your skills and technologies
5. **pages/contact.html** - Update contact information
6. **All pages** - Replace `[Your Name]` placeholders

### Add Your Images

1. Create images for your profile and projects
2. Save them to the `assets/` folder
3. Update image paths in HTML files
   ```html
   <img src="assets/your-image.jpg" alt="Description">
   ```

### Customize Colors

Edit CSS variables in `css/styles.css`:
```css
:root {
  --accent: #3498db;           /* Primary color */
  --accent-dark: #2980b9;      /* Darker shade */
  --bg-primary: #ffffff;       /* Light background */
  --text-primary: #1a1a1a;     /* Light text color */
}
```

### Setup Contact Form

Choose one of these options:

**Option 1: Formspree (Recommended)**
1. Go to [formspree.io](https://formspree.io)
2. Sign up and create a new form
3. Update the form action in `pages/contact.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

**Option 2: Netlify Forms**
- Deploy to Netlify and enable Netlify Forms
- Forms will automatically work

**Option 3: EmailJS**
- Sign up at [emailjs.com](https://www.emailjs.com)
- Integrate client-side form submission

## 🌐 Deploy to Production

### With GitHub Pages (Free)
Already set up above - just push to your repo!

### With Vercel (Free)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel auto-deploys on every push

### With Netlify (Free)
1. Push code to GitHub
2. Go to [netlify.com](https://www.netlify.com)
3. Connect your GitHub repository
4. Select build settings and deploy

## 🎯 Best Practices

- ✅ Add high-quality project images and screenshots
- ✅ Write compelling project descriptions
- ✅ Keep content up-to-date
- ✅ Test on multiple devices and browsers
- ✅ Use descriptive alt text for images
- ✅ Optimize images for web (use tools like TinyPNG)
- ✅ Monitor page performance (Lighthouse)
- ✅ Update resume/CV link in footer
- ✅ Add your actual social media links

## 📊 Performance Tips

- Use compressed images (< 100KB per image)
- Lazy load images if you have many
- Minify CSS and JS for production
- Enable gzip compression on your server
- Use a CDN for faster delivery
- Test with Lighthouse in Chrome DevTools

## 🔍 SEO Optimization

- ✅ Meta descriptions are already added
- ✅ Open Graph tags for social sharing
- ✅ Semantic HTML structure
- ✅ Mobile-friendly responsive design
- ✅ Fast loading times
- ✅ Accessible navigation

**Additional SEO:**
1. Create a `sitemap.xml`
2. Submit to Google Search Console
3. Add structured data (JSON-LD)
4. Keep content fresh and updated

## 🐛 Troubleshooting

**Dark mode not persisting**
- Check if localStorage is enabled in browser
- Clear browser cache

**Images not showing**
- Verify image paths are correct
- Check if images exist in `assets/` folder
- Use absolute paths if relative paths fail

**Contact form not working**
- Verify Formspree/EmailJS integration
- Check browser console for errors
- Ensure email addresses are correct

**Navigation links broken**
- Verify file paths are correct
- Check for typos in `href` attributes
- Use absolute paths if relative paths fail

## 📱 Mobile Optimization

The site is mobile-first and fully responsive. Test on different breakpoints:
- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px+

## 💡 Next Steps

1. ✅ Customize all content with your information
2. ✅ Add your images to the `assets/` folder
3. ✅ Set up contact form integration
4. ✅ Update social media links
5. ✅ Deploy to GitHub Pages or preferred platform
6. ✅ Set up custom domain (optional)
7. ✅ Submit to search engines
8. ✅ Monitor analytics and performance

## 📝 License

This template is provided as-is for personal use. Feel free to modify and customize it for your portfolio.

## 🤝 Support

For questions or issues:
1. Check the Troubleshooting section above
2. Review the code comments
3. Test in different browsers
4. Check browser console for errors

---

**Happy building! 🚀 Your portfolio is now ready to showcase your amazing work!**
