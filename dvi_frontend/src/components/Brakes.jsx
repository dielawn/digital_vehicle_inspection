import { useEffect, useState } from 'react'

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
            name: 'Left front brakes',
            pad: padLF,
            setPad: setPadLF,
            brakes: brakesLF,
            setBrakes: setBrakesLF,
            notes: notesLF,
            setNotes: setNotesLF,
            id: 'lfBrakes'
        },
        {
            name: 'Right front brakes',
            pad: padRF,
            setPad: setPadRF,
            brakes: brakesRF,
            setBrakes: setBrakesRF,
            notes: notesRF,
            setNotes: setNotesRF,
            id: 'rfBrakes'
        },
        {
            name: 'Right rear brakes',
            pad: padRR,
            setPad: setPadRR,
            brakes: brakesRR,
            setBrakes: setBrakesRR,
            notes: notesRR,
            setNotes: setNotesRR,
            id: 'rrBrakes'
        },
        {
            name: 'Left rear brakes',
            pad: padLR,
            setPad: setPadLR,
            brakes: brakesLR,
            setBrakes: setBrakesLR,
            notes: notesLR,
            setNotes: setNotesLR,
            id: 'lrBrakes'
        },
    ];

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };

        brakes.forEach(({ name, pad, brakes, notes }) => {
            if (statusIcon[brakes]) {                
                const msg = `${statusIcon[brakes]} ${name} ${pad}mm pad/shoe remaining, ${notes}`
                sortConcerns('brakes', brakes, msg)
            }
        })
    }

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
}