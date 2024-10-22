import {NavBar} from "./NavBar/NavBar";
import {Introduction} from "./Introduction/Introduction";
import {Skills} from "./Skills/Skills";
import {Projects} from "./Projects/Projects";
import {Contact} from "./Contact/Contact";
import {Footer} from "./Footer/Footer";
import ProjectCard from "./Projects/ProjectCard";
import CustomCarousel from "./Projects/CustomCarousel";
import VisitorTracking from "./Tracking/VisitorTracking";

export function FullLayout() {
    return (
        <>
            <VisitorTracking />
            <NavBar/>
            <div className="section shared-background">
                <Introduction/>
                <Skills/>
            </div>
            {/*<Projects/>*/}
            <CustomCarousel/>
            <Contact/>
            <Footer/>
        </>)
}