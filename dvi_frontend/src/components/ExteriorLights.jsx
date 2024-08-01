import { useEffect, useState } from 'react'

export const ExteriorLights = ({ sortConcerns }) => {

    const [headlight, setHeadlight] = useState(1);
    const [taillight, setTaillight] = useState(1);
    const [platelight, setPlatelight] = useState(1);
    const [turnlight, setTurnlight] = useState(1);
    const [brakelight, setBrakelight] = useState(1);

    const [headlightNotes, setHeadlightNotes] = useState('');
    const [taillightNotes, setTaillightNotes] = useState('');
    const [platelightNotes, setPlatelightNotes] = useState('');
    const [turnlightNotes, setTurnlightNotes] = useState('');
    const [brakelightNotes, setBrakelightNotes] = useState('');

    const lightOptions = [
        { 
            name: 'Headlights', 
            light: headlight, 
            setLight: setHeadlight, 
            notes: headlightNotes, 
            setNotes: setHeadlightNotes,
            id: 'hl'
        },
        { 
            
            name: 'Taillights', 
            light: taillight, 
            setLight: setTaillight, 
            notes: taillightNotes, 
            setNotes: setTaillightNotes,
            id: 'tl'
        },
        { 
            name: 'License Plate', 
            light: platelight, 
            setLight: setPlatelight, 
            notes: platelightNotes, 
            setNotes: setPlatelightNotes,
            id: 'lp'
        },
        { 
            name: 'Turnlights', 
            light: turnlight, 
            setLight: setTurnlight, 
            notes: turnlightNotes, 
            setNotes: setTurnlightNotes,
            id: 'ts'
        },
        { 
            name: 'Brakelights', 
            light: brakelight, 
            setLight: setBrakelight, 
            notes: brakelightNotes, 
            setNotes: setBrakelightNotes,
            id: 'bl'
        },
    ];

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };

       lightOptions.forEach(({ name, light, loc, notes }) => {
            if (statusIcon[light]) {
                const msg = `${statusIcon[light]} ${name}, ${notes}`;
                sortConcerns('exteriorLights', light, msg)
            } 
       })
    };
   
    return (
        <fieldset>
            <legend>Exterior Lights <em>include location, part, action</em></legend>
            {lightOptions.map(item => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <label>
                            <input 
                                type='radio'
                                name={`${item.id}Radio`}
                                value={1}
                                onChange={() => {item.setLight(1)}}
                                checked={item.light === 1}
                            />✅
                        </label>
                        <label>
                            <input 
                                type='radio'
                                name={`${item.id}Radio`}
                                value={2}
                                onChange={() => {item.setLight(2)}}
                                checked={item.light === 2}
                            />🟡
                        </label>
                        <label>
                            <input 
                                type='radio'
                                name={`${item.id}Radio`}
                                value={3}
                                onChange={() => {item.setLight(3)}}
                                checked={item.light === 3}
                            />❌
                        </label>
                        <label>Notes
                            <textarea 
                                value={item.notes}
                                onChange={(e) => item.setNotes(e.target.value)}
                            />
                        </label>
                        
                    </div>
            ))}
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
} 