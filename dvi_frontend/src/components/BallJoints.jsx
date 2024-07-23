import { useEffect, useState } from 'react'

export const BallJoints = ({ addToConcerns }) => {

    const [upperBallJointLF, setUpperBallJointLF] = useState(false);
    const [upperBallJointRF, setUpperBallJointRF] = useState(false);
    const [lowerBallJointLF, setLowerBallJointLF] = useState(false);
    const [lowerBallJointRF, setLowerBallJointRF] = useState(false);

    const ballJoints = [
        {
            name: 'Left front Ball Joints',
            upper: upperBallJointLF,
            setUpper: setUpperBallJointLF,
            lower: lowerBallJointLF,
            setLower: setLowerBallJointLF,
            id: 'lfBJ'
        },
        {
            name: 'Right front Ball Joints',
            upper: upperBallJointRF,
            setUpper: setUpperBallJointRF,
            lower: lowerBallJointRF,
            setLower: setLowerBallJointRF,
            id: 'rfBJ'
        },

    ];

    const handleResults = () => {
        ballJoints.map((item) => {
            let msg = '';
            if (item.upper && item.lower) {
                // Both upper and lower have excessive play
                msg = `❌ ${item.name} upper & lower have excessive play.`;
                addToConcerns(3, msg);
            } else if (item.upper || item.lower) {
                // Either upper or lower has excessive play
                msg = `🟡 ${item.name} ${item.upper ? 'upper' : 'lower'} has excessive play.`;
                addToConcerns(2, msg);
            } else {
                // Both upper and lower pass
                msg = `✅ ${item.name} upper & lower.`;
                addToConcerns(1, msg);
            }
        });
    };
    

    return (
        <fieldset>
            <legend>Ball Joints</legend>
             {ballJoints.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                   <p>Upper has play?</p>
                        <label>
                            <input type='radio' name={`${item.id}UpBJRadio`} value={true} checked={item.upper} onChange={() => item.setUpper(true)}/>
                            True
                        </label>
                        <label>  
                            <input type='radio' name={`${item.id}UpBJRadio`} value={false} checked={!item.upper} onChange={() => item.setUpper(false)}/>
                            False
                        </label>
                        <p>Lower has play?</p>
                        <label>
                            <input type='radio' name={`${item.id}LwrBJRadio`} value={true} checked={item.lower} onChange={() => item.setLower(true)}/>
                            True
                        </label>
                        <label>
                            <input type='radio' name={`${item.id}LwrBJRadio`} value={false} checked={!item.lower} onChange={() => item.setLower(false)}/>
                            False
                        </label>
                        <hr></hr>
                </div>
            ))}
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
};