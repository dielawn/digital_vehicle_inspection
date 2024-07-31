import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { WarningLights } from './WarningLights';
import { ExteriorLights } from './ExteriorLights';
import { UnderHood } from './UnderHood';
import { UnderHoodFluids } from './UnderhoodFluids';
import { Tires } from './Tires';
import { Suspension } from './Suspension';
import { Steering } from './Steering';
import { BallJoints } from './BallJoints';
import { WheelBearings } from './WheelBearings';
import { Brakes } from './Brakes';
import { Axles } from './Axles';
import { UnderCarFluids } from './UnderCarFluids';
import { Maintenance } from './Maintenance';

export const InspectionForm = ({ driveType, setDriveType }) => {

    // Levels of concern
    const [lowConcern, setLowConcern] = useState([]);
    const [someConcern, setSomeConcern] = useState([]);
    const [safetyConcern, setSafetyConcern] = useState([]);

    const [currentStep, setCurrentStep] = useState(0);
    // maintenance
    const [maintenance, setMaintenance] = useState('');

    const [exteriorLights, setExteriorLights] = useState({ 1: [], 2: [], 3: [], });

    const [underHood, setUnderHood] = useState({ 1: [], 2: [], 3: [], }); 

    const [tires, setTires] = useState({ 1: [], 2: [], 3: [], });
    const [suspension, setSuspension] = useState({ 1: [], 2: [], 3: [], });
    const [steering, setSteering] = useState({ 1: [], 2: [], 3: [], });
    const [ballJoints, setBallJoints] = useState({ 1: [], 2: [], 3: [], });
    const [wheelBearings, setWheelBearings] = useState({ 1: [], 2: [], 3: [], });
    const [brakes, setBrakes] = useState({ 1: [], 2: [], 3: [], });
    const [axles, setAxles] = useState({ 1: [], 2: [], 3: [], });
    const [underCar, setUnderCar] = useState({ 1: [], 2: [], 3: [], });
    
    const sectionStateSetters = {
        exteriorLights: setExteriorLights,
        underHood: setUnderHood,
        tires: setTires,
        suspension: setSuspension,
        steering: setSteering,
        ballJoints: setBallJoints,
        wheelBearings: setWheelBearings,
        brakes: setBrakes,
        axles: setAxles,
        underCar: setUnderCar,
    };

    const sortConcerns = (section, level, note) => {
        const setState = sectionStateSetters[section];
        if (setState) {
            setState(prevData => ({
                ...prevData,
                [level]: [...prevData[level], note]
            }));
        }
    };


    const addToConcerns = (level, note) => {
        switch (level) {
            case 1:
                setLowConcern(prevLowConcern => [...prevLowConcern, note]);
                break;
            case 2:
                setSomeConcern(prevSomeConcern => [...prevSomeConcern, note]);
                break;
            case 3:
                setSafetyConcern(prevSafetyConcern => [...prevSafetyConcern, note]);
                break;
            default:
                setLowConcern(prevLowConcern => [...prevLowConcern, note]);
        }
    }

    // Set order of inspection
    const steps = [
        <WarningLights addToConcerns={addToConcerns}  />,
        <ExteriorLights addToConcerns={addToConcerns} sortConcerns={sortConcerns}/>,
        <UnderHood addToConcerns={addToConcerns} sortConcerns={sortConcerns}/>,
        <UnderHoodFluids addToConcerns={addToConcerns} sortConcerns={sortConcerns}/>,
        <Tires addToConcerns={addToConcerns} sortConcerns={sortConcerns} driveType={driveType} />,
        <Suspension addToConcerns={addToConcerns} sortConcerns={sortConcerns}/>,
        <Steering addToConcerns={addToConcerns} sortConcerns={sortConcerns}/>,
        <BallJoints addToConcerns={addToConcerns} sortConcerns={sortConcerns}/>,
        <WheelBearings addToConcerns={addToConcerns} sortConcerns={sortConcerns}/>,
        <Brakes addToConcerns={addToConcerns} sortConcerns={sortConcerns}/>,
        <Axles addToConcerns={addToConcerns} sortConcerns={sortConcerns} driveType={driveType} setDriveType={setDriveType}/>,
        <UnderCarFluids addToConcerns={addToConcerns} sortConcerns={sortConcerns} driveType={driveType} />,
        <Maintenance setMaintenance={setMaintenance} />
    ];

    // Scroll through inspection components
    const scrollBack = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    const scrollNext = () => setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));

    return (
        <div>
           <div className='inspectionDiv'>
                <button type='button' onClick={scrollBack} disabled={currentStep === 0}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <button type='button' onClick={scrollNext} disabled={currentStep === steps.length - 1}><FontAwesomeIcon icon={faChevronRight} /></button>
                <div className="inspComponent">
                    {steps[currentStep]}
                </div>
               
           </div>
            <div className="resultsDiv">
                <h3>Pass</h3>
                <ul className='lowConcernList'>
                {lowConcern && lowConcern.map((concern, index) => (
                    <li key={index}>{concern}</li>
                ))}
                </ul>
                <h3>Needs attention</h3>
                <ul className='someConcernList'>
                {someConcern && someConcern.map((concern, index) => (
                    <li key={index}>{concern}</li>
                ))}
                </ul>
                <h3>Safety concern</h3>
                <ul className='safetyConcernList'>
                {safetyConcern && safetyConcern.map((concern, index) => (
                    <li key={index}>{concern}</li>
                ))}
                {maintenance && 
                    <>
                    <h3>Maintenance</h3>
                    <p>{maintenance}</p>
                    </>
                }
                </ul>
            </div>

        </div>
    )
}