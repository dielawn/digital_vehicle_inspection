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

    const [tireSize, setTireSize] = useState('');
    const [loadRange, setLoadRange] = useState('P');
    const [formattedTireSize, setFormattedTireSize] = useState('');

    const sections = [ 
        exteriorLights,
        underHood,
        tires,
        suspension,
        steering,
        ballJoints,
        wheelBearings,
        brakes,
        axles,
        underCar,
    ]
    
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

    const formatTireSize = () => {
        const regex = /^(\d{3})(\d{2})(\d{2})$/;
        const match = tireSize.match(regex)
        if (match) {
            return `${match[1]}/${match[2]}/${match[3]}`
        } else {
            return tireSize
        }
    };

    const reduceNotes = (array) => {
        return array.reduce((acc, item) => {
            if (item.notes !== '' ) {
                const txt = `${item.name} ${item.notes}`
                acc.push(txt);
            }
            return acc
        }, []).join(', ').replace(/\,(?=[^,]*$)/g, ', ');
    };

    useEffect(() => {
        const size = formatTireSize()
        setFormattedTireSize(size)
        
    }, [tireSize])

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
    };

    const handleConcerns = () => {
        sections.forEach(section => {
            Object.keys(section).forEach(level => {
                section[level].forEach(note => {
                    addToConcerns(Number(level), note);
                });
            });
        });
    };

    // Set order of inspection
    const steps = [
        <WarningLights   addToConcerns={addToConcerns} reduceNotes={reduceNotes}/>,
        <ExteriorLights  sortConcerns={sortConcerns} reduceNotes={reduceNotes}/>,
        <UnderHood  sortConcerns={sortConcerns} reduceNotes={reduceNotes}/>,
        <UnderHoodFluids  sortConcerns={sortConcerns} reduceNotes={reduceNotes}/>,
        <Tires  sortConcerns={sortConcerns} driveType={driveType} tireSize={tireSize} setTireSize={setTireSize} loadRange={loadRange} setLoadRange={setLoadRange} reduceNotes={reduceNotes}/>,
        <Suspension  sortConcerns={sortConcerns} reduceNotes={reduceNotes}/>,
        <Steering  sortConcerns={sortConcerns} reduceNotes={reduceNotes}/>,
        <BallJoints  sortConcerns={sortConcerns} reduceNotes={reduceNotes}/>,
        <WheelBearings  sortConcerns={sortConcerns} reduceNotes={reduceNotes}/>,
        <Brakes  sortConcerns={sortConcerns} reduceNotes={reduceNotes}/>,
        <Axles  sortConcerns={sortConcerns} driveType={driveType} setDriveType={setDriveType} reduceNotes={reduceNotes}/>,
        <UnderCarFluids  sortConcerns={sortConcerns} driveType={driveType} reduceNotes={reduceNotes}/>,
        <Maintenance setMaintenance={setMaintenance} reduceNotes={reduceNotes}/>
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
                {exteriorLights[1].length > 0 && <h3>Exterior lights</h3>}
                {exteriorLights[1].length > 0 && 
                    exteriorLights[1].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                {underHood[1].length > 0 && <h3>Under Hood</h3>}
                {underHood[1].length > 0 && 
                    underHood[1].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                {tires[1].length > 0 && <h3>Tires {loadRange} {formattedTireSize} </h3>}
                {tires[1].length > 0 && 
                    tires[1].map((tire, index) => (
                        <li key={index}>{tire}</li>
                    ))}                
                {(steering[1].length > 0 || suspension[1].length > 0 || ballJoints[1].length > 0 || wheelBearings[1].length > 0) && <h3>Steering & Suspension</h3>}
                {suspension[1].length > 0 && 
                    suspension[1].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {steering[1].length > 0 && 
                    steering[1].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {ballJoints[1].length > 0 && 
                    ballJoints[1].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                {wheelBearings[1].length > 0 && 
                    wheelBearings[1].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 

                {brakes[1].length > 0 && <h3>Brakes</h3>}
                {brakes[1].length > 0 && 
                    brakes[1].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                {axles[1].length > 0 && <h3>Axles</h3>}
                {axles[1].length > 0 && 
                    axles[1].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {underCar[1].length > 0 && <h3>Under Car</h3>}
                {underCar[1].length > 0 && 
                    underCar[1].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {lowConcern && lowConcern.map((concern, index) => (
                    <li key={index}>{concern}</li>
                ))}
                </ul>
                <h3>Needs attention</h3>
                <ul className='someConcernList'>
                {exteriorLights[2].length > 0 && <h3>Exterior lights</h3>}
                {exteriorLights[2].length > 0 && 
                    exteriorLights[2].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                {underHood[2].length > 0 && <h3>Under Hood</h3>}
                {underHood[2].length > 0 && 
                    underHood[2].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                {tires[2].length > 0 && <h3>Tires {loadRange} {formattedTireSize}</h3>}
                {tires[2].length > 0 && 
                    tires[2].map((tire, index) => (
                        <li key={index}>{tire}</li>
                    ))} 

               {steering[2].length > 0 || suspension[2].length > 0 || ballJoints[2].length > 0 || wheelBearings[2].length > 0 && <h3>Steering & Suspension</h3>}
                {suspension[2].length > 0 && 
                    suspension[2].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {steering[2].length > 0 && 
                    steering[2].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {ballJoints[2].length > 0 && 
                    ballJoints[2].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                {wheelBearings[2].length > 0 && 
                    wheelBearings[2].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}

                {brakes[2].length > 0 && <h3>Brakes</h3>}
                {brakes[2].length > 0 && 
                    brakes[2].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {axles[2].length > 0 && <h3>Axles</h3>}
                {axles[2].length > 0 && 
                    axles[2].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {underCar[2].length > 0 && <h3>Under Car</h3>}
                {underCar[2].length > 0 && 
                    underCar[2].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {someConcern && someConcern.map((concern, index) => (
                    <li key={index}>{concern}</li>
                ))}
                </ul>
                <h3>Safety concern</h3>
                <ul className='safetyConcernList'>
                {exteriorLights[3].length > 0 && <h3>Exterior lights</h3>}
                {exteriorLights[3].length > 0 && 
                    exteriorLights[3].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                {underHood[3].length > 0 && <h3>Under Hood</h3>}
                {underHood[3].length > 0 && 
                    underHood[3].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                {tires[3].length > 0 && <h3>Tires {loadRange} {formattedTireSize}</h3>}
                {tires[3].length > 0 && 
                    tires[3].map((tire, index) => (
                        <li key={index}>{tire}</li>
                    ))} 
                {steering[3].length > 0 || suspension[3].length > 0 || ballJoints[3].length > 0 || wheelBearings[3].length > 0 && <h3>Steering & Suspension</h3>}
                {suspension[3].length > 0 && 
                    suspension[3].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {steering[3].length > 0 && 
                    steering[3].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {ballJoints[3].length > 0 && 
                    ballJoints[3].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                {wheelBearings[3].length > 0 && 
                    wheelBearings[3].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {brakes[3].length > 0 && <h3>Brakes</h3>}
                {brakes[3].length > 0 && 
                    brakes[3].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {axles[3].length > 0 && <h3>Axles</h3>}
                {axles[3].length > 0 && 
                    axles[3].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
                {underCar[3].length > 0 && <h3>Under Car</h3>}
                {underCar[3].length > 0 && 
                    underCar[3].map((item, index) => (
                        <li key={index}>{item}</li>
                    ))} 
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
<button type='button' onClick={handleConcerns}>add to concerns</button>
        </div>
    )
}