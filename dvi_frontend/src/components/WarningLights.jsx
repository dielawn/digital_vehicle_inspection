import { useEffect, useState } from 'react'

export const WarningLights = ({ addToConcerns }) => {
    const [isPass, setIsPass] = useState(false);
    const [isCEL, setIsCEL] = useState(false);
    const [isABS, setIsABS] = useState(false);
    const [isTPMS, setIsTPMS] = useState(false);
    const [isTRAC, setIsTRAC] = useState(false);
    const [isAirbag, setIsAirbag] = useState(false);
    const [isOther, setIsOther] = useState(false);

    const [otherNote, setOtherNote] = useState('');
    const [techNote, setTechNote] = useState('');

    const warningOptions = [ 
        { name: 'Pass', state: isPass, setState: setIsPass },
        { name: 'CEL', state: isCEL, setState: setIsCEL },
        { name: 'ABS', state: isABS, setState: setIsABS },
        { name: 'TPMS', state: isTPMS, setState: setIsTPMS },
        { name: 'Traction', state: isTRAC, setState: setIsTRAC },
        { name: 'Airbag', state: isAirbag, setState: setIsAirbag },
        { name: 'Other Warning Light', state: isOther, setState: setIsOther }
    ];

    const handleResults = () => {
        const results = warningOptions.filter((option) => option.state)
               console.log(results)
        if (results[0].name === 'Pass') {
            addToConcerns(1, '✅ No Warning Lights')
        } else {
            const someConcernMsg = 
            `❌ Warning lights: ${results.map((result) => result.name + ' ').join(', ')} ${isOther ? otherNote : ''} ${techNote ? `Tech notes: ${techNote}` : ''}\n Recommend scan tool diagnostics.`;        
            addToConcerns(2, someConcernMsg)
        }       
    }

    // Uncheck isPass if anything else is checked
    useEffect(() => {
        let hasWarning = false;
        warningOptions.forEach((option) => {
            if (option.name !== 'Pass' && option.state === true) {
               hasWarning = true;
            }
        });
        setIsPass(!hasWarning)
    }, [isCEL, isABS, isTPMS, isTRAC, isAirbag, isOther])

    return (
        <fieldset >
            
            <legend>Warning lights: <em>Check if illuminated</em></legend>
            
          {warningOptions.map((warningOption) => (
                <div key={warningOption.name}>
                    <label htmlFor={warningOption.name}>{warningOption.name}</label>
                    <input 
                        type='checkbox'
                        id={warningOption.name}
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
                value={techNote}
                onChange={(e) => setTechNote(e.target.value)}   
            />
            <button type='button' onClick={handleResults}>test message</button>

        </fieldset>
    )
};