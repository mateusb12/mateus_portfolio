// src/VisitorTracking.js

import React, { useEffect, useRef } from 'react';
import { logVisitByIp } from './FirebaseFetcher';
import { v4 as uuidv4 } from 'uuid';

const formatTimestamp = (date) => {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}-${months[monthIndex]}-${year} at ${hours}:${minutes}`;
};

con

const VisitorTracking = () => {
    const startTimeRef = useRef(Date.now());
    const ipAddressRef = useRef(null);
    const hasLoggedRef = useRef(false);

    useEffect(() => {
        // Check if visitor ID exists in localStorage
        let visitorId = localStorage.getItem('visitorId');
        if (!visitorId) {
            // Generate a new UUID and store it
            visitorId = uuidv4();
            localStorage.setItem('visitorId', visitorId);
        }

        const fetchIpAddress = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                ipAddressRef.current = data.ip;
                console.log('Visitor IP:', data.ip);
            } catch (error) {
                console.error('Error fetching IP address:', error);
                ipAddressRef.current = 'Unavailable';
            }

            // Now that ipAddressRef is set, add the event listener
            document.addEventListener('visibilitychange', handleVisibilityChange);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden' && !hasLoggedRef.current) {
                hasLoggedRef.current = true; // Set the flag to true
                const endTime = Date.now();
                const timeSpent = (endTime - startTimeRef.current) / 1000;

                console.log('Time spent on the page:', timeSpent, 'seconds');

                const eventData = {
                    visitorId: visitorId,
                    ipAddress: ipAddressRef.current || 'Unavailable',
                    timeSpent: timeSpent,
                    timestamp: new Date().toISOString(),
                    formattedTimestamp: formatTimestamp(new Date()),
                    page: window.location.pathname,
                    referrer: document.referrer || 'Direct',
                    userAgent: navigator.userAgent,
                };

                // Log the visit by IP
                const logVisit = async () => {
                    try {
                        await logVisitByIp(eventData);
                        console.log('Visitor data successfully sent.');
                    } catch (error) {
                        console.error('Failed to log page visit:', error);
                    }
                };

                logVisit();
            }
        };

        fetchIpAddress();

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return null;
};



export default VisitorTracking;
