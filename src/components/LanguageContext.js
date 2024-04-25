import React from 'react';

const LanguageContext = React.createContext({
    selectedFlag: 'usa',
    setSelectedFlag: () => {}
});

export default LanguageContext;