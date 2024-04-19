import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FullLayout} from "./components/FullLayout";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import {useEffect, useState} from "react";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/mateus_portfolio/" element={<FullLayout/>} />
                <Route path="/mateus_portfolio/navbar" element={<NavBar/>} />
                <Route path="/mateus_portfolio/banner" element={<Banner/>} />
                <Route path="/mateus_portfolio/skills" element={<Skills/>} />
                <Route path="/mateus_portfolio/projects" element={<Projects/>} />
                <Route path="/mateus_portfolio/contact" element={<Contact/>} />
                <Route path="/mateus_portfolio/footer" element={<Footer/>} />
            </Routes>
        </div>
    );
}

export default App;
