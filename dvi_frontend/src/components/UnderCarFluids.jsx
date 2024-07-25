import { useEffect, useState } from 'react';

export const UnderCarFluids = ({ addToConcerns, driveType }) => {
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
            text: 'Front diff fluid', 
            note: frontDiffNotes, 
            setNote: setFrontDiffNotes,
            id: 'fDFluid',
            drive: ['4WD']
        },
        {
            fluid: rearDiffFluid, 
            setFluid: setRearDiffFluid, 
            text: 'Rear diff fluid', 
            note: rearDiffNotes, 
            setNote: setRearDiffNotes,
            id: 'rDFluid',
            drive: ['AWD', '4WD', 'RWD']
        },
        {
            fluid: tCaseFluid, 
            setFluid: setTCaseFluid, 
            text: 'Transfer case fluid', 
            note: tCaseNotes, 
            setNote: setTCaseNotes,
            id: 'tCaseFluid',
            drive: ['AWD', '4WD']
        },
    ];

    const Fluids = () => {
        return (
            fluids.filter(fluid => fluid.drive.includes(driveType))
                .map(item => (
                    <div key={item.id}>
                        <h3>{item.text}</h3>
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
                        <label>{item.text} Notes
                            <textarea 
                                value={item.note}
                                onChange={(e) => item.setNote(e.target.value)}
                            />
                        </label>
                    </div>
                ))
        );
    };
    

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };
        
        fluids.filter(fluid => fluid.drive.includes(driveType))
            .forEach(({ fluid, text, note }) => {
                if (statusIcon[fluid]) {
                    const msg = `${statusIcon[fluid]} ${text}. ${note}`;
                    addToConcerns(fluid, msg);
                }
        });
    };

    return (
        <fieldset>
            <legend>Under Car Fluids</legend>
            <Fluids />
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    );
};
