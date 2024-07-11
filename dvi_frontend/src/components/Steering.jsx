import { useEffect, useState } from 'react'

export const Steering = ({ addToConcerns }) => {

    // rack and pinion or relay rod steering
    const [isRack, setIsRack] = useState(true);
    //is rack or gear box leaking?
    const [isLeak, setIsLeak] = useState(false);

    const [outerTieRodLF, setOuterTieRodLF] = useState(true);
    const [outerTieRodRF, setOuterTieRodRF] = useState(true);
    const [innerTieRodLF, setInnerTieRodLF] = useState(true);
    const [innerTieRodRF, setInnerTieRodRF] = useState(true);

    const [upperBallJointLF, setUpperBallJointLF] = useState(true);
    const [upperBallJointRF, setUpperBallJointRF] = useState(true);
    const [lowerBallJointLF, setLowerBallJointLF] = useState(true);
    const [lowerBallJointRF, setLowerBallJointRF] = useState(true);

    const [idler, setIdler] = useState(true);
    const [pitman, setPitman] = useState(true);

    // Play in wheel bearing?
    const [wheelBearingLF, setWheelBearingLF] = useState(false);
    const [wheelBearingRF, setWheelBearingRF] = useState(false);
    const [wheelBearingRR, setWheelBearingRR] = useState(false);
    const [wheelBearingLR, setWheelBearingLR] = useState(false);

    const [notes, setNotes] = useState('');

    const rackSteering = [
        {
            name: 'Left front',
            outer: outerTieRodLF,
            setOuter: setOuterTieRodLF,
            inner: innerTieRodLF,
            setInner: setInnerTieRodLF,
            ballJoint_upper: upperBallJointLF,
            setUpperBJ: setUpperBallJointLF,
            ballJoint_lower: lowerBallJointLF,
            setLowerBJ: setLowerBallJointLF,           
            bearing: wheelBearingLF,
            setBearing: setWheelBearingLF 
        },
        {
            name: 'Right front',
            outer: outerTieRodRF,
            setOuter: setOuterTieRodRF,
            inner: innerTieRodRF,
            setInner: setInnerTieRodRF,
            ballJoint_upper: upperBallJointRF,
            setUpperBJ: setUpperBallJointRF,
            ballJoint_lower: lowerBallJointRF,
            setLowerBJ: setLowerBallJointRF,       
            bearing: wheelBearingRF,
            setBearing: setWheelBearingRF     
        },
        {
            name: 'Right rear',
            bearing: wheelBearingRR,
            setBearing: setWheelBearingRR,
        },
        {
            name: 'Left rear',
            bearing: wheelBearingLR,
            setBearing: setWheelBearingLR,
        }
    ];
    const relayteering = [
        {
            name: 'Left front',
            outer: outerTieRodLF,
            setOuter: setOuterTieRodLF,
            inner: innerTieRodLF,
            setInner: setInnerTieRodLF,
            ballJoint_upper: upperBallJointLF,
            setUpperBJ: setUpperBallJointLF,
            ballJoint_lower: lowerBallJointLF,
            setLowerBJ: setLowerBallJointLF,       
            pitman,
            setPitman

        },
        {
            name: 'Right front',
            outer: outerTieRodRF,
            setOuter: setOuterTieRodRF,
            inner: innerTieRodRF,
            setInner: setInnerTieRodRF,
            ballJoint_upper: upperBallJointRF,
            setUpperBJ: setUpperBallJointRF,
            ballJoint_lower: lowerBallJointRF,
            setLowerBJ: setLowerBallJointRF,   
            idler,
            setIdler         
        },
        {
            name: 'Right rear',
            bearing: wheelBearingRR,
            setBearing: setWheelBearingRR,
        },
        {
            name: 'Left rear',
            bearing: wheelBearingLR,
            setBearing: setWheelBearingLR,
        }
    ];

    return (
        <fieldset>
            <legend>Steering & Alignment</legend>

        </fieldset>
    )
}