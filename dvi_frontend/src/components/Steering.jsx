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

    const [upperBallJointLF, setUpperBallJointLF] = useState(false);
    const [upperBallJointRF, setUpperBallJointRF] = useState(false);
    const [lowerBallJointLF, setLowerBallJointLF] = useState(false);
    const [lowerBallJointRF, setLowerBallJointRF] = useState(false);
   
    const [dragLink, setDragLink] = useState(false);
    const [centerLink, setCenterLink] = useState(false);
    const [tieRodLF, setTieRodLF] = useState(false);
    const [tieRodRF, setTieRodRF] = useState(false);
    const [idler, setIdler] = useState(false);
    const [pitman, setPitman] = useState(false);

    // Play in wheel bearing?
    const [wheelBearingLF, setWheelBearingLF] = useState(false);
    const [wheelBearingRF, setWheelBearingRF] = useState(false);
    const [wheelBearingRR, setWheelBearingRR] = useState(false);
    const [wheelBearingLR, setWheelBearingLR] = useState(false);

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
  
    const ballJoints = [
        {
            name: 'LF Ball Joints',
            upper: upperBallJointLF,
            setUpper: setUpperBallJointLF,
            lower: lowerBallJointLF,
            setLower: setLowerBallJointLF
        },
        {
            name: 'RF Ball Joints',
            upper: upperBallJointRF,
            setUpper: setUpperBallJointRF,
            lower: lowerBallJointRF,
            setLower: setLowerBallJointRF
        },

    ];

    const wheelBearings = [
        {
            name: 'LF wheel bearing',
            bearing: wheelBearingLF,
            setBearing: setWheelBearingLF 
        },
        {
            name: 'RF wheel bearing',
            bearing: wheelBearingRF,
            setBearing: setWheelBearingRF     
        },
        {
            name: 'RR wheel bearing',
            bearing: wheelBearingRR,
            setBearing: setWheelBearingRR,
        },
        {
            name: 'LR wheel bearing',
            bearing: wheelBearingLR,
            setBearing: setWheelBearingLR,
        },
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
    ]

    return (
        <fieldset>
            <legend>Steering & Alignment</legend>
            <label>Rack & Pinion Steering
                <input type='radio' name='isRackRadio' value={true} checked={isRack} onChange={() => setIsRack(true)}/>
            </label>
            <label>Relay Rod Steering   
                <input type='radio' name='isRackRadio' value={false} checked={!isRack} onChange={() => setIsRack(false)}/>
            </label>
            <h4>Leaking?</h4>
            <label>True
                <input type='radio' name='isLeakingRadio' value={true} checked={isLeak} onChange={() => setIsLeak(true)}/>
            </label>
            <label>False  
                <input type='radio' name='isLeakingRadio' value={false} checked={!isLeak} onChange={() => setIsLeak(false)}/>
            </label>
            <hr></hr>
            <label>Notes: 
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}/>
            </label>
            {isRack ?
                rackSteering.map((item) => (
                    <fieldset key={item.id}>
                        <legend>{item.name}</legend>
                        <h4>Outer tie rod play?</h4>
                        <label>True
                            <input type='radio' name={`${item.id}OuterRadio`} value={true} checked={item.outer} onChange={() => item.setOuter(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}OuterRadio`} value={false} checked={!item.outer} onChange={() => item.setOuter(false)}/>
                        </label>
                        <h4>Inner tie rod play?</h4>
                        <label>True
                            <input type='radio' name={`${item.id}InnerTRRadio`} value={true} checked={item.inner} onChange={() => item.setInner(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}innerTRRadio`} value={false} checked={!item.inner} onChange={() => item.setInner(false)}/>
                        </label>
                       
                        <h4>Wheel bearing play?</h4>
                        <label>True
                            <input type='radio' name={`${item.id}WBRadio`} value={true} checked={item.bearing} onChange={() => item.setBearing(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}WBRadio`} value={false} checked={!item.bearing} onChange={() => item.setBearing(false)}/>
                        </label>
                    </fieldset>
                ))
            :
                relaySteering.map((item) => (
                    <fieldset key={item.id}>
                        <legend>{item.name}</legend>
                        <h4>Outer tie rod play?</h4>
                        <label>True
                            <input type='radio' name={`${item.id}OuterRadio`} value={true} checked={item.outer} onChange={() => item.setOuter(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}OuterRadio`} value={false} checked={!item.outer} onChange={() => item.setOuter(false)}/>
                        </label>
                        <h4>Wheel bearing play?</h4>
                        <label>True
                            <input type='radio' name={`${item.id}WBRadio`} value={true} checked={item.bearing} onChange={() => item.setBearing(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}WBRadio`} value={false} checked={!item.bearing} onChange={() => item.setBearing(false)}/>
                        </label>
                       
                    </fieldset>
                ))
            }
            {/* {ballJoints.map((item) => (
                <fieldset key={item.id}>
                    <legend>{item.name}</legend>
                   <h4>Upper ball joint</h4>
                        <label>True
                            <input type='radio' name={`${item.id}UpBJRadio`} value={true} checked={item.ballJoint_upper} onChange={() => item.setUpperBJ(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}UpBJRadio`} value={false} checked={!item.ballJoint_upper} onChange={() => item.setUpperBJ(false)}/>
                        </label>
                        <h4>Lower ball joint</h4>
                        <label>True
                            <input type='radio' name={`${item.id}LwrBJRadio`} value={true} checked={item.ballJoint_lower} onChange={() => item.setLowerBJ(true)}/>
                        </label>
                        <label>False  
                            <input type='radio' name={`${item.id}LwrBJRadio`} value={false} checked={!item.ballJoint_lower} onChange={() => item.setLowerBJ(false)}/>
                        </label>
                </fieldset>
            ))} */}
        </fieldset>
    )
}