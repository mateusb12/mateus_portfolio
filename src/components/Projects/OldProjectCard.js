import { Col } from "react-bootstrap";
import witcher from "../../assets/img/witcher_reading_book.png";

export const OldProjectCard = (
    {
        title = 'Default Title',
        description = 'Default Description',
        imgUrl = witcher,
        githubUrl = "https://github.com/mateusb12/WitcherAnalysis"
    }) => {
    return (
        <Col size={12} sm={6} md={4}>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="proj-imgbx">
                    <img src={imgUrl} alt={title} />
                    <div className="proj-txtx">
                        <h4>{title}</h4>
                        <span>{description}</span>
                    </div>
                </div>
            </a>
        </Col>
    );
};
