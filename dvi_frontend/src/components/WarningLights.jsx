import { useEffect, useState } from 'react'
import { abrevNotes, reduceNotes } from '../../utils';

export const WarningLights = ({ sortConcerns }) => {
    const [isCEL, setIsCEL] = useState(false);
    const [isABS, setIsABS] = useState(false);
    const [isTPMS, setIsTPMS] = useState(false);
    const [isTRAC, setIsTRAC] = useState(false);
    const [isAirbag, setIsAirbag] = useState(false);
    const [isOther, setIsOther] = useState(false);

    const [otherNote, setOtherNote] = useState('');
    const [notes, setNotes] = useState('');

    const warningOptions = [ 
        { name: 'CEL', state: isCEL, setState: setIsCEL, id: 'cel' },
        { name: 'ABS', state: isABS, setState: setIsABS, id: 'abs' },
        { name: 'TPMS', state: isTPMS, setState: setIsTPMS, id: 'tpms' },
        { name: 'Traction', state: isTRAC, setState: setIsTRAC, id: 'trac' },
        { name: 'Airbag', state: isAirbag, setState: setIsAirbag, id: 'airbag' },
        { name: otherNote ? otherNote : 'Other', state: isOther, setState: setIsOther, id:'other' }
    ];

    const handleResults = () => {
        const results = warningOptions.filter((option) => option.state)
        if (results.length === 0) {
            sortConcerns('warningLights', 1, '✅ No Warning Lights')
        } else {
            const msg = 
            `🟡 ${results.map((result) => result.name).join(', ')} ${abrevNotes(notes)}\n Recommend diagnostics.`;        
            sortConcerns('warningLights', 2, msg)
        }       
    }


    return (
        <fieldset >
            
            <legend>Warning lights: <em>Check if illuminated</em></legend>
            
          {warningOptions.map((warningOption) => (
                <div key={warningOption.id}>
                    <label htmlFor={warningOption.id}>{warningOption.name}</label>
                    <input 
                        type='checkbox'
                        id={warningOption.id}
                        checked={warningOption.state}
                        onChange={(e) => warningOption.setState(e.target.checked)}
                    />
                </div>
            ))}
            {isOther && 
                <>
                    <label htmlFor='otherInput'>Other lights: </label>
                    <input
                        id='otherInput'
                        value={otherNote}
                        onChange={(e) => setOtherNote(e.target.value)}
                    />
                </>
            }
            <label htmlFor="techInput">Tech Notes: </label>
            <textarea 
                name="techInput" 
                id="techInput"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}   
            />
            <button type='button' onClick={handleResults}>test message</button>

        </fieldset>
    )
};