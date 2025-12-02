import BmEnergia from '../../assets/img/bm-energia.png';

// Import the new Icons
import ApprovalIcon from '../../assets/img/project_assets/approval.png';
import CustomizedIcon from '../../assets/img/project_assets/customized.png';
import TypingIcon from '../../assets/img/project_assets/typing.png';

export const caseStudiesData = [
    {
        title: 'BM Energia RCM Platform',
        category: 'Web App Development',
        keyFeatures: ['Multi-row approval workflows', 'Real-time status tracking', 'Automated notifications'],
        image: BmEnergia,
        link: 'https://vssoftware.com.br'
    },
];

export const caseStudyTextContent = {
    english: {
        sectionTitle: 'Client Success Stories',
        sectionSubtitle: 'See how my work has translated into real-world success for my clients.',
        keyFeatures: 'Key features',
        readStory: 'Read full story',
        closeStory: 'Close story',
        items: [
            {
                title: 'BM Energia Platform',
                category: 'Web App Development',
                description: 'Digitalized procurement workflows for a Brazilian civil engineering company, replacing email/Excel processes with a streamlined web application.',
                keyFeatures: [
                    {
                        icon: CustomizedIcon,
                        title: "Custom Web Platform",
                        desc: "Replacing Excel with a structured web system"
                    },
                    {
                        icon: TypingIcon,
                        title: "Reduced Typing Errors",
                        desc: "Data validation and required fields"
                    },
                    {
                        icon: ApprovalIcon,
                        title: "Approval Workflows",
                        desc: "Automation of the purchasing cycle"
                    }
                ],
                fullStory: {
                    challenge: "BM Energia struggled with decentralized procurement requests managed via email and Excel spreadsheets. This led to lost requests, lack of transparency in approval statuses, and difficulty in auditing purchase history.",
                    solution: "I developed a custom web platform (RCM System) that centralizes the entire purchasing flow. The system implements specific roles (Requester, Manager, Buyer), strict approval rules based on values, and automatic email notifications for each status change.",
                    impact: "The platform eliminated 100% of 'lost email' incidents, reduced approval time by centralized notifications, and provided management with a clear dashboard to monitor budget and spending in real-time."
                }
            },
            {
                title: 'Global Logistics Dashboard',
                category: 'Data Visualization',
                description: 'Developed a real-time tracking dashboard for a global shipping company, providing insights into fleet management and delivery times.',
                keyFeatures: ['Live Geo-tracking', 'Predictive ETA', 'Custom Reporting'],
                fullStory: null
            },
            {
                title: 'E-commerce AI Recommender',
                category: 'Machine Learning',
                description: 'Built a recommendation engine for an online retail store, increasing user engagement and average order value by 15%.',
                keyFeatures: ['Collaborative Filtering', 'Personalized Suggestions', 'A/B Testing Framework'],
                fullStory: null
            }
        ]
    },
    portuguese: {
        sectionTitle: 'Histórias de Sucesso de Clientes',
        sectionSubtitle: 'Veja como meu trabalho se traduziu em sucesso no mundo real para meus clientes',
        keyFeatures: 'Recursos principais',
        readStory: 'Ler história completa',
        closeStory: 'Fechar história',
        items: [
            {
                title: 'Plataforma BM Energia',
                category: 'Desenvolvimento Web',
                description: 'Digitalização de fluxos de requisição de compra para uma empresa brasileira de engenharia civil, substituindo processos manuais de email/Excel por uma aplicação web personalizada',
                keyFeatures: [
                    {
                        icon: CustomizedIcon,
                        title: "Plataforma Web Personalizada",
                        desc: "Substituição do Excel por um sistema web estruturado"
                    },
                    {
                        icon: TypingIcon,
                        title: "Redução de Erros de Digitação",
                        desc: "Validação de dados e campos obrigatórios"
                    },
                    {
                        icon: ApprovalIcon,
                        title: "Fluxos de Aprovação",
                        desc: "Automatização do ciclo de compras"
                    }
                ],
                fullStory: {
                    challenge: "A BM Energia enfrentava dificuldades com requisições de compra descentralizadas, geridas via e-mail e planilhas Excel. Isso gerava extravio de pedidos, falta de transparência nos status de aprovação e dificuldade em auditar o histórico de compras.",
                    solution: "Desenvolvi uma plataforma web personalizada (Sistema de RCMs) que centraliza todo o fluxo de compras. O sistema implementa hierarquia de usuários (Requisitante, Gerente, Comprador), regras rígidas de aprovação e notificações automáticas por e-mail a cada mudança de status.",
                    impact: "A plataforma eliminou 100% dos incidentes de 'e-mails perdidos', reduziu o tempo de aprovação graças às notificações centralizadas e forneceu à diretoria um dashboard claro para monitorar gastos e orçamento em tempo real."
                }
            }
        ]
    }
};