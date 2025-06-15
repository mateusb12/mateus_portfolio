import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FullLayout } from "./components/FullLayout";
import { NavBar } from "./components/NavBar/NavBar";
import { Introduction } from "./components/Introduction/Introduction";
import { Skills } from "./components/Skills/Skills";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import LanguageContext from './components/LanguageContext';
import { useState } from "react";
import { OldProjectCard } from "./components/Projects/OldProjectCard";
import ProjectCard from "./components/Projects/ProjectCard";
import { SkillPanel } from "./components/Skills/SkillPanel";
import CustomCarousel from "./components/Projects/CustomCarousel";
import ServiceCard from "./components/ServiceCard/ServiceCard";

function App() {
    const [language, setLanguage] = useState('english');
    const [selectedFlag, setSelectedFlag] = useState('usa');
    const basePath = "/mateus_portfolio";

    return (
        <LanguageContext.Provider value={{ selectedFlag, setSelectedFlag, language, setLanguage }}>
            <div className="App">
                <Routes>
                    <Route path={`${basePath}/`} element={<FullLayout />} />
                    <Route path={`${basePath}/navbar`} element={<NavBar />} />
                    <Route path={`${basePath}/service-card`} element={<ServiceCard />} />
                    <Route path={`${basePath}/introduction`} element={<Introduction />} />
                    <Route path={`${basePath}/skills`} element={<Skills />} />
                    <Route path={`${basePath}/customcarousel`} element={<CustomCarousel />} />
                    <Route path={`${basePath}/projects`} element={<Projects />} />
                    <Route path={`${basePath}/oldprojectCard`} element={<OldProjectCard />} />
                    <Route path={`${basePath}/contact`} element={<Contact />} />
                    <Route path={`${basePath}/footer`} element={<Footer />} />
                    <Route path={`${basePath}/skillpanel`} element={<SkillPanel />} />
                    <Route path={`${basePath}/newprojectcard`} element={<ProjectCard projectId="valorant-impact" isActive={false} />} />
                </Routes>
            </div>
        </LanguageContext.Provider>
    );
}

export default App;
