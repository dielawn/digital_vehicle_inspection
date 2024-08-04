import { useEffect, useState } from 'react';
import { reduceNotes, abrevNotes } from '../../utils';

export const UnderCarFluids = ({ sortConcerns, driveType }) => {
    const [frontDiffFluid, setFrontDiffFluid] = useState(1);
    const [rearDiffFluid, setRearDiffFluid] = useState(1);
    const [tCaseFluid, setTCaseFluid] = useState(1);

    const [frontDiffNotes, setFrontDiffNotes] = useState('');
    const [rearDiffNotes, setRearDiffNotes] = useState('');
    const [tCaseNotes, setTCaseNotes] = useState('');

    const fluids = [
        {
            fluid: frontDiffFluid, 
            setFluid: setFrontDiffFluid, 
            name: 'Front diff fluid', 
            notes: frontDiffNotes, 
            setNotes: setFrontDiffNotes,
            id: 'fDFluid',
            drive: ['4WD']
        },
        {
            fluid: rearDiffFluid, 
            setFluid: setRearDiffFluid, 
            name: 'Rear diff fluid', 
            notes: rearDiffNotes, 
            setNotes: setRearDiffNotes,
            id: 'rDFluid',
            drive: ['AWD', '4WD', 'RWD']
        },
        {
            fluid: tCaseFluid, 
            setFluid: setTCaseFluid, 
            name: 'Transfer case fluid', 
            notes: tCaseNotes, 
            setNotes: setTCaseNotes,
            id: 'tCaseFluid',
            drive: ['AWD', '4WD']
        },
    ];

    const relevantFluids = fluids.filter(item => item.drive.includes(driveType))
   
    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };
        
        if (relevantFluids.every(item => item.fluid === relevantFluids[0].fluid)) {
            const allNotes = reduceNotes(relevantFluids)
            const fluidNames = relevantFluids.map(item => item.name).join(', ')
            const msg = `${statusIcon[relevantFluids[0].fluid]} ${fluidNames}${abrevNotes(allNotes)}`
            sortConcerns('underCar', relevantFluids[0].fluid, msg)
        } else {
            relevantFluids.forEach(({ fluid, name, notes }) => {
                if (statusIcon[fluid]) {
                    const msg = `${statusIcon[fluid]} ${name}${abrevNotes(notes)}}`;
                    sortConcerns('underCar', fluid, msg);
                }
        });
        }      
    };

    return (
        <fieldset>
            <legend>Under Car Fluids</legend>
            {relevantFluids && relevantFluids.map(item => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <label>
                            <input 
                                type='radio'
                                name={`${item.id}Radio`}
                                value={1}
                                onChange={() => {item.setFluid(1)}}
                                checked={item.fluid === 1}
                            />✅
                        </label>
                        <label>
                            <input 
                                type='radio'
                                name={`${item.id}Radio`}
                                value={2}
                                onChange={() => {item.setFluid(2)}}
                                checked={item.fluid === 2}
                            />🟡
                        </label>
                        <label>
                            <input 
                                type='radio'
                                name={`${item.id}Radio`}
                                value={3}
                                onChange={() => {item.setFluid(3)}}
                                checked={item.fluid === 3}
                            />❌
                        </label>
                        <label>Notes
                            <textarea 
                                value={item.notes}
                                onChange={(e) => item.setNotes(e.target.value)}
                            />
                        </label>
                    </div>
                ))}
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    );
};
