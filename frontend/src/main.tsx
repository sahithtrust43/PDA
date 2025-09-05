// Import necessary libraries and components.
import { createRoot } from 'react-dom/client'
import App from './App.tsx' // Main application component.
import './index.css' // Main stylesheet.

// Create a root element and render the App component into it.
// The '!' after document.getElementById("root") is a non-null assertion operator,
// which tells TypeScript that the element will not be null.
createRoot(document.getElementById("root")!).render(<App />);
