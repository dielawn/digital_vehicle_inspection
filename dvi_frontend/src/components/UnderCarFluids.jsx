import { useEffect, useState } from 'react'

export const UnderCarFluids = ({ addToConcerns, driveType }) => {

    const [frontDiffFluid, setFrontDiffFluid] = useState(1);
    const [rearDiffFluid, setRearDiffFluid] = useState(1);
    const [tCaseFluid, setTCaseFluid] = useState(1);

    const [notes, setNotes] = useState('');

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
                    />Good
                </label>
                <label>
                    <input 
                        type='radio'
                        name='frontDiffRadio'
                        value={2}
                        onChange={() => setFrontDiffFluid(2)}
                        checked={frontDiffFluid === 2}
                    />Needs attention
                </label>
                <label>
                    <input 
                        type='radio'
                        name='frontDiffRadio'
                        value={3}
                        onChange={() => setFrontDiffFluid(3)}
                        checked={frontDiffFluid === 3}
                    />Needs immediate attention
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
                    />Good
                </label>
                <label>
                    <input 
                        type='radio'
                        name='rearDiffRadio'
                        value={2}
                        onChange={() => setRearDiffFluid(2)}
                        checked={rearDiffFluid === 2}
                    />Needs attention
                </label>
                <label>
                    <input 
                        type='radio'
                        name='rearDiffRadio'
                        value={3}
                        onChange={() => setRearDiffFluid(3)}
                        checked={rearDiffFluid === 3}
                    />Needs immediate attention
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
                    />Good
                </label>
                <label>
                    <input 
                        type='radio'
                        name='tCaseRadio'
                        value={2}
                        onChange={() => setTCaseFluid(2)}
                        checked={tCaseFluid === 2}
                    />Needs attention
                </label>
                <label>
                    <input 
                        type='radio'
                        name='tCaseRadio'
                        value={3}
                        onChange={() => setTCaseFluid(3)}
                        checked={tCaseFluid === 3}
                    />Needs immediate attention
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
        let msg = ''
        const fDiffTxt = 'Front diff fluid'
        const rDiffTxt = 'Rear diff fluid'
        const tCaseTxt = 'Transfer case fluid'
        if (frontDiffFluid === 3 || rearDiffFluid === 3 || tCaseFluid === 3) {
            msg = `❌ ${frontDiffFluid === 3 ? fDiffTxt : ''} ${rearDiffFluid === 3 ? rDiffTxt : ''} ${tCaseFluid === 3 ? tCaseTxt : ''} ${notes}`
            addToConcerns(3, msg)
        } else if (frontDiffFluid === 2 || rearDiffFluid === 2 || tCaseFluid === 2) {
            msg = `🟡 ${frontDiffFluid === 2 ? fDiffTxt : ''} ${rearDiffFluid === 2 ? rDiffTxt : ''} ${tCaseFluid === 2 ? tCaseTxt : ''} ${notes}`
            addToConcerns(2, msg)
        } else {
            msg = `✅ ${frontDiffFluid === 1 ? fDiffTxt : ''} ${rearDiffFluid === 1 ? rDiffTxt : ''} ${tCaseFluid === 1 ? tCaseTxt : ''} ${notes}`
            addToConcerns(1, msg)
        }
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
                    <FrontDiff />
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