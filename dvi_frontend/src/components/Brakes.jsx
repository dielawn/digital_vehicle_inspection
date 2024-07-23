import { useEffect, useState } from 'react'

export const Brakes = ({ addToConcerns }) => {

    const [isDisc, setIsDisc] = useState(true);

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
            id: 'lfBrakes'
        },
        {
            name: 'Right front',
            isEven: isEvenRF,
            setIsEven: setIsEvenRF,
            pad: padRF,
            setPad: setPadRF,
            id: 'rfBrakes'
        },
        {
            name: 'Right rear',
            isEven: isEvenRR,
            setIsEven: setIsEvenRR,
            pad: padRR,
            setPad: setPadRR,
            id: 'rrBrakes'
        },
        {
            name: 'Left rear',
            isEven: isEvenLR,
            setIsEven: setIsEvenLR,
            pad: padLR,
            setPad: setPadLR,
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
                   <p>Even wear?</p>
                    <label> 
                        <input type='radio' name={`isEvenRadio${item.id}`} value={true} checked={item.isEven} onChange={() => item.setIsEven(true)}/>
                        True
                    </label>
                    <label>
                        <input type='radio' name={`isEvenRadio${item.id}`} value={false} checked={!item.isEven} onChange={() => item.setIsEven(false)}/>
                        False 
                    </label>
                    <label> Pad remaining in mm: 
                        <input 
                            type='text'
                            value={item.pad}
                            onChange={(e) => item.setPad(e.target.value)}
                        />
                    </label>
                </div>
            ))}
            <label>Notes: 
                <input 
                    type='text'
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </label>
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}