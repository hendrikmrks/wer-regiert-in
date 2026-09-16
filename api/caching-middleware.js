let cachedData = null;
let lastFetchTime = null;
const CACHE_DURATION = 60 * 1000;

async function fetchDataWithCaching(url) {
    const currentTime = Date.now();

    if (cachedData && lastFetchTime && (currentTime - lastFetchTime < CACHE_DURATION)) {
        console.log('Daten aus Cache geladen');
        return cachedData;
    }

    try {
        console.log(`Lade frische Daten von: ${url}`);
        const response = await axios.get(url);
        cachedData = response.data;
        lastFetchTime = currentTime;
        console.log('Daten erfolgreich geladen und gecached');
        return cachedData;
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error.message);

        if (cachedData) {
            console.log('Verwende veralteten Cache nach Fehler');
            return cachedData;
        }

        throw error;
    }
}

const loadDataWithCachingMiddleware = async (req, res, next) => {
    try {
        req.germanStatesData = await fetchDataWithCaching(GITHUB_RAW_URL);
        next();
    } catch (error) {
        res.status(500).json({
            error: 'Fehler beim Laden der Daten',
            message: error.message
        });
    }
};

app.get('/api/clear-cache', (req, res) => {
    cachedData = null;
    lastFetchTime = null;
    res.json({ success: true, message: 'Cache gelöscht' });
});

module.exports = {
    loadDataWithCachingMiddleware
};