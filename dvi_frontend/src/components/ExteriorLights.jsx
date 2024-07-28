import { useEffect, useState } from 'react'

export const ExteriorLights = ({ addToConcerns }) => {

    const [isPass, setIsPass] = useState(false);

    const [headlight, setHeadlight] = useState(1);
    const [taillight, setTaillight] = useState(1);
    const [platelight, setPlatelight] = useState(false);
    const [turnlight, setTurnlight] = useState(false);
    const [brakelight, setBrakelight] = useState(false);

    const [headlightNotes, setHeadlightNotes] = useState('');
    const [taillightNotes, setTaillightNotes] = useState('');
    const [platelightNotes, setPlatelightNotes] = useState('');
    const [turnlightNotes, setTurnlightNotes] = useState('');
    const [brakelightNotes, setBrakelightNotes] = useState('');


    // loc === location of concern
    const lightOptions = [
        { 
            name: 'Headlights', 
            light: headlight, 
            setLight: setHeadlight, 
            locations: ['LF', 'RF'], 
            loc: [],
            notes: headlightNotes, 
            setNotes: setHeadlightNotes,
            id: 'hl'
        },
        { 
            
            name: 'Taillights', 
            light: taillight, 
            setLight: setTaillight, 
            locations: ['LR', 'RR'], 
            loc: [],
            notes: taillightNotes, 
            setNotes: setTaillightNotes,
            id: 'tl'
        },
        { 
            name: 'License Plate', 
            light: platelight, 
            setLight: setPlatelight, 
            locations: ['LR', 'RR'], 
            loc: [],
            notes: platelightNotes, 
            setNotes: setPlatelightNotes,
            id: 'lp'
        },
        { 
            name: 'Turnlights', 
            light: turnlight, 
            setLight: setTurnlight, 
            locations: ['LF', 'RF', 'RR', 'LR'], 
            loc: [],
            notes: turnlightNotes, 
            setNotes: setTurnlightNotes,
            id: 'ts'
        },
        { 
            name: 'Brakelights', 
            light: brakelight, 
            setLight: setBrakelight, 
            locations: ['LR', 'CHIMSL', 'RR'], 
            loc: [],
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
                const msg = `${loc.map((location) => location)} ${name}, ${notes}  `
                addToConcerns(light, msg)
            } 
       })
    };

    const handleLOC = (id, location) => {
        lightOptions.filter((light) => {
            if (light.id === id && !light.loc.includes(location)) {
                loc = [...loc, location]
            } else {
                loc = loc.filter(locItem => locItem !== location);
            }
        })
    };

    const handleChecked = (id, location) => {
        return lightOptions.filter((light) => 
            light.id === id && light.loc.includes(location)
        );
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
                        {item.locations.map((location) => (
                            <label key={`${item.id}LOC${location}`}>
                               <input
                                    type="checkbox"
                                    checked={handleChecked(item.id, location)}
                                    onChange={() => handleLOC(item.id, location)}
                                />{location}
                            </label>
                        ))}
                        <label>Notes
                            <textarea 
                                value={item.notes}
                                onChange={(e) => item.setNotes(item.id, e.target.value)}
                            />
                        </label>
                        <button type='button' onClick={handleResults}>Test Result</button>
                    </div>
            ))}
        </fieldset>
    )
} 