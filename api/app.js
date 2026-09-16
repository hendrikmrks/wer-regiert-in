const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/hendrikmrks/wer-regiert-in.de/refs/heads/main/src/data/statesData.json';

app.use(express.json());
app.use(cors());

async function fetchDataFromGitHub() {
    try {
        const response = await axios.get(GITHUB_RAW_URL);
        return response.data;
    } catch (error) {
        console.error('Fehler beim Laden der Daten von GitHub:', error.message);
        throw error;
    }
}

// Middleware zur Datenladung bei jedem Aufruf
const loadDataMiddleware = async (req, res, next) => {
    try {
        req.germanStatesData = await fetchDataFromGitHub();
        next();
    } catch (error) {
        res.status(500).json({
            error: 'Fehler beim Laden der Daten aus dem GitHub-Repository',
            message: error.message
        });
    }
};

// Root-Endpunkt
app.get('/', (req, res) => {
    res.json({
        message: 'Willkommen zur Deutschen Bundesländer API',
        endpoints: [
            '/api/states - Liste aller Bundesländer',
            '/api/states/:stateId - Details zu einem Bundesland',
            '/api/parties - Liste aller Parteien',
            '/api/ministers - Liste aller Ministerpräsidenten/Bürgermeister',
            '/api/states/by-party/:party - Bundesländer nach Regierungspartei filtern'
        ],
        source: GITHUB_RAW_URL
    });
});

// Alle Bundesländer abrufen
app.get('/api/states', loadDataMiddleware, (req, res) => {
    const states = {};

    Object.entries(req.germanStatesData).forEach(([key, value]) => {
        if (key !== 'parties') {
            states[key] = value;
        }
    });

    res.json(states);
});

app.get('/api/states/:stateId', loadDataMiddleware, (req, res) => {
    const { stateId } = req.params;
    const stateKey = `de-${stateId}`;

    if (req.germanStatesData[stateKey]) {
        res.json(req.germanStatesData[stateKey]);
    } else {
        res.status(404).json({ error: `Bundesland mit ID '${stateId}' nicht gefunden` });
    }
});

app.get('/api/parties', loadDataMiddleware, (req, res) => {
    if (req.germanStatesData.parties) {
        res.json(req.germanStatesData.parties);
    } else {
        res.status(404).json({ error: 'Partei-Informationen nicht gefunden' });
    }
});

app.get('/api/ministers', loadDataMiddleware, (req, res) => {
    const ministers = {};

    Object.entries(req.germanStatesData).forEach(([key, value]) => {
        if (key !== 'parties' && value.government && value.government.length > 0) {
            const headOfGovernment = value.government[0];
            ministers[key] = {
                state: value.name,
                position: headOfGovernment.name,
                person: headOfGovernment.current,
                party: headOfGovernment.party
            };
        }
    });

    res.json(ministers);
});

app.get('/api/states/by-party/:party', loadDataMiddleware, (req, res) => {
    const { party } = req.params;
    const statesByParty = {};

    Object.entries(req.germanStatesData).forEach(([key, value]) => {
        if (key !== 'parties' && value.government && value.government.length > 0) {
            const headOfGovernment = value.government[0];
            if (headOfGovernment.party === party) {
                statesByParty[key] = value;
            }
        }
    });

    if (Object.keys(statesByParty).length > 0) {
        res.json(statesByParty);
    } else {
        res.status(404).json({ error: `Keine Bundesländer mit ${party} als Regierungspartei gefunden` });
    }
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});