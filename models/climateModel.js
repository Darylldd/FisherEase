const db = require('./db'); // PostgreSQL Connection (pg Pool)
const axios = require('axios');

// Fetch Climate Events from Open-Meteo API
const fetchClimateEvents = async () => {
    try {
        const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=13.4139&longitude=121.0561&daily=weathercode&timezone=auto`
        );

        const events = response.data.daily.weathercode.map((code, index) => ({
            event_name: getEventName(code),
            event_type: getEventType(code),
            event_date: response.data.daily.time[index],
            severity: getSeverityLevel(code),
            estimated_damage: calculateDamage(code),
            affected_area: "Calapan, Philippines"
        }));

        // Insert each event into PostgreSQL
        for (let event of events) {
            await db.query(
                `INSERT INTO climate_events 
                (event_name, event_type, event_date, severity, estimated_damage, affected_area) 
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    event.event_name,
                    event.event_type,
                    event.event_date,
                    event.severity,
                    event.estimated_damage,
                    event.affected_area
                ]
            );
        }

        return events;
    } catch (error) {
        console.error("Error fetching climate events:", error);
        return [];
    }
};

// Helper: Translate weather code to event name
const getEventName = (code) => {
    const eventMapping = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing Rime Fog",
        51: "Light Drizzle",
        53: "Moderate Drizzle",
        55: "Dense Drizzle",
        56: "Light Freezing Drizzle",
        57: "Dense Freezing Drizzle",
        61: "Slight Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",
        66: "Light Freezing Rain",
        67: "Heavy Freezing Rain",
        71: "Slight Snowfall",
        73: "Moderate Snowfall",
        75: "Heavy Snowfall",
        77: "Snow Grains",
        80: "Slight Rain Showers",
        81: "Moderate Rain Showers",
        82: "Heavy Rain Showers",
        85: "Slight Snow Showers",
        86: "Heavy Snow Showers",
        95: "Thunderstorm",
        96: "Thunderstorm with Slight Hail",
        99: "Thunderstorm with Heavy Hail"
    };
    return eventMapping[code] || "Unknown Weather";
};

// Helper: Classify event type
const getEventType = (code) => {
    if ([95, 96, 99].includes(code)) return "Typhoon";
    if ([66, 67].includes(code)) return "Flood";
    if ([80, 81, 82].includes(code)) return "Storm Surge";
    if ([61, 63, 65].includes(code)) return "Heavy Rain";
    if ([56, 57].includes(code)) return "Freezing Rain";
    if ([45, 48].includes(code)) return "Fog";
    if ([71, 73, 75].includes(code)) return "Snowstorm";
    if ([85, 86].includes(code)) return "Snow Showers";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([0, 1, 2, 3].includes(code)) return "Clear or Cloudy";

    console.log(`⚠️ Unknown Weather Code in getEventType: ${code}`);
    return "Unknown";
};

// Helper: Get severity level
const getSeverityLevel = (code) => {
    if ([99, 67, 75].includes(code)) return "Extreme";
    if ([95, 96, 66, 65, 82].includes(code)) return "Severe";
    if ([63, 80, 81, 85, 86].includes(code)) return "Moderate";
    if ([45, 48, 51, 53, 55, 2].includes(code)) return "Low";
    if ([0, 1, 3].includes(code)) return "None";

    console.log(`⚠️ Unknown Weather Code in getSeverityLevel: ${code}`);
    return "Low";
};

// Helper: Estimate damage cost based on code
const calculateDamage = (code) => {
    const damageMapping = {
        95: 100000,
        96: 200000,
        99: 500000,
        66: 200000,
        67: 400000,
        82: 150000,
        65: 80000,
        75: 120000,
        80: 50000,
        81: 60000,
        85: 70000,
        2: 0,
        0: 0,
        1: 0,
        3: 0
    };

    console.log(`🌦 Weather Code Received: ${code}`);

    if (!damageMapping.hasOwnProperty(code)) {
        console.log(`⚠️ Unknown Weather Code in calculateDamage: ${code}`);
        return 50000; // default
    }

    return damageMapping[code];
};

module.exports = { fetchClimateEvents };
