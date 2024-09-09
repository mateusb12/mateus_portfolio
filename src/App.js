import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FullLayout} from "./components/FullLayout";
import { NavBar } from "./components/NavBar";
import { Introduction } from "./components/Introduction";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import LanguageContext from './components/LanguageContext';
import {useState} from "react";
import {ProjectCard} from "./components/ProjectCard";
import NewProjectCard from "./components/NewProjectCard";
import {SkillPanel} from "./components/SkillPanel";

function App() {
    const [language, setLanguage] = useState('english');
    const [selectedFlag, setSelectedFlag] = useState('usa');
    return (
        <LanguageContext.Provider value={{selectedFlag, setSelectedFlag, language, setLanguage}}>
            <div className="App">
                <Routes>
                    <Route path="/mateus_portfolio/" element={<FullLayout/>}/>
                    <Route path="/mateus_portfolio/navbar" element={<NavBar/>}/>
                    <Route path="/mateus_portfolio/introduction" element={<Introduction/>}/>
                    <Route path="/mateus_portfolio/skills" element={<Skills/>}/>
                    <Route path="/mateus_portfolio/projects" element={<Projects/>}/>
                    <Route path="/mateus_portfolio/projectCard" element={<ProjectCard/>}/>
                    <Route path="/mateus_portfolio/contact" element={<Contact/>}/>
                    <Route path="/mateus_portfolio/footer" element={<Footer/>}/>
                    <Route path='/mateus_portfolio/newprojectcard' element={<NewProjectCard/>}/>
                    <Route path='/mateus_portfolio/skillpanel' element={<SkillPanel/>}/>
                </Routes>
            </div>
        </LanguageContext.Provider>
    );
}

export default App;
