import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const SeatsDiagram = ({state, colors}) => {

    // State-Hook zur Steuerung der Sichtbarkeit
    const [isVisible, setIsVisible] = useState(false);

    // Chart-Größe als State
    const [chartSize] = useState({ width: 700, height: 300 });

    // Nur Parteien mit Sitzen im Landtag anzeigen
    const data = state.seats.filter(party => party.seats > 0);

    // useEffect für Delay beim Rendern, um Modal-Probleme zu umgehen
    useEffect(() => {
        // Kurze Verzögerung, um sicherzustellen, dass das Modal gerendert ist
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) {
        return <div className="text-center p-4">Diagramm wird geladen...</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={chartSize.height}>
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={false}
                fill="#8884d8"
                dataKey="seats"
                nameKey="name"
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={colors[entry.name]?.color || "#999999"}
                    />
                ))}
            </Pie>
            <Tooltip formatter={(value, label) => [`${label} : ${value}`]} />
            <Legend verticalAlign={"bottom"} margin={{ top: 30 }}/>
        </PieChart>
        </ResponsiveContainer>
    );
};

export default SeatsDiagram;
