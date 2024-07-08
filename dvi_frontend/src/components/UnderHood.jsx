import { useEffect, useState } from 'react'

export const UnderHood = ({ addToConcerns }) => {
    const [airfilterNotes, setAirfilterNotes] = useState('');
    const [batteryNotes, setBatteryNotes] = useState('');
    const [beltsNotes, setBeltsNotes] = useState('');
    const [hosesNotes, setHosesNotes] = useState('');
    const [otherNotes, setOtherNotes] = useState('');

    // Concern level 1 = low, 3 = high
    const [airfilterLevel, setAirfilterLevel] = useState(1);
    const [batteryLevel, setBatteryLevel] = useState(1);
    const [beltsLevel, setBeltsLevel] = useState(1);
    const [hosesLevel, setHosesLevel] = useState(1);
    const [otherLevel, setOtherLevel] = useState(1);

    const underHoodInspItems = [
        { 
            name: 'Air filter', 
            level: airfilterLevel,
            setLevel: setAirfilterLevel,
            notes: airfilterNotes, 
            setNotes: setAirfilterNotes           
        },
        {
            name: 'Battery',
            level: batteryLevel,
            setLevel: setBatteryLevel,
            notes: batteryNotes,
            setNotes: setBatteryNotes,
        },
        {
            name: 'Belts',
            level: beltsLevel,
            setLevel: setBeltsLevel,
            notes: beltsNotes,
            setNotes: setBeltsNotes,
        },
        {
            name: 'Hoses',
            level: hosesLevel,
            setLevel: setHosesLevel,
            notes: hosesNotes,
            setNotes: setHosesLevel,
        },
        {
            name: 'Other',
            level: otherLevel,
            setLevel: setOtherLevel,
            notes: otherNotes,
            setNotes: setOtherNotes,
        },
    ];
    const handleResults = () => {
        const results = underHoodInspItems.map((item) => console.log(item))
        console.log('results', results)
    }

    return (
        <fieldset>
            <legend>Under Hood</legend>
            {underHoodInspItems.map((item) => (
                <div key={item.name}>
                    
                    <h4>{item.name}</h4>
                    <label>
                <input 
                    type="radio" 
                    name={item.name} 
                    value={1} 
                    checked={item.level === 1} 
                    onChange={() => item.setLevel(1)} 
                />
                Pass
            </label>
            <label>
                <input 
                    type="radio" 
                    name={item.name}  
                    value={2} 
                    checked={item.level === 2} 
                    onChange={() => item.setLevel(2)} 
                />
                Needs attention
            </label>
            <label>
                <input 
                    type="radio" 
                    name={item.name} 
                    value={3} 
                    checked={item.level === 3} 
                    onChange={() => item.setLevel(3)} 
                />
                Fail
            </label>
            {item.level > 1 &&  
                <>
                <br></br>
                <label> Notes:
                    <input
                        value={item.notes}
                        onChange={(e) => item.setNotes(e.target.value)}
                    />
                </label>
                </>
            }
            <hr></hr>
                </div>
            ))}
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}