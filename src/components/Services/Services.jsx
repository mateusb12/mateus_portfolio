import React, { useContext } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import LanguageContext from '../LanguageContext';
import human_brain from '../../assets/img/skills_icons/human-brain.png';
import dashboard    from '../../assets/img/skills_icons/dashboard.png';
import login        from '../../assets/img/skills_icons/login.png';
import plug         from '../../assets/img/skills_icons/plug.png';
import {servicesFadeIn, staggerContainer} from "../../utils/componentUtils.jsx";

// Tilt settings
const tiltOptions = {
    max: 25,
    scale: 1.05,
    speed: 400,
};

// Glow-theme utility (unchanged)
const getGlowTheme = (theme = 'green') => {
    const colors = {
        green: {
            borderColor: 'border-green-400/60',
            borderHoverColor: 'hover:border-green-300',
            outerGlow: 'shadow-[0_0_15px_5px_rgba(74,222,128,0.15)]',
            outerGlowHover: 'hover:shadow-[0_0_25px_8px_rgba(74,222,128,0.25)]',
            innerGlowColor: 'bg-green-400',
            innerGlowOpacity: 'opacity-20',
            innerGlowHover: 'group-hover:opacity-30',
            imageShadow: 'shadow shadow-green-100/10',
            titleColor: 'text-green-400',
        },
        cyan: {
            borderColor: 'border-cyan-400/10',
            borderHoverColor: 'hover:border-cyan-300',
            outerGlow: 'shadow-[0_0_15px_5px_rgba(34,211,238,0.15)]',
            outerGlowHover: 'hover:shadow-[0_0_25px_8px_rgba(34,211,238,0.25)]',
            innerGlowColor: 'bg-cyan-400',
            innerGlowOpacity: 'opacity-20',
            innerGlowHover: 'group-hover:opacity-30',
            imageShadow: 'shadow shadow-cyan-100/10',
            titleColor: 'text-cyan-400',
        },
        violet: {
            borderColor: 'border-violet-400/10',
            borderHoverColor: 'hover:border-violet-300',
            outerGlow: 'shadow-[0_0_15px_5px_rgba(192,132,252,0.15)]',
            outerGlowHover: 'hover:shadow-[0_0_25px_8px_rgba(192,132,252,0.25)]',
            innerGlowColor: 'bg-violet-400',
            innerGlowOpacity: 'opacity-20',
            innerGlowHover: 'group-hover:opacity-30',
            imageShadow: 'shadow shadow-violet-100/10',
            titleColor: 'text-violet-400',
        },
        amber: {
            borderColor: 'border-amber-400/10',
            borderHoverColor: 'hover:border-amber-300',
            outerGlow: 'shadow-[0_0_15px_5px_rgba(251,191,36,0.15)]',
            outerGlowHover: 'hover:shadow-[0_0_25px_8px_rgba(251,191,36,0.25)]',
            innerGlowColor: 'bg-amber-400',
            innerGlowOpacity: 'opacity-20',
            innerGlowHover: 'group-hover:opacity-30',
            imageShadow: 'shadow shadow-amber-100/10',
            titleColor: 'text-amber-400',
        },
    };
    return colors[theme] || colors.green;
};

// Text content
const textContent = {
    english: {
        automation:   { title: 'Intelligent automations',   description: 'I build automations like scraping bots, form fillers, message dispatchers or approval flows' },
        platforms:    { title: 'Custom internal platforms', description: 'I craft tailored tools for your team to manage tasks, clients, or inventory (ERP, CRM, etc.)' },
        apps:         { title: 'Full-stack on-demand apps',  description: 'I develop your MVP from scratch, with auth, CRUD, dashboard and deploy—perfect to validate your idea' },
        integrations: { title: 'Third-party API integrations', description: 'I connect your system with payment gateways, WhatsApp, e-commerce platforms, and more' },
    },
    portuguese: {
        automation:   { title: 'Automações inteligentes', description: 'Crio automações como bots de scraping, preenchimento de formulários, disparos de mensagens ou fluxos de aprovação' },
        platforms:    { title: 'Plataformas internas para equipes', description: 'Crio ferramentas sob medida para sua equipe gerenciar tarefas, clientes ou estoque (ERP, CRM, etc.)' },
        apps:         { title: 'Aplicações completas sob demanda', description: 'Desenvolvo o seu MVP do zero, com autenticação, CRUDs, dashboard e deploy, ideal para validar sua ideia no mercado' },
        integrations: { title: 'Integrações com APIs e serviços externos', description: 'Conecto seu sistema com APIs de pagamento, WhatsApp, plataformas de vendas, e muito mais' },
    },
};

const baseServices = [
    { key: 'automation',   glowTheme: 'green',  icon: human_brain },
    { key: 'platforms',    glowTheme: 'cyan',   icon: dashboard   },
    { key: 'apps',         glowTheme: 'amber',  icon: login       },
    { key: 'integrations', glowTheme: 'violet', icon: plug        },
];

const SingleServiceCard = ({ title, icon, description, glowTheme }) => {
    const {
        borderColor, borderHoverColor,
        outerGlow, outerGlowHover,
        innerGlowColor, innerGlowOpacity, innerGlowHover,
        imageShadow, titleColor,
    } = getGlowTheme(glowTheme);

    return (
        <Tilt className="w-[290px]" {...tiltOptions}>
            <motion.div
                variants={servicesFadeIn('right', 'tween', 1.5)}
                className={`relative group overflow-hidden p-5 rounded-[20px] bg-[#031010] border ${borderColor} ${borderHoverColor} ${outerGlow} ${outerGlowHover}`}
            >
                <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full z-0 ${innerGlowColor} ${innerGlowOpacity} ${innerGlowHover} blur-2xl transition-opacity duration-300`} />
                <div className="relative z-10 flex flex-col items-center text-center h-[320px] space-y-3">
                    <img src={icon} alt={`${title} icon`} className={`w-25 h-25 object-cover ${imageShadow}`} />
                    <h3 className={`mt-4 text-2xl font-bold leading-tight ${titleColor}`}>{title}</h3>
                    <p className="mt-2 text-gray-300 text-base">{description}</p>
                </div>
            </motion.div>
        </Tilt>
    );
};

export const ServiceCardSection = () => {
    const { selectedFlag } = useContext(LanguageContext);
    const lang = selectedFlag === 'usa' ? 'english' : 'portuguese';

    const services = baseServices.map(({ key, glowTheme, icon }) => ({
        key,
        glowTheme,
        icon,
        title:       textContent[lang][key].title,
        description: textContent[lang][key].description,
    }));

    return (
        <motion.div
            variants={staggerContainer(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-20 flex flex-wrap gap-10 justify-center"
        >
            {services.map(svc => <SingleServiceCard key={svc.key} {...svc} />)}
        </motion.div>
    );
};
