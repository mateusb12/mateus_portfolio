import React from 'react';
import NavBar from "./NavBar/NavBar.jsx";
import {Introduction} from "./Introduction/Introduction.jsx";
import SkillsSection from "./Skills/SkillsSection.jsx";
import SkillCarousel from "./Skills/SkillsCarousel.jsx";
import {ServiceCardSection} from "./Services/Services.jsx";
import Experience from "./Experience/Experience.jsx";
import Contact from "./Contact/Contact.jsx";
import StarsCanvas from "./Contact/StarsCanvas.jsx";

const FullLayout = () => {
    return (
        <>
            {/*<VisitorTracking />*/}
            <NavBar/>
            <div className="section shared-background">
                <Introduction/>
                {/*<ServiceCardList />*/}
                <SkillsSection/>
                <ServiceCardSection/>
            </div>
            <Experience />
            <div className="relative z-0">
                <Contact />
                <StarsCanvas />
            </div>
            {/*/!*<Projects/>*!/*/}
            {/*<CustomCarousel/>*/}
            {/*<Contact/>*/}
            {/*<Footer/>*/}
        </>)
};

export default FullLayout;
