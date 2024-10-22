// src/FirebaseFetcher.js

import axios from 'axios';

// Firebase Realtime Database URL
const FIREBASE_DB_URL = 'https://mateusautomation-75c5d-default-rtdb.firebaseio.com/';

/**
 * Encodes a string to be safe for use as a Firebase Realtime Database key.
 *
 * @param {string} key - The key to encode.
 * @returns {string} - The encoded key.
 */
const encodeKey = (key) => {
    return key.replace(/[^a-zA-Z0-9]/g, '_');
};

/**
 * Logs a page visit event under the IP address key.
 *
 * @param {object} eventData - The data associated with the event.
 * @returns {Promise<object>} - The Firebase response data.
 */
export const logVisitByIp = async (eventData) => {
    const ipAddress = eventData.ipAddress;
    const encodedIp = encodeKey(ipAddress);
    const url = `${FIREBASE_DB_URL}portfolio/logs/pageVisit/${encodedIp}.json`;

    console.log(`PUT ${url}`);

    try {
        // Fetch existing data for the IP address
        const response = await axios.get(url);
        let data = response.data || {};

        // Update lastVisit
        data.lastVisit = {
            timestamp: eventData.timestamp,
            timeSpent: eventData.timeSpent,
            page: eventData.page,
            referrer: eventData.referrer,
            userAgent: eventData.userAgent,
            visitorId: eventData.visitorId
        };

        // Append to visitList
        if (!data.visitList) {
            data.visitList = [];
        }
        data.visitList.push({
            timestamp: eventData.timestamp,
            timeSpent: eventData.timeSpent,
            page: eventData.page,
            referrer: eventData.referrer,
            userAgent: eventData.userAgent,
            visitorId: eventData.visitorId
        });

        // Save the updated data back to Firebase
        const putResponse = await axios.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(`Successfully logged visit for IP "${ipAddress}"`);
        return putResponse.data;
    } catch (error) {
        console.error(`Error logging visit for IP "${ipAddress}":`, error);
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
    // Your existing logError implementation
};
