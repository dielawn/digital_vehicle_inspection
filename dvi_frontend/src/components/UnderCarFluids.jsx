import { useEffect, useState } from 'react'

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
            id: 'fDFluid'
        },
        {
            fluid: rearDiffFluid, 
            setFluid: setRearDiffFluid, 
            text: 'Rear diff fluid', 
            note: rearDiffNotes, 
            setNote: setRearDiffNotes,
            id: 'rDFluid'},
        {
            fluid: tCaseFluid, 
            setFluid: setTCaseFluid, 
            text: 'Transfer case fluid', 
            note: tCaseNotes, 
            setNote: setTCaseNotes,
            id: 'tCaseFluid'},
    ];


    const Fluids = () => {
        return (
            fluids.map((item) => (
                <div key={item.id}>
                <h3>{item.text}</h3>
                <label>
                    <input 
                        type='radio'
                        name={`${item.id}Radio`}
                        value={1}
                        onChange={() => setFluid(1)}
                        checked={item.fluid === 1}
                    />✅
                </label>
                <label>
                    <input 
                        type='radio'
                        name={`${item.id}Radio`}
                        value={2}
                        onChange={() => setFluid(2)}
                        checked={item.fluid === 2}
                    />🟡
                </label>
                <label>
                    <input 
                        type='radio'
                        name={`${item.id}Radio`}
                        value={3}
                        onChange={() => setFluid(3)}
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
        )
    }

    const FrontDiff = () => {
        return (
            <div>
                <h3>Front diff fluid</h3>
                <label>
                    <input 
                        type='radio'
                        name='frontDiffRadio'
                        value={1}
                        onChange={() => setFrontDiffFluid(1)}
                        checked={frontDiffFluid === 1}
                    />✅
                </label>
                <label>
                    <input 
                        type='radio'
                        name='frontDiffRadio'
                        value={2}
                        onChange={() => setFrontDiffFluid(2)}
                        checked={frontDiffFluid === 2}
                    />🟡
                </label>
                <label>
                    <input 
                        type='radio'
                        name='frontDiffRadio'
                        value={3}
                        onChange={() => setFrontDiffFluid(3)}
                        checked={frontDiffFluid === 3}
                    />❌
                </label>
                <label>Notes
                <textarea 
                    value={frontDiffNotes}
                    onChange={(e) => setFrontDiffNotes(e.target.value)}
                />
            </label>
            </div>
        )
    }

    const RearDiff = () => {
        return (
            <div>
                <h3>Rear diff fluid</h3>
                <label>
                    <input 
                        type='radio'
                        name='rearDiffRadio'
                        value={1}
                        onChange={() => setRearDiffFluid(1)}
                        checked={rearDiffFluid === 1}
                    />✅
                </label>
                <label>
                    <input 
                        type='radio'
                        name='rearDiffRadio'
                        value={2}
                        onChange={() => setRearDiffFluid(2)}
                        checked={rearDiffFluid === 2}
                    />🟡
                </label>
                <label>
                    <input 
                        type='radio'
                        name='rearDiffRadio'
                        value={3}
                        onChange={() => setRearDiffFluid(3)}
                        checked={rearDiffFluid === 3}
                    />❌
                </label>
                <label>Notes
                <textarea 
                    value={rearDiffNotes}
                    onChange={(e) => setRearDiffNotes(e.target.value)}
                />
            </label>
            </div>
        )
    }

    const TransferCase = () => {
        return (
            <div>
                <h3>Transfer case fluid</h3>
                <label>
                    <input 
                        type='radio'
                        name='tCaseRadio'
                        value={1}
                        onChange={() => setTCaseFluid(1)}
                        checked={tCaseFluid === 1}
                    />✅
                </label>
                <label>
                    <input 
                        type='radio'
                        name='tCaseRadio'
                        value={2}
                        onChange={() => setTCaseFluid(2)}
                        checked={tCaseFluid === 2}
                    />🟡
                </label>
                <label>
                    <input 
                        type='radio'
                        name='tCaseRadio'
                        value={3}
                        onChange={() => setTCaseFluid(3)}
                        checked={tCaseFluid === 3}
                    />❌
                </label>
                <label>Notes
                <textarea 
                    value={tCaseNotes}
                    onChange={(e) => setTCaseNotes(e.target.value)}
                />
            </label>
            </div>
        )
    }

    const Notes = () => {
        return (
            <label>Notes
                <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </label>
        )
    }

    const handleResults = () => {
      
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        }
        fluids.forEach(({ fluid, text, note }) => {
            if (statusIcon[fluid]) {
                const msg = `${statusIcon[fluid]} ${text}. ${note}`
                addToConcerns(fluid, msg)
            }
        })
    }

    return (
        <fieldset>
            <legend>Under Car Fluids</legend>
            {driveType === 'FWD' && 
                <div>
                    <Notes />
                </div>
            }
            {driveType === 'RWD' && 
                <div>
                    <RearDiff />
                    <Notes />
                </div>
            }
             {driveType === 'AWD' && 
                <div>
                    <TransferCase />
                    <RearDiff />
                    <Notes />
                </div>
            }
             {driveType === '4WD' && 
                <div>
                    <FrontDiff />
                    <TransferCase />
                    <RearDiff />
                    <Notes />
                </div>
            }
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}