import { useEffect, useState } from 'react'

export const ExteriorLights = ({ addToConcerns }) => {

    const [isPass, setIsPass] = useState(false);

    const [isHeadlight, setIsHeadlight] = useState(false);
    const [isTaillight, setIsTaillight] = useState(false);
    const [isPlatelight, setIsPlatelight] = useState(false);
    const [isTurnlight, setIsTurnlight] = useState(false);
    const [isBrakelight, setIsBrakelight] = useState(false);

    const [headlightNotes, setHeadlightNotes] = useState('');
    const [taillightNotes, setTaillightNotes] = useState('');
    const [platelightNotes, setPlatelightNotes] = useState('');
    const [turnlightNotes, setTurnlightNotes] = useState('');
    const [brakelightNotes, setBrakelightNotes] = useState('');

    const lightOptions = [
        { name: 'Pass', state: isPass, setState: setIsPass, notes: `✅ All Exterior lights pass.` },
        { name: 'Headlights', state: isHeadlight, setState: setIsHeadlight, locations: ['LF', 'RF'], notes: headlightNotes, setNotes: setHeadlightNotes},
        { name: 'Taillights', state: isTaillight, setState: setIsTaillight, locations: ['LR', 'RR'], notes: taillightNotes, setNotes: setTaillightNotes},
        { name: 'License Plate', state: isPlatelight, setState: setIsPlatelight, locations: ['LR', 'RR'], notes: platelightNotes, setNotes: setPlatelightNotes},
        { name: 'Turnlights', state: isTurnlight, setState: setIsTurnlight, locations: ['LF', 'RF', 'RR', 'LR'], notes: turnlightNotes, setNotes: setTurnlightNotes},
        { name: 'Brakelights', state: isBrakelight, setState: setIsBrakelight, locations: ['LR', 'CHIMSL', 'RR'], notes: brakelightNotes, setNotes: setBrakelightNotes},
    ];

    const handleResults = () => {
        const results = lightOptions.filter((option) => option.state)
        console.log(results)
        if (results[0].name === 'Pass') {
            addToConcerns(1, `${lightOptions[0].notes}`)
        } else {
            const safetyConcernMsg = 
            `❌ Exterior lights: ${results.map((result) => `${result.name} ${result.notes}`).join(', ')}`;
            console.log(safetyConcernMsg);
            addToConcerns(3, safetyConcernMsg)
        }    
    }

    // Uncheck isPass if anything else is checked
    useEffect(() => {
        let hasWarning = false;
        lightOptions.forEach((option) => {
            if (option.name !== 'Pass' && option.state === true) {
                hasWarning = true;
             }
        })
        setIsPass(!hasWarning)
    }, [isHeadlight, isTaillight, isPlatelight, isTurnlight, isBrakelight])

    return (
        <fieldset>
            <legend>Exterior Lights <em>include location, part, action</em></legend>
            {lightOptions.map((option) => (
                <div key={option.name}>
                <label htmlFor={option.name}>{option.name}</label>
                <input 
                    type='checkbox'
                    id={option.name}
                    checked={option.state}
                    onChange={(e) => option.setState(e.target.checked)}
                />
                {option.name !== 'Pass' && option.state &&
                <>
                    <label htmlFor={option.name}>Add {option.name} note</label>
                    <input id={option.name} value={option.notes} onChange={(e) => option.setNotes(e.target.value)}/>
                </>}
            </div>
            ))}
            <button type='button' onClick={handleResults}>Test Message</button>
        </fieldset>
    )
} 