import {NavBar} from "./NavBar";
import {Banner} from "./Banner";
import {Skills} from "./Skills";
import {Projects} from "./Projects";
import {Contact} from "./Contact";
import {Footer} from "./Footer";

export function FullLayout() {
    return (
        <>
            <NavBar/>
            <div className="section shared-background">
                <Banner/>
                <Skills/>
            </div>
            <Projects/>
            <Contact/>
            <Footer/>
        </>)
}