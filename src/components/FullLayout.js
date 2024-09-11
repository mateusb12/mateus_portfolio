import {NavBar} from "./NavBar";
import {Introduction} from "./Introduction";
import {Skills} from "./Skills";
import {Projects} from "./Projects";
import {Contact} from "./Contact";
import {Footer} from "./Footer";
import ProjectCard from "./ProjectCard";

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
            <Contact/>
            <Footer/>
        </>)
}