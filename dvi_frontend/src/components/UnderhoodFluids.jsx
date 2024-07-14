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
            setTemp: setFreezeTemp
        },
        {
            name: 'Engine Oil',
            level: eOLevel,
            setLevel: setEOLevel,
            notes: eONotes,
            setNotes: setEONotes 
        },
        {
            name: 'Transmission Fluid',
            level: aTFLevel,
            setLevel: setATFLevel,
            notes: aTFNotes,
            setNotes: setATFNotes
        },
        {
            name: 'Power Steering Fluid',
            level: pSFluidLevel,
            setLevel: setPSFluidLevel,
            notes: pSFluidNotes,
            setNotes: setPSFluidNotes
        },
        {
            name: 'Brake Fluid',
            level: brakeFluidLevel,
            setLevel: setBrakeFluidLevel,
            notes: brakeFluidNotes,
            setNotes: setBrakeFluidNotes
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
        underHoodFluids.map((item) => {
            if (item.level === 1) {
                if (item.name !== 'Other') {
                    addToConcerns(1, `✅ ${item.name} ${item.frz_tmp ? ', Freeze point: ' + item.frz_tmp + '°F' : ''}`)
                }
            } else if (item.level === 2) {
                const someConcernMsg = `🟡 ${item.name} Ok ${item.notes} ${item.frz_tmp ? ', Freeze point: ' + item.frz_tmp + '°F' : ''}`
                addToConcerns(2, someConcernMsg)
            } else {
                const safetyConcernMsg = `❌ Recommend Change/Flush ${item.name}: ${item.notes} ${item.frz_tmp ? ', Freeze point: ' + item.frz_tmp + '°F' : ''}`
                addToConcerns(3, safetyConcernMsg)
            }
        })        
    }
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
            />
            Good
        </label>
        <label>
            <input 
                type="radio" 
                name={item.name}  
                value={2} 
                checked={item.level === 2} 
                onChange={() => item.setLevel(2)} 
            />
            Ok
        </label>
        <label>
            <input 
                type="radio" 
                name={item.name} 
                value={3} 
                checked={item.level === 3} 
                onChange={() => item.setLevel(3)} 
            />
            Change fluid
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