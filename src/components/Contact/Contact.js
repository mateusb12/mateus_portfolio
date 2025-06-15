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
      sendButton: "Send",
      nameField: "First Name",
      surnameField: "Last Name",
      emailField: "Email address",
      phoneField: "Phone Number",
      messageField: "Message",
      messageContent: "Hello, Mateus. I am interested in your projects. I am looking forward to work with you."
    },
    portuguese: {
      title: "Entre em Contato",
      sendButton: "Enviar",
      nameField: "Nome",
      surnameField: "Sobrenome",
      emailField: "Email",
      phoneField: "Telefone",
      messageField: "Mensagem",
      messageContent: "Olá, Mateus. Tenho interesse no seu trabalho e gostaria de saber mais sobre possíveis parcerias"
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
    setButtonText(textData.sendButton);
  }, [selectedFlag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText(textData.sendButton + "...");

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
    setButtonText(textData.sendButton);

    // Optionally, reset the form
    setFormDetails(formInitialDetails);

    // Optionally, set a status message
    setStatus({ success: true, message: 'WhatsApp is opening...' });
  };

  return (
      <section className="contact" id="connect">
        <div className="container">
          <div className="contact-row">
            <div className="contact-column">
              <TrackVisibility>
                {({ isVisible }) =>
                    <div className={isVisible ? "animate__animated animate__fadeIn" : "void-div"}>
                      <h2>{textData.title}</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="form-row">
                          {/*
                      <div className="form-group">
                        <input type="text" value={formDetails.firstName} placeholder={textData.nameField} onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <input type="text" value={formDetails.lastName} placeholder={textData.surnameField} onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <input type="email" value={formDetails.email} placeholder={textData.emailField} onChange={(e) => onFormUpdate('email', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <input type="tel" value={formDetails.phone} placeholder={textData.phoneField} onChange={(e) => onFormUpdate('phone', e.target.value)} />
                      </div>
                      */}
                          <div className="form-group full-width">
                        <textarea
                            rows="6"
                            value={formDetails.message}
                            placeholder={textData.messageField}
                            onChange={(e) => onFormUpdate('message', e.target.value)}
                        ></textarea>
                            <button type="submit" className="whatsapp-button">
                              <FaWhatsapp className="whatsapp-icon" />
                              <span>{buttonText}</span>
                            </button>
                          </div>
                          {
                              status.message &&
                              <div className="status-message">
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