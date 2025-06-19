import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import human_brain from "../../assets/img/skills_icons/human-brain.png"
import dashboard from "../../assets/img/skills_icons/dashboard.png"
import login from "../../assets/img/skills_icons/login.png"
import plug from "../../assets/img/skills_icons/plug.png"

// ─── Tilt Settings ──────────────────────────────────────────────────────────────
const tiltOptions = {
    max: 25,
    scale: 1.05,
    speed: 400,
};

export const fadeIn = (direction, type, delay, duration) => {
    return {
        hidden: {
            x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: "easeOut",
            },
        },
    };
};

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
            titleColor: 'text-green-400'
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
            titleColor: 'text-cyan-400'
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
            titleColor: 'text-violet-400'
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
            titleColor: 'text-amber-400'
        }
    };

    return colors[theme] || colors.green;
};

const services = [
    {
        title: "Automações inteligentes",
        description: "Crio automações como bots de scraping, preenchimento de formulários, disparos de mensagens ou fluxos de aprovação",
        glowTheme: "green",
        icon: human_brain,
    },
    {
        title: "Plataformas internas para equipes",
        description: "Crio ferramentas sob medida para sua equipe gerenciar tarefas, clientes ou estoque (ERP, CRM, etc)",
        glowTheme: "cyan",
        icon: dashboard,
    },
    {
        title: "Aplicações completas sob demanda",
        description: "Desenvolvo o seu MVP do zero, com autenticação, CRUDs, dashboard e deploy, ideal para validar sua ideia no mercado",
        glowTheme: "amber",
        icon: login,
    },
    {
        title: "Integrações com APIs e serviços externos",
        description: "Conecto seu sistema com APIs de pagamento, WhatsApp, plataformas de vendas, e muito mais",
        glowTheme: "violet",
        icon: plug,
    },
];

// ─── Individual Card ────────────────────────────────────────────────────────────
const ServiceCard = ({ index, title, icon, description, glowTheme = 'green' }) => {
    const {
        borderColor,
        borderHoverColor,
        outerGlow,
        outerGlowHover,
        innerGlowColor,
        innerGlowOpacity,
        innerGlowHover,
        imageShadow,
        titleColor
    } = getGlowTheme(glowTheme);

    return (
        <Tilt className="w-[250px]" {...tiltOptions}>
            <motion.div
                variants={fadeIn('right', 'spring', 0.2 * index, 0.75)}
                className={`relative group transition-all overflow-hidden p-5 rounded-[20px]
                    bg-[#031010] border
                    ${borderColor} ${borderHoverColor}
                    ${outerGlow} ${outerGlowHover}`}
            >
                <div
                    className={`absolute top-8 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full z-0
                        ${innerGlowColor} ${innerGlowOpacity} ${innerGlowHover} blur-2xl
                        transition-opacity duration-300`}
                />

                <div className="space-y-2 relative z-10 flex flex-col items-center text-center min-h-[240px]">
                    <img
                        src={icon}
                        alt={`${title} icon`}
                        className={`w-16 h-16 object-cover ${imageShadow}`}
                    />
                    <h3 className={`mt-4 text-lg font-bold leading-tight ${titleColor}`}>
                        {title}
                    </h3>
                    <p className="mt-2 text-gray-300 text-sm">
                        {description}
                    </p>
                </div>
            </motion.div>
        </Tilt>
    );
};

// ─── Main Section ───────────────────────────────────────────────────────────────
export const About = () => {
    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {services.map((service, index) => (
                <ServiceCard key={service.title} index={index} {...service} />
            ))}
        </div>
    );
};
