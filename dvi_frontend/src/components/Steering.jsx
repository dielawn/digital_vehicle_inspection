import { useEffect, useState } from 'react'

export const Steering = ({ addToConcerns }) => {

    // rack and pinion or relay rod steering
    const [isRack, setIsRack] = useState(true);
    //is rack or gear box leaking?
    const [isLeak, setIsLeak] = useState(false);

    const [outerTieRodLF, setOuterTieRodLF] = useState(false);
    const [outerTieRodRF, setOuterTieRodRF] = useState(false);
    const [innerTieRodLF, setInnerTieRodLF] = useState(false);
    const [innerTieRodRF, setInnerTieRodRF] = useState(false);
   
    const [dragLink, setDragLink] = useState(false);
    const [centerLink, setCenterLink] = useState(false);
    const [tieRodLF, setTieRodLF] = useState(false);
    const [tieRodRF, setTieRodRF] = useState(false);
    const [idler, setIdler] = useState(false);
    const [pitman, setPitman] = useState(false);

    const [notes, setNotes] = useState('');

    const rackSteering = [
        {
            name: 'Left front',
            id: 'lf',
            outer: outerTieRodLF,
            setOuter: setOuterTieRodLF,
            inner: innerTieRodLF,
            setInner: setInnerTieRodLF,          
        },
        {
            name: 'Right front',
            id: 'rf',
            outer: outerTieRodRF,
            setOuter: setOuterTieRodRF,
            inner: innerTieRodRF,
            setInner: setInnerTieRodRF,
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
            setTieRodRF
        },
    ];

    const handleResults = () => {
        isRack ?
        rackSteering.map((item) => {
            let msg = '';
            console.log(item)
            if (item.outer && item.inner) {
                // Both inner and outer have play
                msg = `❌ ${item.name} inner & outer tie rods have play.`;
                addToConcerns(3, msg);
            } else if (item.inner || item.outer) {
                // Either inner or outer has play
                msg = `🟡 ${item.name} ${item.inner ? 'inner' : 'outer'} tie rod has play.`;
                addToConcerns(2, msg);
            } 
                // Both inner and outer pass
                const passingParts = [];
                console.log(item.name)
                if (item.name == 'Left front') {
                    if (!item.inner) passingParts.push('Left front inner');
                    if (!item.outer) passingParts.push('Left front outer');
                } else {
                    if (!item.inner) passingParts.push('Right front inner');
                    if (!item.outer) passingParts.push('Right front outer');
                }
               
                console.log('pp', passingParts)
                msg = `✅ ${passingParts.join(' & ')} tie rod`;
                if (passingParts.length) {
                    addToConcerns(1, msg);
                }                                                     
        })        
        :
        relaySteering.map((item) => {
            let msg = '';
            // Tie rods
            if (item.tieRodLF && item.tieRodRF) {
                // Both inner and outer have play
                msg = `❌ All tie rods have play.`;
                addToConcerns(3, msg);
            } else if (item.tieRodLF || item.tieRodRF) {
                // Either upper or lower has play
                msg = `🟡 ${item.tieRodLF ? 'Left front ' : 'Right front '} tie rod has play.`;
                addToConcerns(2, msg);
            } else {
                // Both upper and lower pass
                msg = `✅ Tie rods`;
                addToConcerns(1, msg);
            }
            // Idler & Pitman
            if (item.idler && item.pitman) {
                msg = `❌ Idler & pitman have play`
                addToConcerns(3, msg);
            } else if (item.idler || item.pitman) {
                msg = `🟡 ${item.idler ? 'Idler ' : 'Pitman '} play.`
            } else {
                msg = `✅ Pitman & idler`
            }
            // Drag link & center link
            if (item.dragLink && item.centerLink) {
                msg = `❌ Drag link & center link have play`
                addToConcerns(3, msg)
            } else if (item.dragLink || item.centerLink) {
                msg = `🟡 ${item.dragLink ? 'Drag link ' : 'Center link '} has play.`
                addToConcerns(2, msg)
            } else {
                msg = `✅ Drag link & center link`
                addToConcerns(1, msg)
            }

        })
    };

    return (
        <fieldset>
            <legend>Steering & Alignment</legend>
            <label>Rack & Pinion Steering
                <input type='radio' name='isRackRadio' value={true} checked={isRack} onChange={() => setIsRack(true)}/>
            </label>
            <label>Drag Link Steering   
                <input type='radio' name='isRackRadio' value={false} checked={!isRack} onChange={() => setIsRack(false)}/>
            </label>
            <p>{isRack ? 'Rack and pinion ' : 'Gearbox '} Leaking?</p>
            <label>True
                <input type='radio' name='isLeakingRadio' value={true} checked={isLeak} onChange={() => setIsLeak(true)}/>
            </label>
            <label>False  
                <input type='radio' name='isLeakingRadio' value={false} checked={!isLeak} onChange={() => setIsLeak(false)}/>
            </label>
            <label>Notes: 
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}/>
            </label>
            <hr></hr>
            {isRack ?
                rackSteering.map((item) => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <p>Outer tie rod play?</p>
                        <label>True
                            <input type='radio' name={`${item.id}OuterRadio`} value={true} checked={item.outer} onChange={() => item.setOuter(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}OuterRadio`} value={false} checked={!item.outer} onChange={() => item.setOuter(false)}/>
                        </label>
                        
                        <p>Inner tie rod play?</p>
                        <label>True
                            <input type='radio' name={`${item.id}InnerTRRadio`} value={true} checked={item.inner} onChange={() => item.setInner(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}innerTRRadio`} value={false} checked={!item.inner} onChange={() => item.setInner(false)}/>
                        </label>
                       
                      
                        <hr />
                    </div>
                ))
            :
                relaySteering.map((item) => (
                    <div key={item.id}>
                        <h3>{item.name} Steering</h3>
                        <p>Outer tie rod play?</p>
                        <p>LF</p>
                        <label>True
                            <input type='radio' name={`${item.id}OuterRadio`} value={true} checked={item.tieRodLF} onChange={() => item.setTieRodLF(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}OuterRadio`} value={false} checked={!item.tieRodLF} onChange={() => item.setTieRodLF(false)}/>
                        </label>
                        <p>RF</p>
                        <label>True
                            <input type='radio' name={`${item.id}OuterRadio`} value={true} checked={item.tieRodRF} onChange={() => item.setTieRodRF(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}OuterRadio`} value={false} checked={!item.tieRodRF} onChange={() => item.setTieRodRF(false)}/>
                        </label>
                        <hr />
                        <p>Pitman play?</p>
                        <label>True
                            <input type='radio' name={`${item.id}PitmanRadio`} value={true} checked={item.pitman} onChange={() => item.setPitman(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}PitmanRadio`} value={false} checked={!item.pitman} onChange={() => item.setPitman(false)}/>
                        </label>
                        <p>Idler play?</p>
                        <label>True
                            <input type='radio' name={`${item.id}IdlerRadio`} value={true} checked={item.idler} onChange={() => item.setIdler(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}IdlerRadio`} value={false} checked={!item.idler} onChange={() => item.setIdler(false)}/>
                        </label>
                        <hr />
                        <p>Drag link play?</p>
                        <label>True
                            <input type='radio' name={`${item.id}DragLinkRadio`} value={true} checked={item.dragLink} onChange={() => item.setDragLink(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}DragLinkRadio`} value={false} checked={!item.dragLink} onChange={() => item.setDragLink(false)}/>
                        </label>
                        <p>Center link play?</p>
                        <label>True
                            <input type='radio' name={`${item.id}CenterLinkRadio`} value={true} checked={item.centerLink} onChange={() => item.setCenterLink(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}CenterLinkrRadio`} value={false} checked={!item.centerLink} onChange={() => item.setCenterLink(false)}/>
                        </label>
                    </div>
                ))
            }
           <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}