"use client"
export  function ErrorBoundary({ children }) {
    try {
      return children;
    } catch (error) {
      return <div>Error loading content. Please try again later.</div>;
    }
  }