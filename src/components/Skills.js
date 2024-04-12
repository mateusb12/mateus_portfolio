import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/moon-bg2.jpg"
import server from "../assets/img//skills_icons/server.png";
import api from "../assets/img//skills_icons/api.png";
import database from "../assets/img//skills_icons/database.png";
import cloud from "../assets/img//skills_icons/cloud.png";
import lock from "../assets/img//skills_icons/lock.png";
import python from "../assets/img//skills_icons/python.png";
import javascript from "../assets/img//skills_icons/javascript.png";
import csharp from "../assets/img//skills_icons/csharp.png";
import java from "../assets/img//skills_icons/java.png";
import html from "../assets/img//skills_icons/html.png";
import css from "../assets/img//skills_icons/css.png";
import git from "../assets/img//skills_icons/git.png";
import flask from "../assets/img//skills_icons/flask.png";
import _react from "../assets/img//skills_icons/react.png";
import postgres from "../assets/img//skills_icons/postgres.png";
import docker from "../assets/img//skills_icons/docker.png";
import jwt from "../assets/img//skills_icons/jwt.png";

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

    const skillsData = [
        { src: server, title: "Backend Development" },
        { src: api, title: "APIs" },
        { src: database, title: "Databases" },
        { src: cloud, title: "DevOps, Cloud, CI/CD" },
        { src: lock, title: "Security" },
    ];

    const basicTechnologies = [
        { src: python, title: "Python" },
        { src: javascript, title: "Javascript" },
        { src: csharp, title: "C#" },
        { src: java, title: "Java" },
        { src: html, title: "HTML" },
        { src: css, title: "CSS" },
    ];

    const frameworks = [
        { src: git, title: "GIT" },
        { src: flask, title: "Flask" },
        { src: _react, title: "React" },
        { src: jwt, title: "JWT" },
        { src: postgres, title: "Postgres" },
        { src: docker, title: "Docker" }
    ];

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Key Skills</h2>
                        <p>Core competencies in software development</p>
                        <Carousel responsive={responsive} infinite={false}
                                  className="owl-carousel owl-theme skill-slider">
                            {skillsData.map((skill, index) => (
                                <div className="item" key={index}>
                                    <img src={skill.src} alt={skill.title}/>
                                    <h5>{skill.title}</h5>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className="skill-bx wow zoomIn">
                        <h2>Programming Foundations</h2>
                        <p>Essential programming languages that serves as foundations for using the frameworks</p>
                        <Carousel responsive={responsive} infinite={false}
                                  className="owl-carousel owl-theme skill-slider">
                            {basicTechnologies.map((skill, index) => (
                                <div className="item" key={index}>
                                    <img src={skill.src} alt={skill.title}/>
                                    <h5>{skill.title}</h5>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className="skill-bx wow zoomIn">
                        <h2>Technology Stack</h2>
                        <p>Main tools for modern development</p>
                        <Carousel responsive={responsive} infinite={false}
                                  className="owl-carousel owl-theme skill-slider">
                            {frameworks.map((skill, index) => (
                                <div className="item" key={index}>
                                    <img src={skill.src} alt={skill.title}/>
                                    <h5>{skill.title}</h5>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
