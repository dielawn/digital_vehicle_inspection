import { useEffect, useState } from 'react'

export const BallJoints = ({ addToConcerns }) => {

    const [upperBallJointLF, setUpperBallJointLF] = useState(1);
    const [upperBallJointRF, setUpperBallJointRF] = useState(1);
    const [lowerBallJointLF, setLowerBallJointLF] = useState(1);
    const [lowerBallJointRF, setLowerBallJointRF] = useState(1);
    
    const [noteUpLF, setNoteUpLF] = useState('');
    const [noteUpRF, setNoteUpRF] = useState('');
    const [noteLwrLF, setNoteLwrLF] = useState('');
    const [noteLwrRF, setNoteLwrRF] = useState('');

    const ballJoints = [
        {
            name: 'Left front upper Ball Joint',
            ballJoint: upperBallJointLF,
            setBallJoint: setUpperBallJointLF,
            note: noteUpLF,
            setNote: setNoteUpLF,
            id: 'upBJLF'
        },
        {
            name: 'Left front lower Ball Joint',
            ballJoint: lowerBallJointLF,
            setBallJoint: setLowerBallJointLF,
            note: noteLwrLF,
            setNote: setNoteLwrLF,
            id: 'lwrBJLF'
        },
        {
            name: 'Right front upper Ball Joint',
            ballJoint: upperBallJointRF,
            setBallJoint: setUpperBallJointRF,
            note: noteUpRF,
            setNote: setNoteUpRF,
            id: 'upBJRF'
        },        
        {
            name: 'Right front lower Ball Joint',
            ballJoint: lowerBallJointRF,
            setBallJoint: setLowerBallJointRF,
            note: noteLwrRF,
            setNote: setNoteLwrRF,
            id: 'lwerBJRF'
        },

    ];

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };

        ballJoints.forEach(({ ballJoint, name, note }) => {
            if (statusIcon[ballJoint]) {
                const msg = `${statusIcon[ballJoint]} ${name} ${note}`
                addToConcerns(ballJoint, msg)
            }
        })
    };
    

    return (
        <fieldset>
            <legend>Ball Joints</legend>
             {ballJoints.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}Radio`} 
                            value={1} 
                            checked={item.ballJoint === 1} 
                            onChange={() => item.setBallJoint(1)}/>
                        ✅
                    </label>
                    <label>  
                        <input 
                            type='radio' 
                            name={`${item.id}Radio`} 
                            value={2} 
                            checked={item.ballJoint === 2} 
                            onChange={() => item.setBallJoint(2)}/>
                        🟡
                    </label>
                    <label>  
                        <input 
                            type='radio' 
                            name={`${item.id}Radio`} 
                            value={3} 
                            checked={item.ballJoint === 3} 
                            onChange={() => item.setBallJoint(3)}/>
                        ❌
                    </label>
                    
                    <label>Note: 
                        <textarea 
                            value={item.note} 
                            onChange={(e) => item.setNote(e.target.value)}
                        />                        
                    </label>
                        
                </div>
            ))}
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
};