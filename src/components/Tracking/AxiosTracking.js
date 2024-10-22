import React, { useEffect, useState, useRef } from 'react';
import { logEvent } from './FirebaseFetcher';

const VisitorTracking = () => {
    const [ipAddress, setIpAddress] = useState(null);
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        const fetchIpAddress = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setIpAddress(data.ip);
                console.log('Visitor IP:', data.ip);
            } catch (error) {
                console.error('Error fetching IP address:', error);
                setIpAddress('Unavailable');
            }
        };

        fetchIpAddress();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                const endTime = Date.now();
                const timeSpent = (endTime - startTimeRef.current) / 1000;

                console.log('Time spent on the page:', timeSpent, 'seconds');

                const eventData = {
                    ipAddress: ipAddress || 'Unavailable',
                    timeSpent: timeSpent,
                    timestamp: new Date().toISOString(),
                    page: window.location.pathname,
                    referrer: document.referrer || 'Direct',
                    userAgent: navigator.userAgent,
                };

                // Use axios.post instead of sendBeacon for testing
                logEvent('pageVisit', eventData, false)
                    .then(() => {
                        console.log('Visitor data successfully sent.');
                    })
                    .catch((error) => {
                        console.error('Failed to log page visit:', error);
                    });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [ipAddress]);

    return null;
};

export default VisitorTracking;
