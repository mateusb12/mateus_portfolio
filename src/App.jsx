import {useState} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import LanguageContext from './components/LanguageContext';
import FullLayout from "./components/FullLayout.jsx";
import ProjectsPage from "./components/Projects/ProjectsPage.jsx";

function App() {
    const [language, setLanguage] = useState('english');
    const [selectedFlag, setSelectedFlag] = useState('usa');

    return (
        <LanguageContext.Provider value={{ selectedFlag, setSelectedFlag, language, setLanguage }}>
            <div className="App">
                <Routes>
                    <Route path={`/`} element={<FullLayout />} />
                    <Route path={`/projects`} element={<ProjectsPage />} />
                    {/*<Route path={`${basePath}/navbar`} element={<NavBar />} />*/}
                </Routes>
            </div>
        </LanguageContext.Provider>
    )
}

export default App
