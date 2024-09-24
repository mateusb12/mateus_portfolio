import {useContext, useEffect, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import LanguageContext from "../LanguageContext";
import { FaWhatsapp } from 'react-icons/fa';

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
      messageField: "Message",
      messageContent: "Hello, Mateus. I am interested in your projects. I am looking forward to work with you."
    },
    portuguese: {
      title: "Entre em Contato",
      nameField: "Nome",
      surnameField: "Sobrenome",
      emailField: "Email",
      phoneField: "Telefone",
      messageField: "Mensagem",
      messageContent: "Olá, Mateus. Estou interessado nos seus projetos. Estou à disposição para trabalhar com você."
    }
  };

  const languageKey = selectedFlag === 'usa' ? 'english' : 'portuguese';
  const textData = languageContent[languageKey];
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: textData.messageContent
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

  // UseEffect to update the message field when the language changes
  useEffect(() => {
    setFormDetails(prevDetails => ({
      ...prevDetails,
      message: textData.messageContent // Update the message field based on language
    }));
  }, [selectedFlag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    // Replace 'YOUR_PHONE_NUMBER' with your actual phone number in international format without '+' or '00'
    const phoneNumber = '5585999171902'; // e.g., '1234567890'

    // Construct the message
    const message = formDetails.message;

    // Encode the message for use in a URL
    const encodedMessage = encodeURIComponent(message);

    // Construct the WhatsApp Click-to-Chat URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp Web in a new tab
    window.open(whatsappURL, '_blank');

    // Reset the button text
    setButtonText("Send");

    // Optionally, reset the form
    setFormDetails(formInitialDetails);

    // Optionally, set a status message
    setStatus({ success: true, message: 'WhatsApp is opening...' });
  };

  return (
      <section className="contact" id="connect">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mx-auto">
              <TrackVisibility>
                {({ isVisible }) =>
                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                      <h2>{textData.title}</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          {/*<div className="col-12 col-sm-6 px-1">*/}
                          {/*  <input type="text" value={formDetails.firstName} placeholder={textData.nameField} onChange={(e) => onFormUpdate('firstName', e.target.value)} />*/}
                          {/*</div>*/}
                          {/*<div className="col-12 col-sm-6 px-1">*/}
                          {/*  <input type="text" value={formDetails.lastName} placeholder={textData.surnameField} onChange={(e) => onFormUpdate('lastName', e.target.value)}/>*/}
                          {/*</div>*/}
                          {/*<div className="col-12 col-sm-6 px-1">*/}
                          {/*  <input type="email" value={formDetails.email} placeholder={textData.emailField} onChange={(e) => onFormUpdate('email', e.target.value)} />*/}
                          {/*</div>*/}
                          {/*<div className="col-12 col-sm-6 px-1">*/}
                          {/*  <input type="tel" value={formDetails.phone} placeholder={textData.phoneField} onChange={(e) => onFormUpdate('phone', e.target.value)}/>*/}
                          {/*</div>*/}
                          <div className="col-12 px-1">
                            <textarea rows="6" value={formDetails.message} placeholder={textData.messageField} onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                            <button type="submit" className="whatsapp-button">
                              <FaWhatsapp style={{ marginRight: '8px', width: "1.5em", height: "1.5em"}} />
                              <span>{buttonText}</span>
                            </button>
                          </div>
                          {
                              status.message &&
                              <div className="col">
                                <p className={status.success ? "success" : "danger"}>{status.message}</p>
                              </div>
                          }
                        </div>
                      </form>
                    </div>}
              </TrackVisibility>
            </div>
          </div>
        </div>
      </section>
  )
}