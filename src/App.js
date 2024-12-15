import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Header from './widgets/header';
import './App.css';
import Footer from './widgets/footer';
import About from './components/about';
import Projects from './components/projects';
import Gallery from './components/gallery';
import Testimonials from './components/testimonials';
import Careers from './components/careers';
import ContactUs from './components/contact-us';
import Certifications from './components/certifications';
import GalleryDetails from './components/gallery-details';
function App() {
  return (
    <div className="App">
      <Router basename='/ambience-react'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/certifications' element={<Certifications />} />
          <Route path='/testimonials' element={<Testimonials />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/project-details/:id' element={<GalleryDetails />} />
          <Route path="/gallery-details/:projectName" element={<GalleryDetails />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
