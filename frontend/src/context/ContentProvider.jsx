import React, { useState, useEffect} from "react";
import { ContentContext } from "./ContentContext";
import axios from "axios";

export default function ContentProvider({ children }) {
  // const apiBase = import.meta.env.VITE_API_BASE_URL;
  const apiBase = "http://localhost:5000/content";

  // Define all pages and their endpoints
  const pages = [
    "home",
    "products",
    "about",
    "blog",
    "contact",
    "review",
    "team",
    "order",
    "privacy",
    "faq",
  ];

  // Initialize content state dynamically
  const [content, setContent] = useState(
    pages.reduce((acc, page) => ({ ...acc, [page]: null }), {})
  );

  // Initialize loading state dynamically
  const [loading, setLoading] = useState(
    pages.reduce((acc, page) => ({ ...acc, [page]: false }), {})
  );

  // Load the home page immediately
  useEffect(() => {
    loadPageContent("home");
  }, []);

  // Generic lazy loader for any page
  const loadPageContent = async (page) => {
    if (!pages.includes(page)) {
      console.warn(`No endpoint defined for page: ${page}`);
      return;
    }

    if (content[page]) return; // Already loaded

    setLoading((prev) => ({ ...prev, [page]: true }));

    try {
      const res = await axios.get(`${apiBase}/${page}`);
      setContent((prev) => ({ ...prev, [page]: res.data }));
    } catch (err) {
      console.error(`Error loading ${page}:`, err);
    } finally {
      setLoading((prev) => ({ ...prev, [page]: false }));
    }
  };

  // Build context value dynamically
  const contextValue = {
    ...pages.reduce((acc, page) => {
      acc[`${page}Content`] = content[page];
      acc[`loading${page.charAt(0).toUpperCase() + page.slice(1)}`] =
        loading[page];
      return acc;
    }, {}),
    loadPageContent,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}
