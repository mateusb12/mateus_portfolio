// src/FirebaseFetcher.js

import axios from 'axios';

// Firebase Realtime Database URL
const FIREBASE_DB_URL = 'https://mateusautomation-75c5d-default-rtdb.firebaseio.com/';

/**
 * Logs an event to Firebase.
 *
 * @param {string} eventType - The type of event (e.g., 'formSubmission', 'pageVisit', 'error').
 * @param {object} eventData - The data associated with the event.
 * @param {boolean} useBeacon - Whether to use navigator.sendBeacon for logging.
 * @returns {Promise<object|undefined>} - The Firebase response data or undefined if using sendBeacon.
 */
export const logEvent = async (eventType, eventData, useBeacon = false) => {
    const url = `${FIREBASE_DB_URL}portfolio/logs2/${eventType}.json`;

    if (useBeacon && navigator.sendBeacon) {
        try {
            const blob = new Blob([JSON.stringify(eventData)], { type: 'application/json' });
            const success = navigator.sendBeacon(url, blob);
            if (success) {
                console.log(`Successfully sent event "${eventType}" using sendBeacon.`);
            } else {
                console.error(`Failed to send event "${eventType}" using sendBeacon.`);
            }
            // Since sendBeacon is fire-and-forget, return a resolved Promise
            return Promise.resolve();
        } catch (error) {
            console.error(`Error sending event "${eventType}" using sendBeacon:`, error);
            // Optionally, you might want to fall back to axios here
            return Promise.reject(error);
        }
    }

    console.log(`POST ${url}`);
    console.log('Headers:', {
        'Content-Type': 'application/json',
    });
    console.log('Data:', JSON.stringify(eventData));

    // Fallback to Axios for regular event logging
    try {
        const response = await axios.post(url, eventData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(`Successfully logged event "${eventType}" with response:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error logging event "${eventType}":`, error);
        throw error;
    }
};

/**
 * Logs an error event to Firebase.
 *
 * @param {object} errorData - The error details.
 * @param {boolean} useBeacon - Whether to use navigator.sendBeacon for logging.
 * @returns {Promise<object|undefined>} - The Firebase response data or undefined if using sendBeacon.
 */
export const logError = async (errorData, useBeacon = false) => {
    await logEvent('error', errorData, useBeacon);
};

/**
 * Checks if an IP address already exists in the event logs.
 *
 * @param {string} eventType - The type of event (e.g., 'pageVisit').
 * @param {string} ipAddress - The IP address to check.
 * @returns {Promise<boolean>} - True if the IP address exists, false otherwise.
 */
export const checkIfIpExists = async (eventType, ipAddress) => {
    // Encode the query parameters
    const url = `${FIREBASE_DB_URL}portfolio/logs2/${eventType}.json?` +
        `orderBy=${encodeURIComponent('"ipAddress"')}&` +
        `equalTo=${encodeURIComponent(`"${ipAddress}"`)}`;

    console.log(`GET ${url}`);

    try {
        const response = await axios.get(url);
        const data = response.data;
        // If data is not empty, the IP address exists
        if (data && Object.keys(data).length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(`Error checking IP address "${ipAddress}":`, error);
        throw error;
    }
};
