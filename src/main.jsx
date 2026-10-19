import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import './index.css'
import App from './App.jsx'

const basename = import.meta.env.BASE_URL

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router basename={basename}>
            <App/>
        </Router>
    </StrictMode>,
)
