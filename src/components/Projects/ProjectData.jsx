import React, {useState} from "react";
import {projectsFadeIn} from "../../utils/componentUtils.jsx";

import witcher_reading_book from '../../assets/img/witcher_reading_book.png';
import flight from '../../assets/img/flight.jpg';
import data_analysis from '../../assets/img/data_analysis.jpg';

// skill icons
import backend from '../../assets/img/skills_icons/server.png';
import api from '../../assets/img/skills_icons/api.png';
import prisma from '../../assets/img/skills_icons/database.png';
import cloud from '../../assets/img/skills_icons/cloud.png';
import deploy from '../../assets/img/skills_icons/deploy.png';
import lock from '../../assets/img/skills_icons/lock.png';
import python from '../../assets/img/skills_icons/python.png';
import javascript from '../../assets/img/skills_icons/javascript.png';
import csharp from '../../assets/img/skills_icons/csharp.png';
import java from '../../assets/img/skills_icons/java.png';
import html from '../../assets/img/skills_icons/html.png';
import css from '../../assets/img/skills_icons/css.png';
import sql from '../../assets/img/skills_icons/sql.png';
import git from '../../assets/img/skills_icons/git.png';
import flask from '../../assets/img/skills_icons/flask.png';
import reactIcon from '../../assets/img/skills_icons/react.png';
import jwt from '../../assets/img/skills_icons/jwt.png';
import postgres from '../../assets/img/skills_icons/postgres.png';
import docker from '../../assets/img/skills_icons/docker.png';
import aws from '../../assets/img/skills_icons/aws.png';
import googleCloud from '../../assets/img/skills_icons/google-cloud-small.png';
import website from '../../assets/img/skills_icons/frontend_dev.png';
import design from '../../assets/img/skills_icons/design.png';
import machineLearning from '../../assets/img/skills_icons/machine-learning.png';
import webScrapping from '../../assets/img/skills_icons/web-scrapping.png';
import typescript from '../../assets/img/skills_icons/typescript.png';
import linux from '../../assets/img/skills_icons/linux.png';
import numpy from '../../assets/img/skills_icons/numpy.png';
import graphviz from '../../assets/img/skills_icons/graphviz.png';
import pandas from '../../assets/img/skills_icons/pandas.png';
import networkx from '../../assets/img/skills_icons/networkx.png';
import spacy from '../../assets/img/skills_icons/spacy.png';
import nodejs from '../../assets/img/skills_icons/nodejs.png';
import django from '../../assets/img/skills_icons/django.png';
import mongodb from '../../assets/img/skills_icons/mongo.svg';
import supabase from '../../assets/img/skills_icons/supabase.png';
import firebase from '../../assets/img/skills_icons/firebase.png';
import tilt from '../../assets/img/skills_icons/tilt.png';
import poetry from '../../assets/img/skills_icons/poetry.png';
import alembic from '../../assets/img/skills_icons/alembic.png';
import azure from '../../assets/img/skills_icons/azure.svg';
import figma from '../../assets/img/skills_icons/figma.svg';
import githubActions from '../../assets/img/skills_icons/github-actions.svg';
import nextjs from '../../assets/img/skills_icons/nextjs.svg';
import redis from '../../assets/img/skills_icons/redis.svg';
import swagger from '../../assets/img/skills_icons/swagger.svg';
import reactNative from '../../assets/img/skills_icons/react-native.png';
import nlp from '../../assets/img/skills_icons/nlp.png';
import selenium from '../../assets/img/skills_icons/selenium.png';
import matplotlib from '../../assets/img/skills_icons/matplotlib.png';
import telegram from '../../assets/img/skills_icons/telegram.png';
import machine_learning from '../../assets/img/skills_icons/machine-learning.png';
import lightgbm from '../../assets/img/skills_icons/lightgbm.png';
import seaborn from '../../assets/img/skills_icons/seaborn.png';
import scikit_learn from '../../assets/img/skills_icons/scikit-learn.svg';
import optuna from '../../assets/img/skills_icons/optuna.png';
import scipy from '../../assets/img/skills_icons/scipy.svg';

export const iconMap = {
    api, backend, flask, django, website,
    html, css, javascript, python, csharp, java, sql, git, jwt,
    postgres, docker, aws, googleCloud, cloud, deploy, lock,
    design, machineLearning, webScrapping, linux, react: reactIcon,
    mongodb, nodejs, typescript, firebase, supabase,
    nextjs, prisma, tilt, poetry, alembic,
    azure, figma, githubActions, redis, swagger, reactNative,
    nlp, graphviz, pandas, numpy, networkx, spacy, selenium, matplotlib, telegram, machine_learning,
    lightgbm, seaborn, scikit_learn, optuna, scipy
};

export const projectsData = [
    {
        name: 'Book Analyzer',
        description: 'Transform .txt book files into social media style graphs, similar to Instagram',
        tags: ['api', 'nlp', 'django', 'python', 'numpy', 'graphviz', 'pandas', 'networkx', 'spacy'],
        image: witcher_reading_book,
        projectLink: 'https://your-langguesser-app.com',
    },
    {
        name: 'Flight Scraper',
        description:
            'Powered by Kiwi Tequila API, this project scrapes flight data and alerts users when prices drop.',
        tags: ['backend', 'flask', 'firebase', 'selenium', 'matplotlib', 'telegram', 'pandas'],
        image: flight,
        projectLink: 'https://your-roastroom-app.com',
    },
    {
        name: 'Valorant Impact',
        description:
            'Quantifies how player actions shift the odds of winning a Valorant round in real-time.',
        tags: ['machine_learning', 'flask', 'python', 'lightgbm', 'scikit_learn', 'optuna', 'seaborn', 'scipy'],
        image: data_analysis,
        projectLink: 'https://your-porisma-app.com',
    },
];

// translations
export const projectTextContent = {
    english: {
        sectionTitle: 'Projects',
        sectionSubtitle: 'Take a closer look at what I’ve been working on.',
        viewAll: 'View all',
        readMore: 'Read More',
        showLess: 'Show Less',
        items: [
            {
                name: 'Book Analyzer',
                description: 'Transform .txt book files into social media style graphs, similar to Instagram'
            },
            {
                name: 'Flight Scraper',
                description: 'Powered by Kiwi Tequila API, this project scrapes flight data and alerts users when prices drop.'
            },
            {
                name: 'Valorant Impact',
                description: 'Quantifies how player actions shift the odds of winning a Valorant round in real-time.'
            },
        ]
    },
    portuguese: {
        sectionTitle: 'Projetos',
        sectionSubtitle: 'Alguns dos projetos que eu tenho trabalhado ultimamente',
        viewAll: 'Ver todos',
        readMore: 'Ler mais',
        showLess: 'Mostrar menos',
        items: [
            {
                name: 'Analisador de Livros',
                description: 'Transforme arquivos .txt de livros em gráficos estilo redes sociais, parecido com oo Instagram'
            },
            {
                name: 'Alerta de Voos',
                description: 'Utilizando a API Kiwi Tequila, este projeto coleta dados de voos e alerta usuários quando os preços caem'
            },
            {
                name: 'Valorant Impact',
                description: 'Quantifica em tempo real como as ações dos jogadores mudam as chances de vencer um round de Valorant'
            },
        ]
    }
};