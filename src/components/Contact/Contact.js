import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import LanguageContext from "../LanguageContext";

export const Contact = () => {
  const { selectedFlag, setSelectedFlag } = useContext(LanguageContext);

  // Embedded language content
  const languageContent = {
    english: {
      title: "Get in Touch",
      nameField: "First Name",
      surnameField: "Last Name",
      emailField: "Email address",
      phoneField: "Phone Number",
      messageField: "Message"
    },
    portuguese: {
      title: "Entre em Contato",
      nameField: "Nome",
      surnameField: "Sobrenome",
      emailField: "Email",
      phoneField: "Telefone",
      messageField: "Mensagem"
    }
  };

  const languageKey = selectedFlag === 'usa' ? 'english' : 'portuguese';
  const textData = languageContent[languageKey];
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code === 200) {
      setStatus({ success: true, message: 'Message sent successfully'});
    } else {
      setStatus({ success: false, message: 'Something went wrong, please try again later.'});
    }
  };

  return (
      <section className="contact" id="connect">
        <Container>
          <Row className="align-items-center">
            <Col size={12} md={6} className="mx-auto">
              <TrackVisibility>
                {({ isVisible }) =>
                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                      <h2>{textData.title}</h2>
                      <form onSubmit={handleSubmit}>
                        <Row>
                          <Col size={12} sm={6} className="px-1">
                            <input type="text" value={formDetails.firstName} placeholder={textData.nameField} onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                          </Col>
                          <Col size={12} sm={6} className="px-1">
                            <input type="text" value={formDetails.lastName} placeholder={textData.surnameField} onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                          </Col>
                          <Col size={12} sm={6} className="px-1">
                            <input type="email" value={formDetails.email} placeholder={textData.emailField} onChange={(e) => onFormUpdate('email', e.target.value)} />
                          </Col>
                          <Col size={12} sm={6} className="px-1">
                            <input type="tel" value={formDetails.phone} placeholder={textData.phoneField} onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                          </Col>
                          <Col size={12} className="px-1">
                            <textarea rows="6" value={formDetails.message} placeholder={textData.messageField} onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                            <button type="submit"><span>{buttonText}</span></button>
                          </Col>
                          {
                              status.message &&
                              <Col>
                                <p className={status.success ? "success" : "danger"}>{status.message}</p>
                              </Col>
                          }
                        </Row>
                      </form>
                    </div>}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
  )
}