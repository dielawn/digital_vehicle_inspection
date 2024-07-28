import { useEffect, useState } from 'react'

export const Steering = ({ addToConcerns }) => {

    // rack and pinion or relay rod steering
    const [isRack, setIsRack] = useState(1);
    //is rack or gear box leaking?
    const [isLeak, setIsLeak] = useState(false);
    // Rack steering
    const [outerTieRodLF, setOuterTieRodLF] = useState(1);
    const [outerTieRodRF, setOuterTieRodRF] = useState(1);
    const [innerTieRodLF, setInnerTieRodLF] = useState(1);
    const [innerTieRodRF, setInnerTieRodRF] = useState(1);

    const [notesLF, setNotesLF] = useState('');
    const [notesRF, setNotesRF] = useState('');

    // Drag link steering
    const [dragLink, setDragLink] = useState(1);
    const [centerLink, setCenterLink] = useState(1);
    const [tieRodLF, setTieRodLF] = useState(1);
    const [tieRodRF, setTieRodRF] = useState(1);
    const [idler, setIdler] = useState(1);
    const [pitman, setPitman] = useState(1);   

    const [dragLinkNotes, setDragLinkNotes] = useState('');
    
    const rackSteering = [
        {
            name: 'Left front',
            id: 'lf',
            outer: outerTieRodLF,
            setOuter: setOuterTieRodLF,
            inner: innerTieRodLF,
            setInner: setInnerTieRodLF,      
            notes: notesLF,
            setNotes: setNotesLF    
        },
        {
            name: 'Right front',
            id: 'rf',
            outer: outerTieRodRF,
            setOuter: setOuterTieRodRF,
            inner: innerTieRodRF,
            setInner: setInnerTieRodRF,
            notes: notesRF,
            setNotes: setNotesRF
        }
    ];

    const relaySteering = [
        {
            name: 'Drag link',
            id: 'dl',
            pitman,
            setPitman,
            dragLink,
            setDragLink,
            idler,
            setIdler,
            centerLink,
            setCenterLink,
            tieRodLF,
            setTieRodLF,
            tieRodRF,
            setTieRodRF,
            notes: dragLinkNotes,
            setNotes: setDragLinkNotes
        },
    ];

    const RackSteering = () => {
        return (
            rackSteering.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>Outer tie rod</p>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}OuterRadio`} 
                            value={1} 
                            checked={item.outer === 1} 
                            onChange={() => item.setOuter(1)}
                        />✅
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}OuterRadio`} 
                            value={2} 
                            checked={item.outer === 2} 
                            onChange={() => item.setOuter(2)}
                        />🟡
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}OuterRadio`} 
                            value={3} 
                            checked={item.outer === 3} 
                            onChange={() => item.setOuter(3)}
                        />❌ 
                    </label>                    
                    <p>Inner tie rod</p>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}InnerTRRadio`} 
                            value={1} 
                            checked={item.inner === 1} 
                            onChange={() => item.setInner(1)}
                        />✅
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}innerTRRadio`} 
                            value={2} 
                            checked={item.inner === 2} 
                            onChange={() => item.setInner(2)}
                        />🟡
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}innerTRRadio`} 
                            value={3} 
                            checked={item.inner === 3} 
                            onChange={() => item.setInner(3)}
                        />❌ 
                    </label>
                </div>
            ))
        )
    };

    const DragLinkSteering = () => {
        return (
            relaySteering.map((item) => (
                <div key={item.id}>
                    <h3>{item.name} Steering</h3>
                    <p>Outer tie rod play?</p>
                    <p>LF</p>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}OuterRadio`} 
                            value={1} 
                            checked={item.tieRodLF === 1} 
                            onChange={() => item.setTieRodLF(1)}
                        />✅
                    </label>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}OuterRadio`} 
                            value={2} 
                            checked={item.tieRodLF === 2} 
                            onChange={() => item.setTieRodLF(2)}
                        />🟡
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}OuterRadio`} 
                            value={3} 
                            checked={item.tieRodLF === 3} 
                            onChange={() => item.setTieRodLF(3)}
                        />❌
                    </label>
                    <p>RF</p>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}OuterRadio`} 
                            value={1} 
                            checked={item.tieRodRF === 1} 
                            onChange={() => item.setTieRodRF(1)}
                        />✅
                    </label>
                    <label>  
                        <input 
                            type='radio' 
                            name={`${item.id}OuterRadio`} 
                            value={2} 
                            checked={item.tieRodRF === 2} 
                            onChange={() => item.setTieRodRF(2)}
                        />🟡
                    </label>
                    <label>  
                        <input 
                            type='radio' 
                            name={`${item.id}OuterRadio`} 
                            value={3} 
                            checked={item.tieRodRF === 3} 
                            onChange={() => item.setTieRodRF(3)}
                        />❌
                    </label>
                    <hr />
                    <p>Pitman play?</p>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}PitmanRadio`} 
                            value={1} 
                            checked={item.pitman === 1} 
                            onChange={() => item.setPitman(1)}
                        />✅
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}PitmanRadio`} 
                            value={2} 
                            checked={item.pitman === 2} 
                            onChange={() => item.setPitman(2)}
                        />🟡
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}PitmanRadio`} 
                            value={3} 
                            checked={item.pitman === 3} 
                            onChange={() => item.setPitman(3)}
                        />❌
                    </label>
                    <p>Idler play?</p>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}IdlerRadio`} 
                            value={1} 
                            checked={item.idler === 1} 
                            onChange={() => item.setIdler(1)}
                        />✅
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}IdlerRadio`} 
                            value={2} 
                            checked={item.idler === 2} 
                            onChange={() => item.setIdler(2)}
                        />🟡
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}IdlerRadio`} 
                            value={3} 
                            checked={item.idler === 3} 
                            onChange={() => item.setIdler(3)}
                        />❌
                    </label>
                    <hr />
                    <p>Drag link play?</p>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}DragLinkRadio`} 
                            value={1} checked={item.dragLink === 1} 
                            onChange={() => item.setDragLink(1)}
                        />✅
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}DragLinkRadio`} 
                            value={2} 
                            checked={item.dragLink === 2} 
                            onChange={() => item.setDragLink(2)}
                        />🟡
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}DragLinkRadio`} 
                            value={3} 
                            checked={item.dragLink === 3} 
                            onChange={() => item.setDragLink(3)}
                        />❌
                    </label>
                    <p>Center link play?</p>
                    <label>
                        <input 
                            type='radio' 
                            name={`${item.id}CenterLinkRadio`} 
                            value={1} 
                            checked={item.centerLink === 1} 
                            onChange={() => item.setCenterLink(1)}
                        />✅
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}CenterLinkrRadio`} 
                            value={2} 
                            checked={item.centerLink === 2} 
                            onChange={() => item.setCenterLink(2)}
                        />🟡
                    </label>
                    <label> 
                        <input 
                            type='radio' 
                            name={`${item.id}CenterLinkrRadio`} 
                            value={3} 
                            checked={item.centerLink === 3} 
                            onChange={() => item.setCenterLink(3)}
                        />❌
                    </label>
                </div>
            ))
        )
    };

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };

        isRack ?
        rackSteering.forEach(({ name, outer,inner, notes }) => {
            const outerMsg = `${statusIcon[outer]} ${name} outer tie rod, ${notes}`
            addToConcerns(outer, outerMsg);
            const innerMsg = `${statusIcon[inner]} ${name} inner tie rod, ${notes}`
            addToConcerns(inner, innerMsg);
        })        
        :
        relaySteering.map(({ pitman, dragLink, idler, centerLink, tieRodLF, tieRodRF }) => {
           const pitmanMsg = `${statusIcon[pitman]} pitman arm`
           const dragLinkMsg = `${statusIcon[dragLink]} drag link`
           const idlerMsg = `${statusIcon[idler]} idler arm`
           const centerLinkMsg = `${statusIcon[centerLink]} center link`
           const tieRodLFMsg = `${statusIcon[tieRodLF]} lf outer tie rod`
           const tieRodRFMsg = `${statusIcon[tieRodRF]} rf outer tie rod`
           const notes = `${dragLinkNotes}`
           if (pitman === 1) {
            
           }


        })
    };

    return (
        <fieldset>
            <legend>Steering & Alignment</legend>
            <label>
                <input 
                    type='radio' 
                    name='isRackRadio' 
                    value={1} 
                    checked={isRack} 
                    onChange={() => setIsRack(1)}
                />
                Rack & Pinion Steering
            </label>
            <label>   
                <input 
                    type='radio' 
                    name='isRackRadio' 
                    value={false} 
                    checked={!isRack} 
                    onChange={() => setIsRack(false)}
                />
                Drag Link Steering
            </label>
            <p>{isRack ? 'Rack and pinion ' : 'Gearbox '} Leaking?</p>
            <label>
                <input type='radio' name='isLeakingRadio' value={1} checked={isLeak} onChange={() => setIsLeak(1)}/>
                1
            </label>
            <label> 
                <input type='radio' name='isLeakingRadio' value={false} checked={!isLeak} onChange={() => setIsLeak(false)}/>
                
            </label>
          
            {isRack ?
                <RackSteering />
            :
                <DragLinkSteering />
            }
           <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}