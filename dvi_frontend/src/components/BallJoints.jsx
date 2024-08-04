import { useEffect, useState } from 'react'

export const BallJoints = ({ sortConcerns }) => {

    const [upperBallJointLF, setUpperBallJointLF] = useState(1);
    const [upperBallJointRF, setUpperBallJointRF] = useState(1);
    const [lowerBallJointLF, setLowerBallJointLF] = useState(1);
    const [lowerBallJointRF, setLowerBallJointRF] = useState(1);
    
    const [notesUpLF, setNotesUpLF] = useState('');
    const [notesUpRF, setNotesUpRF] = useState('');
    const [notesLwrLF, setNotesLwrLF] = useState('');
    const [notesLwrRF, setNotesLwrRF] = useState('');

    const ballJoints = [
        {
            name: 'Left front upper Ball Joint',
            ballJoint: upperBallJointLF,
            setBallJoint: setUpperBallJointLF,
            notes: notesUpLF,
            setNotes: setNotesUpLF,
            id: 'upBJLF'
        },
        {
            name: 'Left front lower Ball Joint',
            ballJoint: lowerBallJointLF,
            setBallJoint: setLowerBallJointLF,
            notes: notesLwrLF,
            setNotes: setNotesLwrLF,
            id: 'lwrBJLF'
        },
        {
            name: 'Right front upper Ball Joint',
            ballJoint: upperBallJointRF,
            setBallJoint: setUpperBallJointRF,
            notes: notesUpRF,
            setNotes: setNotesUpRF,
            id: 'upBJRF'
        },        
        {
            name: 'Right front lower Ball Joint',
            ballJoint: lowerBallJointRF,
            setBallJoint: setLowerBallJointRF,
            notes: notesLwrRF,
            setNotes: setNotesLwrRF,
            id: 'lwerBJRF'
        },

    ];

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };
        if (ballJoints.every((item) => item.ballJoint === ballJoints[0].ballJoint)) {
            const allNotes = ballJoints.reduce((acc, item) => {
                if (item.notes !== '') {
                    acc.push(item.notes);
                }
                return acc
            }, []).join(', ').replace(/\,(?=[^,]*$)/g, ', ');
            const msg = `${statusIcon[ballJoints[0].ballJoint]} All Ball Joints. ${allNotes}`
            sortConcerns('ballJoints', ballJoints[0].ballJoint, msg)
            return
        } else {
            ballJoints.forEach(({ ballJoint, name, notes }) => {
                if (statusIcon[ballJoint]) {
                    const msg = `${statusIcon[ballJoint]} ${name} ${notes}`
                    sortConcerns('ballJoints', ballJoint, msg)
                }
            });
        }
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
};