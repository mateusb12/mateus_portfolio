import {NavBar} from "./NavBar/NavBar";
import {Introduction} from "./Introduction/Introduction";
import {Skills} from "./Skills/Skills";
import {Projects} from "./Projects/Projects";
import {Contact} from "./Contact/Contact";
import {Footer} from "./Footer/Footer";
import ProjectCard from "./Projects/ProjectCard";
import CustomCarousel from "./Projects/CustomCarousel";
import VisitorTracking from "./Tracking/VisitorTracking";
import ServiceCardList from "./ServiceCardList/ServiceCardList";

export function FullLayout() {
    return (
        <>
            <VisitorTracking />
            <NavBar/>
            <div className="section shared-background w-full max-w-screen-xl px-4 flex flex-col items-center">
                <Introduction/>
                <ServiceCardList />
                <Skills/>
            </div>
            {/*<Projects/>*/}
            <CustomCarousel/>
            <Contact/>
            <Footer/>
        </>)
}