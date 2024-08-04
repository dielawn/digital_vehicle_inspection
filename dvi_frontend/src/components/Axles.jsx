import { useEffect, useState } from 'react';
import { reduceNotes, abrevNotes } from '../../utils';

export const Axles = ({ sortConcerns, driveType, setDriveType }) => {
    
    const [axleLF, setAxleLF] = useState(1);
    const [axleRF, setAxleRF] = useState(1);
    const [axleRR, setAxleRR] = useState(1);
    const [axleLR, setAxleLR] = useState(1);
    const [frontDLine, setFrontDLine] = useState(1);
    const [rearDLine, setRearDLine] = useState(1);

    const [notesLF, setNotesLF] = useState('');
    const [notesRF, setNotesRF] = useState('');
    const [notesRR, setNotesRR] = useState('');
    const [notesLR, setNotesLR] = useState('');
    const [notesRDLine, setNotesRDLine] = useState('');
    const [notesFDLine, setNotesFDLine] = useState('');

    const propShafts = [
        { 
            name: 'Left front axle', 
            id: 'lfAxle', 
            axle: axleLF, 
            setAxle: setAxleLF,
            notes: notesLF,
            setNotes: setNotesLF,
            drive: ['FWD', '4WD', 'AWD'] 
        },
        { 
            name: 'Right front axle',
            id: 'rfAxle', 
            axle: axleRF,
            setAxle: setAxleRF, 
            notes: notesRF,
            setNotes: setNotesRF, 
            drive: ['FWD', '4WD', 'AWD'] 
        },
        { 
            name: 'Right rear axle',
            id: 'rrAxle', 
            axle: axleRR,
            setAxle: setAxleRR, 
            notes: notesRR,
            setNotes: setNotesRR, 
            drive: ['RWD', '4WD', 'AWD'] 
        },
        { 
            name: 'Left rear axle', 
            id: 'lrAxle', 
            axle: axleLR,
            setAxle: setAxleLR, 
            notes: notesLR,
            setNotes: setNotesLR, 
            drive: ['RWD', '4WD', 'AWD'] 
        },
        {
            name: 'Front Drive Line', 
            id: 'frontDLine', 
            axle: frontDLine,
            setAxle: setFrontDLine, 
            notes: notesFDLine,
            setNotes: setNotesFDLine, 
            drive: ['4WD'] 
        },
        { 
            name: 'Rear Drive Line', 
            id: 'rearDLine', 
            axle: rearDLine,
            setAxle: setRearDLine, 
            notes: notesRDLine,
            setNotes: setNotesRDLine, 
            drive: ['RWD', '4WD', 'AWD'] 
        },
    ];

    const relevantAxles = propShafts.filter(item => item.drive.includes(driveType))

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };
        
        if (relevantAxles.every((item) => item.axle === relevantAxles[0].axle)) {
            const allNotes = reduceNotes(relevantAxles);
            const msg = `${statusIcon[relevantAxles[0].axle]} Axles & Drive lines${abrevNotes(allNotes)}`
            sortConcerns('underCar', relevantAxles[0].axle, msg)
        } else {
            relevantAxles.forEach(({ name, axle, notes }) => {
                if (statusIcon[axle]) {
                    const msg = `${statusIcon[axle]} ${name}${abrevNotes(notes)}`
                    sortConcerns('underCar', axle, msg)
                }
            })
        }        
    };

    return (
        <fieldset>
            <legend>Axles</legend>
            {!driveType && (
                <>
                    <label>                        
                        <input type='radio' name='driveType' value='fwd' checked={driveType === 'fwd'} onChange={() => setDriveType('fwd')} />
                        Front wheel drive (FWD)
                    </label>
                    <label>                        
                        <input type='radio' name='driveType' value='rwd' checked={driveType === 'rwd'} onChange={() => setDriveType('rwd')} />
                        Rear wheel drive (RWD)
                    </label>
                    <label>                        
                        <input type='radio' name='driveType' value='awd' checked={driveType === 'awd'} onChange={() => setDriveType('awd')} />
                        All wheel drive (AWD)
                    </label>
                    <label>
                        <input type='radio' name='driveType' value='4wd' checked={driveType === '4wd'} onChange={() => setDriveType('4wd')} />
                        Four wheel drive (4x4)                       
                    </label>
                </>
            )}

            {driveType && (
                <>
                    <h3>{driveType.toUpperCase()}</h3>
                    {relevantAxles.map(item => (
                        <div key={item.id}>
                            <h4>{item.name}</h4>
                            <label>                               
                                <input
                                    type='radio'
                                    name={`${item.id}AxleConcern`}
                                    value={1}
                                    checked={item.axle === 1}
                                    onChange={() => item.setAxle(1)}
                                />
                                ✅
                            </label>                       
                            <label>                               
                                <input
                                    type='radio'
                                    name={`${item.id}AxleConcern`}
                                    value={2}
                                    checked={item.axle === 2}
                                    onChange={() => item.setAxle(2)}
                                />
                                🟡
                            </label>                           
                            <label>                               
                                <input
                                    type='radio'
                                    name={`${item.id}AxleConcern`}
                                    value={3}
                                    checked={item.axle === 3}
                                    onChange={() => item.setAxle(3)}
                                />
                                ❌
                            </label>     
                            
                                <label>
                                    Notes:
                                    <textarea
                                        value={item.notes}
                                        onChange={e => item.setNotes(e.target.value)}
                                    />
                                </label>
                            
                        </div>
                    ))}
                </>
            )}
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    );
};
