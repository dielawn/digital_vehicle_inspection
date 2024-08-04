import { useEffect, useState } from 'react'
import { reduceNotes, abrevNotes } from '../../utils';

export const Suspension = ({ sortConcerns }) => {

    const [frontStruts, setFrontStruts] = useState(1);
    const [rearStruts, setRearStruts] = useState(1);
    const [frontSway, setFrontSway] = useState(1);
    const [rearSway, setRearSway] = useState(1);

    const [frontStrutNotes, setFontStrutNotes] = useState('');
    const [rearShockNotes, setRearShockNotes] = useState('');
    const [frontSwayNotes, setFrontSwayNotes] = useState('');
    const [rearSwayNotes, setRearSwayNotes] = useState('');

    const suspension = [
        {
            name: 'Front Struts',
            component: frontStruts,
            setComponent: setFrontStruts,
            notes: frontStrutNotes,
            setNotes: setFontStrutNotes,
            id: 'struts'
        },
        {
            name: 'Front Sway bar links/bushings',
            component: frontSway,
            setComponent: setFrontSway,
            notes: frontSwayNotes,
            setNotes: setFrontSwayNotes,
            id:'frontSway'
        },
        {
            name: 'Rear Shocks',
            component: rearStruts,
            setComponent: setRearStruts,
            notes: rearShockNotes,
            setNotes: setRearShockNotes,
            id: 'shocks'
        },
        {
            name: 'Rear Sway bar links/bushings',
            component: rearSway,
            setComponent: setRearSway,
            notes: rearSwayNotes,
            setNotes: setRearSwayNotes,
            id: 'rearSway'
        },
    ];

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };
        if(suspension.every((item) => item.component === suspension[0].component)) {

            const allNotes = reduceNotes(suspension)
            const msg = `${statusIcon[suspension[0].component]} Shocks Struts &  Sway bar bushings/link${abrevNotes(allNotes)}`
            sortConcerns('suspension', suspension[0].component, msg)
            return
        } else {
            suspension.forEach(({ name, component, notes }) => {
                const msg = `${statusIcon[component]} ${name}${abrevNotes(notes)}`
                sortConcerns('suspension', component, msg)
                });
        }        
    };
    return (
        <fieldset>
            <legend>Suspension</legend>
            {suspension.map((item) => (
                <div key={item.id}> 
            <h4>{item.name}</h4>
            <label>
                <input 
                    type='radio' 
                    name={`${item.id}Radio`} 
                    value={1} 
                    checked={item.component === 1} 
                    onChange={() => item.setComponent(1)}/>✅
            </label>
            <label>  
                <input 
                    type='radio' 
                    name={`${item.id}Radio`} 
                    value={2} 
                    checked={item.component === 2} 
                    onChange={() => item.setComponent(2)}/>🟡
            </label>
            <label>  
                <input 
                    type='radio' 
                    name={`${item.id}Radio`} 
                    value={3} 
                    checked={item.component === 3} 
                    onChange={() => item.setComponent(3)}/>❌
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