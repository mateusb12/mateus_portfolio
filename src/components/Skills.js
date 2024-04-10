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

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Skills</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br></br> Lorem Ipsum has been the industry's standard dummy text.</p>
                        <Carousel responsive={responsive} infinite={false} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={server} alt="Image" />
                                <h5>Backend Development</h5>
                            </div>
                            <div className="item">
                                <img src={api} alt="Image" />
                                <h5>APIs</h5>
                            </div>
                            <div className="item">
                                <img src={database} alt="Image" />
                                <h5>Databases</h5>
                            </div>
                            <div className="item">
                                <img src={cloud} alt="Image" />
                                <h5>DevOps, Cloud, CI/CD</h5>
                            </div>
                            <div className="item">
                                <img src={lock} alt="Image" />
                                <h5>Security</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
