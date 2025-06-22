import {useState, useRef, Suspense} from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import {staggerContainer} from "../Experience/StaggerContainer.jsx";
import {Canvas} from "@react-three/fiber";
import { Html, useProgress } from '@react-three/drei';

export const slideIn = (direction, type, delay, duration) => {
    return {
        hidden: {
            x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
            y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
        },
        show: {
            x: 0,
            y: 0,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: "easeOut",
            },
        },
    };
};

const styles = {
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-16 py-10",

    heroHeadText: "font-black text-white lg:text-[72px] sm:text-[48px] xs:text-[36px] text-[28px] lg:leading-[80px] sm:leading-[56px] xs:leading-[44px] leading-[36px] mt-2",

    heroSubText: "text-gray-100 font-medium italic lg:text-[28px] sm:text-[22px] xs:text-[18px] text-[16px] lg:leading-[40px] sm:leading-[28px] xs:leading-[24px] leading-[22px]",

    heroDescriptionText: "text-gray-200 font-normal lg:text-[20px] sm:text-[18px] xs:text-[16px] text-[16px] lg:leading-[32px] sm:leading-[28px] xs:leading-[26px] leading-[24px]",

    sectionHeadText: "text-white font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[24px]",
    sectionSubText: "sm:text-[16px] text-[12px] text-secondary uppercase tracking-wider",

    transformDown: "transform translate-y-16",
};

const SectionWrapper = (Component, idName) =>
    function HOC() {
        return (
            <motion.section
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
            >
            <span className="hash-span" id={idName}>
                &nbsp;
            </span>
                <Component />
            </motion.section>
        )
    }

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.send(
            'service_55c147f',
            'template_mw8jdf5',
            {
                from_name: form.name,
                to_name: 'Samuel',
                from_email: form.email,
                to_email: 'samuel7nobre@gmail.com',
                message: form.message,
            },
            'DqR54frzdsdRDiLit'
        )
            .then(() => {
                setLoading(false);
                alert('Thanks for the message, I will get back to you ASAP!');

                setForm({
                    name: '',
                    email: '',
                    message: '',
                })
            }, (error) => {
                setLoading(false);

                console.log(error);
                alert('Oops, something went wrong.')
            })
    }

    return (
        <div className="flex justify-center items-start">
            <motion.div
                variants={slideIn('left', "tween", 0.2, 1)}
                className="flex-[0.4] bg-[#071a1a] p-8 rounded-2xl"
            >
                <h3 className={styles.sectionHeadText}>Contact</h3>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="mt-4 flex flex-col gap-4"
                >
                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-2">Your Name</span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe, is that you?"
                            className="bg-[#031010] py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-2">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="johndoe@email.com sounds good!"
                            className="bg-[#031010] py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-2">Your Message</span>
                        <textarea
                            rows="7"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Let's pen down your thoughts."
                            className="bg-[#031010] py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-[#23B5B5] hover:bg-[#1a8a8a] py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl transition-colors duration-200"
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

export default SectionWrapper(Contact, "contact")