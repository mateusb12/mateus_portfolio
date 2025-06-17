import React from 'react';

const LanguageContext = React.createContext({
    language: 'english',
    selectedFlag: 'usa',
    setSelectedFlag: () => {},
    setLanguage: () => {}
});

export default LanguageContext;