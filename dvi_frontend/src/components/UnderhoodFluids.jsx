import { useEffect, useState } from 'react'

export const UnderHoodFluids = ({ addToConcerns }) => {

    const [aFNotes, setAFNotes] = useState('');
    const [aFLevel, setAFLevel] = useState(1);
    const [freezeTemp, setFreezeTemp] = useState(-40)
    const [eONotes, setEONotes] = useState('');
    const [eOLevel, setEOLevel] = useState(1);
    const [aTFNotes, setATFNotes] = useState('');
    const [aTFLevel, setATFLevel] = useState(1);
    const [pSFluidNotes, setPSFluidNotes] = useState('');
    const [pSFluidLevel, setPSFluidLevel] = useState(1);
    const [brakeFluidNotes, setBrakeFluidNotes] = useState('');
    const [brakeFluidLevel, setBrakeFluidLevel] = useState(1);
    const [otherNotes, setOtherNotes] = useState('');
    const [otherLevel, setOtherLevel] = useState(1);

    const underHoodFluids = [
        {   
            name: 'Anti-freeze',
            level: aFLevel,
            setLevel: setAFLevel,
            notes: aFNotes,
            setNotes: setAFNotes,
            frz_tmp: freezeTemp,
            setTemp: setFreezeTemp,
            id: 'af'
        },
        {
            name: 'Engine Oil',
            level: eOLevel,
            setLevel: setEOLevel,
            notes: eONotes,
            setNotes: setEONotes,
            id: 'oil' 
        },
        {
            name: 'Transmission Fluid',
            level: aTFLevel,
            setLevel: setATFLevel,
            notes: aTFNotes,
            setNotes: setATFNotes,
            id: 'atf'
        },
        {
            name: 'Power Steering Fluid',
            level: pSFluidLevel,
            setLevel: setPSFluidLevel,
            notes: pSFluidNotes,
            setNotes: setPSFluidNotes,
            id: 'ps'
        },
        {
            name: 'Brake Fluid',
            level: brakeFluidLevel,
            setLevel: setBrakeFluidLevel,
            notes: brakeFluidNotes,
            setNotes: setBrakeFluidNotes,
            id: 'bf'
        },
        {
            name: 'Other',
            level: otherLevel,
            setLevel: setOtherLevel,
            notes: otherNotes,
            setNotes: setOtherNotes,
            id: 'other'
        },
    ];

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };
        
        underHoodFluids.forEach(({ name, level, notes, id }) => {             
            const msg = `${statusIcon[level]} ${name} ${id === 'af' ? `Freeze temp ${freezeTemp}` : ''} ${notes}`
            addToConcerns(level, msg)
        })     
    };
    
    return (
        <fieldset>
        <legend>Under Hood Fluids</legend>
        {underHoodFluids.map((item) => (
            <div key={item.name}>
                
                <h4>{item.name}</h4>
                <label>
            <input 
                type="radio" 
                name={item.name} 
                value={1} 
                checked={item.level === 1} 
                onChange={() => item.setLevel(1)} 
            />✅
        </label>
        <label>
            <input 
                type="radio" 
                name={item.name}  
                value={2} 
                checked={item.level === 2} 
                onChange={() => item.setLevel(2)} 
            />🟡
        </label>
        <label>
            <input 
                type="radio" 
                name={item.name} 
                value={3} 
                checked={item.level === 3} 
                onChange={() => item.setLevel(3)} 
            />❌
        </label>
        {item.name === 'Anti-freeze' && 
        <>
             <br></br>
            <label> Freeze Temp °F: 
                <input
                    value={item.frz_tmp}
                    onChange={(e) => item.setTemp(e.target.value)}
                />
            </label>
        </>
        }
            
            <label> Notes:
                <textarea
                    value={item.notes}
                    onChange={(e) => item.setNotes(e.target.value)}
                />
            </label>
         
        <hr></hr>
            </div>
        ))}
        <button type='button' onClick={handleResults}>Test Result</button>
    </fieldset>
    )
}