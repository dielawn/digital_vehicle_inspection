import { useEffect, useState } from 'react'

export const Suspension = ({ addToConcerns }) => {

    const [isStrutLeaking, setIsStrutLeaking] = useState(false);
    const [isShockLeaking, setIsShockLeaking] = useState(false);

    const [isFrontBouncy, setIsFrontBouncy] = useState(false);
    const [isReartBouncy, setIsRearBouncy] = useState(false);

    const [isFrontSwayOk, setIsFrontSwayOk] = useState(true);
    const [isRearSwayOk, setIsRearSwayOk] = useState(true);

    const [frontNotes, setFontNotes] = useState('');
    const [rearNotes, setRearNotes] = useState('');

    const suspension = [
        {
            name: 'Front ',
            isLeak: isStrutLeaking,
            setIsLeak: setIsStrutLeaking,
            isBouncy: isFrontBouncy,
            setIsBouncy: setIsFrontBouncy,
            isSwayOk: isFrontSwayOk,
            setIsSwayOk: setIsFrontSwayOk,
            notes: frontNotes,
            setNotes: setFontNotes,
        },
        {
            name: 'Rear ',
            isLeak: isShockLeaking,
            setIsLeak: setIsShockLeaking,
            isBouncy: isReartBouncy,
            setIsBouncy: setIsRearBouncy,
            isSwayOk: isRearSwayOk,
            setIsSwayOk: setIsRearSwayOk,
            notes: rearNotes,
            setNotes: setRearNotes,
            },
    ];

    const handleResults = () => {
        
      suspension.map((item) => {
        const leakMsg = `Leaking ${item.name} shocks/struts. ` 
        const bounceMsg = `${item.name} suspension is weak/bouncy. `
        const swayMsg = `Recommend ${item.name} stabalizer links & bushings. `
        const notesMsg = `${item.notes ? item.notes : ''}`
        if (item.isLeak && item.isBouncy || (item.isLeak && item.notes !== '') || item.isBouncy && item.notes !== '') {   
            const msg = `${item.name} ${leakMsg} ${bounceMsg} ${item.isSwayOk ? '' : swayMsg} ${notesMsg}`         
            addToConcerns(3, `❌ ${msg}`)
        } else if (item.isLeak || item.isBouncy || !item.isSwayOk || item.notes !== '' ) {
            const msg = `${item.name} ${item.isLeak ? leakMsg : ''} ${item.isBouncy ? bounceMsg : ''} ${item.isSwayOk ? '' : swayMsg} ${notesMsg}`
            addToConcerns(2, msg)
        } else {    
            const msg = `Found no issues or concerns with ${item.name.toLowerCase()} suspension! ${notesMsg}`                
            addToConcerns(1, `✅ ${msg}`)               
        } 
      })
       
    };

    return (
        <fieldset>
            <legend>Suspension</legend>
            {suspension.map((item) => (
                <div key={item.name}> 
            <h4>{item.name} shock/struts leaking?</h4>
            <label>True
                <input type='radio' name={`${item.name}LeakingRadio`} value={true} checked={item.isLeak} onChange={() => item.setIsLeak(true)}/>
            </label>
            <label>False   
                <input type='radio' name={`${item.name}LeakingRadio`} value={false} checked={!item.isLeak} onChange={() => item.setIsLeak(false)}/>
            </label>
            <h4>Bounce test</h4>
            <label>Pass   
                <input type='radio' name={`${item.name}BounceRadio`} value={false} checked={!item.isBouncy} onChange={() => item.setIsBouncy(false)}/>
            </label>
            <label>Fail
                <input type='radio' name={`${item.name}BounceRadio`} value={true} checked={item.isBouncy} onChange={() => item.setIsBouncy(true)}/>
            </label>            
            <h4>{item.name} Sway bar links & bushings</h4>
            <label>Pass
                <input type='radio' name={`${item.name}SwayRadio`} value={true} checked={item.isSwayOk} onChange={() => item.setIsSwayOk(true)}/>
            </label>
            <label>Fail   
                <input type='radio' name={`${item.name}SwayRadio`} value={false} checked={!item.isSwayOk} onChange={() => item.setIsSwayOk(false)}/>
            </label>
            <br></br>
            <label>{item.name} Suspension Notes: <br></br>
                <textarea
                    type='text'
                    value={item.notes}
                    onChange={(e) => item.setNotes(e.target.value)}
                />
            </label>
            </div>
            ))}
        <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}