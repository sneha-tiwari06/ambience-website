import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Header from "./widgets/header";
import About from "./components/about";
import Projects from "./components/projects";
import Gallery from "./components/gallery";
import Testimonials from "./components/testimonials";
import Careers from "./components/careers";
import ContactUs from "./components/contact-us";
import Certifications from "./components/certifications";
import GalleryDetails from "./components/gallery-details";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   // Disable Right Click
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };

  //   // Disable all keys including DevTools, view source, etc.
  //   const handleKeyDown = (e) => {
  //     const forbiddenKeys = [
  //       "F12", // DevTools
  //       "I",
  //       "J",
  //       "C",
  //       "U",
  //       "S", // DevTools, Source, Save
  //     ];

  //     // Block Ctrl+Key and Ctrl+Shift+Key combinations
  //     if (
  //       e.ctrlKey ||
  //       e.metaKey ||
  //       e.altKey ||
  //       e.shiftKey ||
  //       forbiddenKeys.includes(e.key.toUpperCase())
  //     ) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //       return false;
  //     }

  //     // Block all keys
  //     e.preventDefault();
  //     return false;
  //   };

  //   document.addEventListener("contextmenu", handleContextMenu);
  //   window.addEventListener("keydown", handleKeyDown, true);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     window.removeEventListener("keydown", handleKeyDown, true);
  //   };
  // }, []);
  return (
    <div className="App">
      <Router basename="/ambience-react">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/project-details/:id" element={<GalleryDetails />} />
          <Route
            path="/gallery-details/:projectName"
            element={<GalleryDetails />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
