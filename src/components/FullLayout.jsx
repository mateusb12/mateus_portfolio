import React from 'react';
import NavBar from "./NavBar/NavBar.jsx";
import {Introduction} from "./Introduction/Introduction.jsx";
import SkillsSection from "./Skills/SkillsSection.jsx";
import SkillCarousel from "./Skills/SkillsCarousel.jsx";
import {ServiceCardSection} from "./Services/Services.jsx";

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
            {/*/!*<Projects/>*!/*/}
            {/*<CustomCarousel/>*/}
            {/*<Contact/>*/}
            {/*<Footer/>*/}
        </>)
};

export default FullLayout;
