import React, {useEffect, useState} from 'react';
import NavBar from "./NavBar/NavBar.jsx";
import {Introduction} from "./Introduction/Introduction.jsx";
import SkillsSection from "./Skills/SkillsSection.jsx";
import {ServiceCardSection} from "./Services/Services.jsx";
import Experience from "./Experience/Experience.jsx";
import Contact from "./Contact/Contact.jsx";
import StarsCanvas from "./Contact/StarsCanvas.jsx";
import Projects from "./Projects/Projects.jsx";
import HardcodedCarousel from "./Skills/NewCarousel.jsx";
import LanguageContext from './LanguageContext';
import CaseStudies from "./CaseStudies/CaseStudies.jsx";

const FullLayout = () => {
    const [language, setLanguage] = useState('english');
    const [selectedFlag, setSelectedFlag] = useState('usa');

    const contextValue = {
        language,
        setLanguage,
        selectedFlag,
        setSelectedFlag
    };

    useEffect(() => {
        const fetchLocationAndSetLanguage = async () => {
            try {
                const response = await fetch('http://ip-api.com/json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // If the API response indicates the user is in Brazil...
                if (data.countryCode === 'BR') {
                    // ...update the state to Portuguese.
                    setLanguage('portuguese');
                    setSelectedFlag('brazil');
                }
                // Otherwise, the default state ('english'/'usa') remains.
            } catch (error) {
                console.error("Could not fetch user location, defaulting to English:", error);
            }
        };

        fetchLocationAndSetLanguage();
    }, []); // The empty dependency array [] ensures this effect runs only once.

    return (
        <LanguageContext.Provider value={contextValue}>
            <>
                {/*<VisitorTracking />*/}
                <NavBar/>
                <div className="section shared-background">
                    <Introduction/>
                    {/*<SkillsSection/>*/}
                    <HardcodedCarousel/>
                    <ServiceCardSection/>
                </div>
                <div className="relative z-0">
                    <Experience />
                    <Projects />
                    <CaseStudies />
                    <Contact />
                    <StarsCanvas />
                </div>
                {/*/!*<Projects/>*!/*/}
                {/*<CustomCarousel/>*/}
                {/*<Contact/>*/}
                {/*<Footer/>*/}
            </>
        </LanguageContext.Provider>
    )
};

export default FullLayout;
