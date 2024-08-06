import { useEffect, useState } from 'react'
import { reduceNotes, abrevNotes } from '../../utils';

export const WheelBearings = ({ sortConcerns }) => {
    // Play in wheel bearing?
    const [wheelBearingLF, setWheelBearingLF] = useState(1);
    const [wheelBearingRF, setWheelBearingRF] = useState(1);
    const [wheelBearingRR, setWheelBearingRR] = useState(1);
    const [wheelBearingLR, setWheelBearingLR] = useState(1);  

    const [wheelBearingNotesLF, setWheelBearingNotesLF] = useState('');
    const [wheelBearingNotesRF, setWheelBearingNotesRF] = useState('');
    const [wheelBearingNotesRR, setWheelBearingNotesRR] = useState('');
    const [wheelBearingNotesLR, setWheelBearingNotesLR] = useState('');

    // Wheel bearing level 1 === good, 2 === needs attention, 3 === safety concern

    const wheelBearings = [
        {
            name: 'LF wheel bearing',
            bearing: wheelBearingLF,
            setBearing: setWheelBearingLF, 
            notes: wheelBearingNotesLF,
            setNotes: setWheelBearingNotesLF,
            id: 'lfWB'
        },
        {
            name: 'RF wheel bearing',
            bearing: wheelBearingRF,
            setBearing: setWheelBearingRF, 
            notes: wheelBearingNotesRF,
            setNotes: setWheelBearingNotesRF,
            id: 'rfWB'     
        },
        {
            name: 'RR wheel bearing',
            bearing: wheelBearingRR,
            setBearing: setWheelBearingRR, 
            notes: wheelBearingNotesRR,
            setNotes: setWheelBearingNotesRR,
            id: 'rrWB'
        },
        {
            name: 'LR wheel bearing',
            bearing: wheelBearingLR,
            setBearing: setWheelBearingLR, 
            notes: wheelBearingNotesLR,
            setNotes: setWheelBearingNotesLR,
            id: 'lrWB'
        },
    ];

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };
        if (wheelBearings.every((item) => item.bearing === wheelBearings[0].bearing)){
            const allNotes = reduceNotes(wheelBearings);
            const msg = `${statusIcon[wheelBearings[0].bearing]} All Wheel Bearings${abrevNotes(allNotes)}`
            sortConcerns('wheelBearings', wheelBearings[0].bearing, msg)
            return
        } else {
            wheelBearings.forEach(({ name, bearing, notes}) => {
                const msg = `${statusIcon[bearing]} ${name} ${abrevNotes(notes)}`
                sortConcerns('wheelBearings', bearing, msg)
            });
        }
    };

    return (
        <fieldset>
            <legend>Wheel Bearings</legend>
            {wheelBearings.map((item) => (
                <div key={item.id}>
                <p>{item.name}</p>
                <label>
                        <input 
                            type='radio' 
                            name={`${item.id}Radio`} 
                            value={1} 
                            checked={item.bearing === 1} 
                            onChange={() => item.setBearing(1)} 
                        />✅
                    </label>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}Radio`} 
                            value={2} 
                            checked={item.bearing === 2} 
                            onChange={() => item.setBearing(2)} 
                        />🟡
                    </label>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}Radio`} 
                            value={3} 
                            checked={item.bearing === 3} 
                            onChange={() => item.setBearing(3)} 
                        />❌
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