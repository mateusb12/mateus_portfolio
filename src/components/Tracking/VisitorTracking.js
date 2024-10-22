// src/VisitorTracking.js

import React, { useEffect, useRef } from 'react';
import { logEvent, checkIfIpExists } from './FirebaseFetcher';
import { v4 as uuidv4 } from 'uuid';

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
                    page: window.location.pathname,
                    referrer: document.referrer || 'Direct',
                    userAgent: navigator.userAgent,
                };

                // Create an async function to handle the async calls
                const logIfNewIp = async () => {
                    try {
                        const ipExists = await checkIfIpExists('pageVisit', ipAddressRef.current);
                        if (ipExists) {
                            // console.log('IP address already exists in Firebase. Not logging again.');
                        } else {
                            // Log the event
                            await logEvent('pageVisit', eventData, false);
                            // console.log('Visitor data successfully sent.');
                        }
                    } catch (error) {
                        console.error('Failed to check or log page visit:', error);
                    }
                };

                logIfNewIp();
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
