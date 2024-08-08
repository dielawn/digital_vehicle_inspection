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
import { Snap } from './SnapFrame';

import { abrevNotes, formatTireSize } from '../../utils';

export const InspectionForm = ({ driveType, setDriveType, tireSize, setTireSize , loadRange, setLoadRange }) => {

    // Levels of concern
    const [lowConcern, setLowConcern] = useState([]);
    const [someConcern, setSomeConcern] = useState([]);
    const [safetyConcern, setSafetyConcern] = useState([]);

    const [currentStep, setCurrentStep] = useState(0);
    // maintenance
    const [maintenance, setMaintenance] = useState('');

    const [warningLights, setWarningLights] = useState({ 1: [], 2: [], 3: [], });
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

    const [formattedTireSize, setFormattedTireSize] = useState('');
    const [serviceNotes, setServiceNotes] = useState({
        warningLights: '',
        exteriorLights: '',

        tires: '',

    });

    const sections = [ 
        warningLights,
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
        warningLights: setWarningLights,
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

    useEffect(() => {
        const size = formatTireSize(tireSize)
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
        advisorNotes()
    };

    const advisorNotes = () => {
        let brakeNotes = '';
        if (brakes[1].length > 0) {
            brakeNotes = brakes[1].filter(note => note !== '').join(' ');
        };
        let tireNotes = '';
        if (tires[1].length > 0) {
            tireNotes = tires[1].filter(note => note !== '').join(' ');   
        };
        const leve2Notes = sections.flatMap(section => section[2]).filter(note => note !== '').join(' ');
        const leve3Notes = sections.flatMap(section => section[3]).filter(note => note !== '').join(' ');

        const notesArray = [
            leve3Notes,
            leve2Notes,
            brakeNotes,
            tireNotes,
            `${tireSize} load range ${loadRange}`,       
        ]
        setServiceNotes(notesArray)
    };

    const copyAdvisorNotes = async () => {
        try {
            const advisorNote = serviceNotes.join(' ')
            await navigator.clipboard.writeText(advisorNote)
        } catch (err) {
            alert('Failed to copy text: ', err)
        }
    };


    // Set order of inspection
    const steps = [
        <WarningLights   sortConcerns={sortConcerns}  />,
        <ExteriorLights  sortConcerns={sortConcerns} />,
        <UnderHood  sortConcerns={sortConcerns}/>,
        <UnderHoodFluids  sortConcerns={sortConcerns} />,
        <Tires  sortConcerns={sortConcerns} driveType={driveType} tireSize={tireSize} setTireSize={setTireSize} loadRange={loadRange} setLoadRange={setLoadRange} />,
        <Suspension  sortConcerns={sortConcerns} />,
        <Steering  sortConcerns={sortConcerns} />,
        <BallJoints  sortConcerns={sortConcerns} />,
        <WheelBearings  sortConcerns={sortConcerns} />,
        <Brakes  sortConcerns={sortConcerns} />,
        <Axles  sortConcerns={sortConcerns} driveType={driveType} setDriveType={setDriveType} />,
        <UnderCarFluids  sortConcerns={sortConcerns} driveType={driveType} />,
        <Maintenance setMaintenance={setMaintenance} />,
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
                <ul key='testKey' className='inspResultsList'>
                    <h3 className='col1'>Good</h3>
                    <h3 className='col2'>Needs Attention</h3>
                    <h3 className='col3'>Needs Immediate Attention</h3>
      
                {lowConcern && lowConcern.map((item, index) => (
                    <li key={`lc${index}`} className='col1'>{item}</li>
                ))}
                {someConcern && someConcern.map((item, index) => (
                    <li key={`mc${index}`} className='col2'>{item}</li>
                ))}
                {safetyConcern && safetyConcern.map((item, index) => (
                    <li key={`hc${index}`}  className='col3'>{item}</li>
                ))}
                </ul>
            </div>
                <button type='button' onClick={handleConcerns}>Test</button>
                <button type='button' onClick={copyAdvisorNotes}>Copy advisor notes</button>
        </div>
    )
}