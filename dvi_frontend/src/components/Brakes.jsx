import { useEffect, useState } from 'react'

export const Brakes = ({ addToConcerns }) => {

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

    const [notes, setNotes] = useState('');

    const brakes = [
        {
            name: 'Left front',
            isEven: isEvenLF,
            setIsEven: setIsEvenLF,
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
            isEven: isEvenRF,
            setIsEven: setIsEvenRF,
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
            isEven: isEvenRR,
            setIsEven: setIsEvenRR,
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
            isEven: isEvenLR,
            setIsEven: setIsEvenLR,
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
        
        let msg = ''
        brakes.map((item) => {
            const inspData =   `${item.name} ${item.pad}mm brake pad remaining. ${!item.isEven ? ' Uneven pad wear. ' : ''} `
            if (item.pad <= 2) {
                msg = `❌ ${inspData } ${notes}`
                addToConcerns(3, msg)
            } else if (item.pad === 3 || item.pad === 4 || !item.isEven) {
                msg = `🟡 ${inspData} ${notes}`
                addToConcerns(2, msg)
            } else {
                msg = `✅  ${inspData}`
                addToConcerns(1, msg)
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
                    {item.brakes > 1 && 
                        <>
                            <p>Even wear?</p>
                            <label> 
                                <input 
                                    type='radio' 
                                    name={`isEvenRadio${item.id}`} 
                                    value={true} checked={item.isEven} 
                                    onChange={() => item.setIsEven(true)}
                                />
                                True
                            </label>
                            <label>
                                <input 
                                    type='radio' 
                                    name={`isEvenRadio${item.id}`} 
                                    value={false} checked={!item.isEven} 
                                    onChange={() => item.setIsEven(false)}
                                />
                                False 
                            </label>
                        </>
                    }
                </div>
            ))}
            
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}