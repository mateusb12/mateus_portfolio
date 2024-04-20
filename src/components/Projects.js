import '../css/Projects.css';
import {Container, Row, Col, Tab, Nav} from "react-bootstrap";
import {ProjectCard} from "./ProjectCard";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import witcher from "../assets/img/witcher_reading_book.png";
import data_analysis from "../assets/img/data_analysis.jpg";
import flight from "../assets/img/flight.jpg";
import quiz from "../assets/img/quiz.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import LanguageContext from './LanguageContext';
import {useContext} from "react";

export const Projects = () => {

    const {selectedFlag, setSelectedFlag} = useContext(LanguageContext);
    const languageFile = require('../data/projects.json');
    const languageKey = selectedFlag === 'usa' ? 'english' : 'portuguese';
    const projectsData = languageFile[languageKey];

    const projectMetaData = [
        {
            imgUrl: witcher,
            githubUrl: "https://github.com/mateusb12/WitcherAnalysis"
        },
        {
            imgUrl: data_analysis,
            githubUrl: "https://github.com/mateusb12/valorant_impact"
        },
        {
            imgUrl: flight,
            githubUrl: "https://github.com/mateusb12/TravelScrapper"
        },
        {
            imgUrl: quiz,
            githubUrl: "https://github.com/mateusb12/JavascriptQuizApp"
        }
    ]

    const projects = projectsData.projectList.map((project, index) => {
        const metaData = projectMetaData[index]; // Get the corresponding metaData based on index
        return {
            title: project.title,
            description: project.description,
            imgUrl: metaData.imgUrl, // Assign the image URL from metaData
            githubUrl: metaData.githubUrl, // Assign the GitHub URL from metaData
        };
    });

    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col size={12}>
                        <TrackVisibility>
                            {({isVisible}) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <h2>{projectsData.title}</h2>
                                    <p>{projectsData.description}</p>
                                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                                        <Nav variant="pills"
                                             className="nav-pills mb-5 justify-content-center align-items-center"
                                             id="pills-tab">
                                            <Nav.Item>
                                                <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="third">Tab 3</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content id="slideInUp"
                                                     className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                                            <Tab.Pane eventKey="first">
                                                <Row>
                                                    {
                                                        projects.map((project, index) => {
                                                            return (
                                                                <ProjectCard
                                                                    key={index}
                                                                    {...project}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </Row>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="section">
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam,
                                                    quod neque provident velit, rem explicabo excepturi id illo
                                                    molestiae blanditiis, eligendi dicta officiis asperiores delectus
                                                    quasi inventore debitis quo.</p>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam,
                                                    quod neque provident velit, rem explicabo excepturi id illo
                                                    molestiae blanditiis, eligendi dicta officiis asperiores delectus
                                                    quasi inventore debitis quo.</p>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2} alt="background"></img>
        </section>
    )
}
