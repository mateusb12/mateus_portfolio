import React from 'react';
import NavBar from "./NavBar/NavBar.jsx";
import {Introduction} from "./Introduction/Introduction.jsx";
import SkillCarousel from "./Skills/Skills.jsx";

const FullLayout = () => {
    return (
        <>
            {/*<VisitorTracking />*/}
            <NavBar/>
            <div className="section shared-background">
                <Introduction/>
                {/*<ServiceCardList />*/}
                <SkillCarousel/>
            </div>
            {/*/!*<Projects/>*!/*/}
            {/*<CustomCarousel/>*/}
            {/*<Contact/>*/}
            {/*<Footer/>*/}
        </>)
};

export default FullLayout;
