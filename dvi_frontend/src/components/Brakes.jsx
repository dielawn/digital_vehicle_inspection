import { useEffect, useState } from 'react'
import { reduceNotes, abrevNotes } from '../../utils';

export const Brakes = ({ sortConcerns }) => {

    const [isDisc, setIsDisc] = useState(true);

    const [brakesLF, setBrakesLF] = useState(1);
    const [brakesRF, setBrakesRF] = useState(1);
    const [brakesRR, setBrakesRR] = useState(1);
    const [brakesLR, setBrakesLR] = useState(1);

    const [notesLF, setNotesLF] = useState('');
    const [notesRF, setNotesRF] = useState('');
    const [notesRR, setNotesRR] = useState('');
    const [notesLR, setNotesLR] = useState('');

    const [isEvenLF, setIsEvenLF] = useState(true);
    const [isEvenRF, setIsEvenRF] = useState(true);
    const [isEvenRR, setIsEvenRR] = useState(true);
    const [isEvenLR, setIsEvenLR] = useState(true);

    const [padLF, setPadLF] = useState(8);
    const [padRF, setPadRF] = useState(8);
    const [padRR, setPadRR] = useState(8);
    const [padLR, setPadLR] = useState(8);

  
    const brakes = [
        {
            name: 'Left front',
            pad: padLF,
            setPad: setPadLF,
            brakes: brakesLF,
            setBrakes: setBrakesLF,
            notes: notesLF,
            setNotes: setNotesLF,
            id: 'lfBrakes'
        },
        {
            name: 'Right front',
            pad: padRF,
            setPad: setPadRF,
            brakes: brakesRF,
            setBrakes: setBrakesRF,
            notes: notesRF,
            setNotes: setNotesRF,
            id: 'rfBrakes'
        },
        {
            name: 'Right rear',
            pad: padRR,
            setPad: setPadRR,
            brakes: brakesRR,
            setBrakes: setBrakesRR,
            notes: notesRR,
            setNotes: setNotesRR,
            id: 'rrBrakes'
        },
        {
            name: 'Left rear',
            pad: padLR,
            setPad: setPadLR,
            brakes: brakesLR,
            setBrakes: setBrakesLR,
            notes: notesLR,
            setNotes: setNotesLR,
            id: 'lrBrakes'
        },
    ];

    // useEffect(() => {
    //     if ((Math.abs(padLF, padRF) <= 2) || padLF < 2 || padRF < 2) {
    //         setBrakesLF(3)
    //         setBrakesRF(3)
    //     }
    // }, [padLF, padRF])

    // useEffect(() => {
    //     if ((Math.abs(padLR, padRR) <= 2 ) || padLR < 2 || padRR < 2) {
    //         setBrakesLR(3)
    //         setBrakesRR(3)
    //     }
    // }, [padRR, padLR])

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };
        const frontBrakes = [brakes[0], brakes[1]]
        const rearBrakes = [brakes[2], brakes[3]]
        if (brakes[0].brakes === brakes[1].brakes) {            
            const frontNotes = reduceNotes(frontBrakes);
            const padMsg = `${brakes[0].pad === brakes[1].pad ? `${brakes[0].pad}mm pad/shoe remaining` : `LF ${brakes[0].pad}mm, RF ${brakes[1].pad}mm pad/shoe remaining`}`
            const frontBrakeMsg = `Front brakes ${padMsg}${abrevNotes(frontNotes)}`
            const msg = `${statusIcon[brakes[0].brakes]} ${frontBrakeMsg}`
            sortConcerns('brakes', brakes[0].brakes, msg)
            
        } else {
            frontBrakes.forEach(({ name, pad, brakes, notes }) => {
                if (statusIcon[brakes]) {                
                    const msg = `${statusIcon[brakes]} ${name} ${pad}mm pad/shoe remaining${abrevNotes(notes)}`
                    sortConcerns('brakes', brakes, msg)
                }
            })
        }
        if (brakes[2].brakes === brakes[3].brakes) {
            const rearBrakes = [brakes[2], brakes[3]]
            const rearNotes = reduceNotes(rearBrakes);
            const padMsg = `${brakes[2].pad === brakes[3].pad ? `${brakes[2].pad}mm pad/shoe remaining` : `LR ${brakes[2].pad}mm, RR ${brakes[3].pad}mm pad/shoe remaining`}`
            const rearBrakeMsg = `Rear brakes  ${padMsg}${abrevNotes(rearNotes)}`
            const msg = `${statusIcon[brakes[2].brakes]} ${rearBrakeMsg}`
            sortConcerns('brakes', brakes[2].brakes, msg)
            
        } else {
            rearBrakes.forEach(({ name, pad, brakes, notes }) => {
                if (statusIcon[brakes]) {                
                    const msg = `${statusIcon[brakes]} ${name} ${pad}mm pad/shoe remaining, ${abrevNotes(notes)}`
                    sortConcerns('brakes', brakes, msg)
                }
            })
        }        
    };

    return (
        <fieldset>
            <legend>Brakes: <em>Are the brake pads within 1 mm of each other?</em></legend>
           
            {brakes.map((item) => (
                <div key={item.id}>
                    <h4>{item.name}</h4>

                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}StatusRadio`} 
                            value={1} 
                            checked={item.brakes === 1} 
                            onChange={() => item.setBrakes(1)}
                        />
                        ✅
                    </label>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}StatusRadio`} 
                            value={2} 
                            checked={item.brakes === 2} 
                            onChange={() => item.setBrakes(2)}
                        />
                        🟡 
                    </label>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}StatusRadio`} 
                            value={3} 
                            checked={item.brakes === 3} 
                            onChange={() => item.setBrakes(3)}
                        />
                        ❌ 
                    </label>                   
                    <label> Pad remaining in mm: 
                        <input 
                            type='text'
                            value={item.pad}
                            onChange={(e) => item.setPad(e.target.value)}
                        />
                    </label>
                    <label>Notes: 
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
};