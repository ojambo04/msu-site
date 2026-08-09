# MSU Web Application Context

This workspace contains the frontend web application for the **Mao Students' Union (MSU)**. 

When assisting with this project in the future, please keep the following context in mind:

## Architecture
- **Framework**: React.js built with Vite.
- **Routing**: `react-router-dom` is used for client-side routing.
- **Data Source**: This is a static site where content is entirely driven by Markdown files. The React app fetches these raw `.md` files dynamically using a utility (`src/utils/fetchMarkdown.js`) and renders them using `react-markdown` and `remark-gfm`. 
- **Content Repository**: The actual markdown files are managed in a separate repository (or directory `msu-content`). During local development, the markdown files are served from the `public/content` folder. In production, they may be fetched directly from a public GitHub repository.

## Design & Styling
- **Styling Method**: Tailwind CSS v4 is used for styling. Utilize Tailwind's utility classes for building UI elements. Component-specific `.css` files should be avoided unless strictly necessary.
- **Theme Colors**:
  - Primary: Navy Blue (`#003366`)
  - Accent: Red (`#cc0000`)
- **Dark/Light Mode**: The application supports dynamic theming. CSS variables (e.g., `--bg-primary`, `--text-primary`) defined in `:root` and `[data-theme='dark']` in `index.css` control the theme.
- **Aesthetics**: The design prioritizes a premium, dynamic feel. It uses modern typography (Outfit font), glassmorphism (in the Navbar), micro-animations (like hover underlines and card lifts), and smooth transitions.

## Important Pages & Routes
- `/` - Home Page
- `/about` - About, Mission, Vision, and History
- `/leadership` - Executive Council and Constituent Units
- `/notices` - Notices and Press Releases
- `/students` - Students Corner (Scholarships, Downloads)
- `/contact` - Static Contact Info and Maps (no backend forms)

## Best Practices
- Always maintain the premium aesthetic when modifying components.
- Ensure all newly created UI elements respect the established CSS variables for theming.
- If making changes to content, remind the user that the source of truth for text data is the markdown files, not the React components themselves.
- **Component Reusability**: Actively identify opportunities to extract UI patterns into reusable React components to reduce code duplication wherever applicable.
