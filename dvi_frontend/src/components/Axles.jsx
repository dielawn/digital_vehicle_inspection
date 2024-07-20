import { useEffect, useState } from 'react';

export const Axles = ({ addToConcerns }) => {
    const [driveType, setDriveType] = useState(null);
    const [selectedAxles, setSelectedAxles] = useState([]);

    const initialAxles = [
        { name: 'Left front', id: 'lfAxle', axle: 1, notes: '' },
        { name: 'Right front', id: 'rfAxle', axle: 1, notes: '' },
        { name: 'Right rear', id: 'rrAxle', axle: 1, notes: '' },
        { name: 'Left rear', id: 'lrAxle', axle: 1, notes: '' },
        { name: 'Front Drive Line', id: 'frontDLine', axle: 1, notes: '' },
        { name: 'Rear Drive Line', id: 'rearDLine', axle: 1, notes: '' },
    ];

    useEffect(() => {
        let tempArray = [];
        if (driveType === 'fwd') {
            tempArray = initialAxles.slice(0, 2);
        } else if (driveType === 'rwd') {
            tempArray = [initialAxles[2], initialAxles[3], initialAxles[5]];
        } else if (driveType === '4wd') {
            tempArray = initialAxles;
        } else if (driveType === 'awd') {
            tempArray = [initialAxles[0], initialAxles[1], initialAxles[2], initialAxles[3], initialAxles[5]];
        }
        setSelectedAxles(tempArray);
    }, [driveType]);

    const resetDriveType = () => setDriveType(null);

    const handleAxleChange = (id, value) => {
        setSelectedAxles(prevState =>
            prevState.map(axle => (axle.id === id ? { ...axle, axle: value } : axle))
        );
    };

    const handleNotesChange = (id, notes) => {
        setSelectedAxles(prevState =>
            prevState.map(axle => (axle.id === id ? { ...axle, notes } : axle))
        );
    };

    const handleResults = () => {
        selectedAxles.map((item) => {
            let msg = ``;
            console.log(item.name)
            if (item.axle === 3) {
                msg = `❌  ${item.name} ${item.name === 'Rear Drive Line' || item.name === 'Front Drive Line' ? '' : ' axle'} ${item.notes}`
                addToConcerns(3, msg)
            } else if (item.axle === 2) {
                msg = `🟡 ${item.name}  ${item.name === 'Rear Drive Line' || item.name === 'Front Drive Line' ? '' : ' axle'}  ${item.notes}`
                addToConcerns(2, msg)
            } else {
                msg = `✅ ${item.name} ${item.name === 'Rear Drive Line' || item.name === 'Front Drive Line' ? '' : ' axle'} `
                addToConcerns(1, msg)
            }
        })
        

    }

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
                    <button type="button" onClick={resetDriveType}>Edit drive type</button>
                    <hr />
                    {selectedAxles.map(item => (
                        <div key={item.id}>
                            <h4>{item.name} concern?</h4>
                            <label>                               
                                <input
                                    type='radio'
                                    name={`${item.id}AxleConcern`}
                                    value={3}
                                    checked={item.axle === 3}
                                    onChange={() => handleAxleChange(item.id, 3)}
                                />
                                Safety concern
                            </label>                            
                            <label>                               
                                <input
                                    type='radio'
                                    name={`${item.id}AxleConcern`}
                                    value={2}
                                    checked={item.axle === 2}
                                    onChange={() => handleAxleChange(item.id, 2)}
                                />
                                Needs attention
                            </label>                           
                            <label>                               
                                <input
                                    type='radio'
                                    name={`${item.id}AxleConcern`}
                                    value={1}
                                    checked={item.axle === 1}
                                    onChange={() => handleAxleChange(item.id, 1)}
                                />
                                No concern
                            </label>
                            {item.axle > 1 && (
                                <label>
                                    {item.name} notes:
                                    <textarea
                                        value={item.notes}
                                        onChange={e => handleNotesChange(item.id, e.target.value)}
                                    />
                                </label>
                            )}
                        </div>
                    ))}
                </>
            )}
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    );
};
