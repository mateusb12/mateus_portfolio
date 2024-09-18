import {NavBar} from "./NavBar/NavBar";
import {Introduction} from "./Introduction/Introduction";
import {Skills} from "./Skills/Skills";
import {Projects} from "./Projects/Projects";
import {Contact} from "./Contact/Contact";
import {Footer} from "./Footer/Footer";
import ProjectCard from "./Projects/ProjectCard";
import ProjectCarousel from "./Projects/ProjectCarousel";

export function FullLayout() {
    return (
        <>
            <NavBar/>
            <div className="section shared-background">
                <Introduction/>
                <Skills/>
            </div>
            <Projects/>
            <ProjectCard/>
            <ProjectCarousel/>
            <Contact/>
            <Footer/>
        </>)
}