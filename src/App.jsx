import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LanguageContext from './components/LanguageContext';
import { Routes, Route } from "react-router-dom";
import FullLayout from "./components/FullLayout.jsx";

function App() {
    const [language, setLanguage] = useState('english');
    const [selectedFlag, setSelectedFlag] = useState('usa');

    return (
        <LanguageContext.Provider value={{ selectedFlag, setSelectedFlag, language, setLanguage }}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<FullLayout />} />
                    <Route path="*" element={
                        <div style={{
                            color: 'white',
                            fontSize: '2rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                            backgroundColor: '#1a1a1a'
                        }}>
                            404 - Route not matched
                        </div>
                    } />
                </Routes>
            </div>
        </LanguageContext.Provider>
    );
}

export default App;
