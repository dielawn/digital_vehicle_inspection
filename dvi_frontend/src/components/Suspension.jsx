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
        
        if (item.isLeak && item.isBouncy) {   
            const msg = `${leakMsg} ${bounceMsg} ${item.isSwayOk ? '' : swayMsg}`         
            addToConcerns(3, `❌ ${msg}`)
        } else if (item.isLeak || item.isBouncy || !item.isSwayOk) {
            const msg = `${item.isLeak ? leakMsg : ''} ${item.isBouncy ? bounceMsg : ''} ${item.isSwayOk ? '' : swayMsg}`
            addToConcerns(2, msg)
        } else {    
            const msg = `Found no issues or concerns with ${item.name} suspension!`                
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
            <input type='radio' name='leakingRadio' value={true} checked={item.isLeak} onChange={() => item.setIsLeak(true)}/>
        </label>
        <label>False   
            <input type='radio' name='leakingRadio' value={false} checked={!item.isLeak} onChange={() => item.setIsLeak(false)}/>
        </label>
        <h4>Bounce test</h4>
        <label>Fail
            <input type='radio' name='bounceRadio' value={true} checked={item.isBouncy} onChange={() => item.setIsBouncy(true)}/>
        </label>
        <label>Pass   
            <input type='radio' name='bounceRadio' value={false} checked={!item.isBouncy} onChange={() => item.setIsBouncy(false)}/>
        </label>
        <h4>{item.name} Sway bar links & bushings</h4>
        <label>Fail
            <input type='radio' name='swayRadio' value={true} checked={item.isSwayOk} onChange={() => item.setIsSwayOk(true)}/>
        </label>
        <label>Pass   
            <input type='radio' name='swayRadio' value={false} checked={!item.isSwayOk} onChange={() => item.setIsSwayOk(false)}/>
        </label>

        </div>
        ))}
        <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}