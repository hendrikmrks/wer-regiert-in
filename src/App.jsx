// App.jsx
import React, {useState, useEffect} from 'react';
import GermanyMap from './components/GermanyMap';
import './App.css';
import {getLastPushTimestamp} from "./hooks/lastGithubPush.js";

function App() {

    const [lastUpdate, setLastUpdate] = useState(null);

    useEffect(() => {
        getLastPushTimestamp('hendrikmrks/wer-regiert-in.de').then(timestamp => {
            if (timestamp) {
                const date = new Date(timestamp);
                setLastUpdate(date.toLocaleString());
                //console.log('Formatiertes Datum:', date.toLocaleString());
            } else {
                console.log('Konnte den Zeitstempel nicht abrufen.');
            }
        });
    }, []);

    return (
    <div className="app">
      <header>
        <h1>Wer regiert eigentlich in welchem Bundesland?</h1>
        <p>Klicke auf ein Bundesland für mehr Informationen</p>
      </header>
      <main>
        <GermanyMap />
      </main>
      <footer>
        <p>Diese Karte kann Fehler enthalten und wurde zuletzt am {lastUpdate} aktualisiert.</p>
        <p>Made by Hendrik Beier, Nikolas Miksiewicz, Marc Wachsmann</p>
          <p>Kontakt: <a href="mailto:kontakt@wer-regiert-in.de">kontakt@wer-regiert-in.de</a></p>
      </footer>
    </div>
  );
}

export default App;
