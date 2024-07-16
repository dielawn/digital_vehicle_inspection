import { useEffect, useState } from 'react'

export const Axles = ({ addToConcerns }) => {

    const [axleLF, setAxleLF] = useState(false);
    const [axleRF, setAxleRF] = useState(false);
    const [axleRR, setAxleRR] = useState(false);
    const [axleLR, setAxleLR] = useState(false);

    const [notes, setNotes] = useState('');

    const [driveType, setDriveType] = useState(null);

    const axles = [
        {
            name: 'Left front ',
            id: 'lfAxle',
            axle: axleLF,
            setAxle: setAxleLF,
        },
        {
            name: 'Right front ',
            id: 'rfAxle',
            axle: axleRF,
            setAxle: setAxleRF,
        },
        {
            name: 'Right rear ',
            id: 'rrAxle',
            axle: axleRR,
            setAxle: setAxleRR,
        },
        {
            name: 'Left rear ',
            id: 'lrAxle',
            axle: axleLR,
            setAxle: setAxleLR,
        },
    ];

    const resetDriveType = () => setDriveType(null);

    return (
        <fieldset>
            <legend>Axles</legend>
            
           {!driveType && 
            <>
                <label>Front wheel drive (FWD)
                    <input type='radio' name='driveTypeFWD' value={'fwd'} checked={driveType === 'fwd'} onChange={() => setDriveType('fwd')}/>
                </label>
                <label>Rear wheel drive (RWD)  
                    <input type='radio' name='driveTypeRWD' value={'rwd'} checked={driveType === 'rwd'} onChange={() => setDriveType('rwd')}/>
                </label>
                <label>All wheel drive (AWD)
                    <input type='radio' name='driveTypeAWD' value={'awd'} checked={driveType === 'awd'} onChange={() => setDriveType('awd')}/>
                </label>
                <label>Four wheel drive (4x4)  
                    <input type='radio' name='driveType4WD' value={'4wd'} checked={driveType === '4wd'} onChange={() => setDriveType('4wd')}/>
                </label>
            </>
           }
            {driveType && 
                <>
                    <h3>{driveType}</h3>
                    <button type="button" onClick={resetDriveType}>Edit drive type</button>
                    <hr />
                    {axles.map((item) => (
                        <div key={item.id}>
                            <h4>{item.name} axle concern?</h4>
                            <label>True
                                <input />
                            </label>
                            <label>False
                                <input />
                            </label>

                        </div>
                    ))}
                </>
            }
        </fieldset>
    )
}