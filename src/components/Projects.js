import '../css/Projects.css';
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import witcher from "../assets/img/witcher_reading_book.png";
import data_analysis from "../assets/img/data_analysis.jpg";
import flight from "../assets/img/flight.jpg";
import quiz from "../assets/img/quiz.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Book Analyzer",
      description: "Transform .txt book files into social media-style graphs, similar to Instagram",
      imgUrl: witcher,
      githubUrl: "https://github.com/mateusb12/WitcherAnalysis",
    },
    {
      title: "Valorant Impact",
      description: "A tool that quantifies how much player actions can shift the odds of winning a Valorant round. By analyzing kills, weapon choices, economy and strategic moves, it reveals the real-time impact on victory chances.",
      imgUrl: data_analysis,
      githubUrl: "https://github.com/mateusb12/valorant_impact",
    },
    {
      title: "Flight Scrapper",
      description: "Powered by Kiwi Tequilla API, this project scrapes flight data from the API and displays it in a user-friendly way. The main focus is to create alerts for the user when the price of a flight drops.",
      imgUrl: flight,
      githubUrl: "https://github.com/mateusb12/TravelScrapper",
    },
    {
      title: "MCQ Quiz App",
      description: "A simple quiz app that I used for studying purposes. You can easily navigate through the questions and check your answers at the end.",
      imgUrl: quiz,
      githubUrl: "https://github.com/mateusb12/JavascriptQuizApp",
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg2,
      githubUrl: "https://github.com/mateusb12/",
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg3,
      githubUrl: "https://github.com/mateusb12/",
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
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
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
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
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
