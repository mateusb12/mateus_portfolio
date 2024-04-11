import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/mateus_portfolio" element={
                    <>
                        <NavBar/>
                        <div className="section shared-background">
                            <Banner/>
                            <Skills/>
                        </div>
                        <Projects/>
                        <Contact/>
                        <Footer/>
                    </>
                }/>
                <Route path="/navbar" element={<NavBar/>} />
                <Route path="/banner" element={<Banner/>} />
                <Route path="/skills" element={<Skills/>} />
                <Route path="/projects" element={<Projects/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/footer" element={<Footer/>} />
            </Routes>
        </div>
    );
}

export default App;
