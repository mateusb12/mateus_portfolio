import React from 'react';

const LanguageContext = React.createContext({
    language: 'english', // Add default language here
    selectedFlag: 'usa',
    setSelectedFlag: () => {},
    setLanguage: () => {} // Add setLanguage method for updating the language
});

export default LanguageContext;