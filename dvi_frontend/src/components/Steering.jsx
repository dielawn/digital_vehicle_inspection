import React, { useEffect, useRef, useState } from 'react';

const RackSteering = React.memo(({ rackSteering, handleFocus }) => {
    return (
        rackSteering.map((item) => (
            <div key={item.id}>
                <h3>{item.name} Outer tie rod</h3>
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
                <label>{item.name} Outer Notes:
                    <textarea
                        value={item.notesOut}
                        onFocus={handleFocus}
                        onChange={(e) => item.setNotesOut(e.target.value)}
                    />
                </label>
                <h3>{item.name} Inner tie rod</h3>
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
                <br></br>
                <label>{item.name} inner Notes:
                    <textarea
                        value={item.notesIn}
                        onFocus={handleFocus}
                        onChange={(e) => item.setNotesIn(e.target.value)}
                    />
                </label>
            </div>
        ))
    );
});

const DragLinkSteering = React.memo(({ relaySteering, handleFocus }) => {
    return (
        relaySteering.map((item) => (
            <div key={item.id}>
                <h3>{item.name}</h3>
                <label>
                    <input
                        type='radio'
                        name={`${item.id}Radio`}
                        value={1}
                        checked={item.component === 1}
                        onChange={() => item.setComponent(1)}
                    />✅
                </label>
                <label>
                    <input
                        type='radio'
                        name={`${item.id}Radio`}
                        value={2}
                        checked={item.component === 2}
                        onChange={() => item.setComponent(2)}
                    />🟡
                </label>
                <label>
                    <input
                        type='radio'
                        name={`${item.id}Radio`}
                        value={3}
                        checked={item.component === 3}
                        onChange={() => item.setComponent(3)}
                    />❌
                </label>
                <label>Notes:
                    <textarea
                        value={item.notes}
                        onFocus={handleFocus}
                        onChange={(e) => item.setNotes(e.target.value)}
                    />
                </label>
            </div>
        ))
    );
});

export const Steering = ({ sortConcerns }) => {
    const focusedElement = useRef(null);

    const handleFocus = (e) => {
        focusedElement.current = e.target;
    };

    const [isRack, setIsRack] = useState(true);
    const [isLeak, setIsLeak] = useState(false);
    const [outerTieRodLF, setOuterTieRodLF] = useState(1);
    const [outerTieRodRF, setOuterTieRodRF] = useState(1);
    const [innerTieRodLF, setInnerTieRodLF] = useState(1);
    const [innerTieRodRF, setInnerTieRodRF] = useState(1);
    const [notesOuterLF, setNotesOuterLF] = useState('');
    const [notesOuterRF, setNotesOuterRF] = useState('');
    const [notesInnerLF, setNotesInnerLF] = useState('');
    const [notesInnerRF, setNotesInnerRF] = useState('');

    const [tieRodEndLF, setTieRodEndLF] = useState(1);
    const [tieRodEndRF, setTieRodEndRF] = useState(1);
    const [tieRodLF, setTieRodLF] = useState(1);
    const [tieRodRF, setTieRodRF] = useState(1);
    const [idler, setIdler] = useState(1);
    const [pitman, setPitman] = useState(1);

    const [idlerNotes, setIdlerNotes] = useState('');
    const [pitmanNotes, setPitmanNotes] = useState('');
    const [tieRodLFNotes, setTieRodLFNotes] = useState('');
    const [tieRodEndLFNotes, setTieRodEndLFNotes] = useState('');
    const [tieRodEndRFNotes, setTieRodEndRFNotes] = useState('');
    const [tieRodRFNotes, setTieRodRFNotes] = useState('');

    const rackSteering = [
        {
            name: 'Left front',
            outer: outerTieRodLF,
            setOuter: setOuterTieRodLF,
            inner: innerTieRodLF,
            setInner: setInnerTieRodLF,
            notesIn: notesInnerLF,
            setNotesIn: setNotesInnerLF,
            notesOut: notesOuterLF,
            setNotesOut: setNotesOuterLF,
            id: 'steeringLF'
        },
        {
            name: 'Right front',
            outer: outerTieRodRF,
            setOuter: setOuterTieRodRF,
            inner: innerTieRodRF,
            setInner: setInnerTieRodRF,
            notesIn: notesInnerRF,
            setNotesIn: setNotesInnerRF,
            notesOut: notesOuterRF,
            setNotesOut: setNotesOuterRF,
            id: 'steeringRF'
        }
    ];

    const relaySteering = [
        {
            name: 'Pitman',
            component: pitman,
            setComponent: setPitman,
            notes: pitmanNotes,
            setNotes: setPitmanNotes,
            id: 'pitman'
        },
        {
            name: 'Idler',
            component: idler,
            setComponent: setIdler,
            notes: idlerNotes,
            setNotes: setIdlerNotes,
            id: 'idler'
        },
        {
            name: 'Tie rod left front outer',
            component: tieRodLF,
            setComponent: setTieRodLF,
            notes: tieRodLFNotes,
            setNotes: setTieRodLFNotes,
            id: 'tieRodLF'
        },
        {
            name: 'Tie rod right front outer',
            component: tieRodRF,
            setComponent: setTieRodRF,
            notes: tieRodRFNotes,
            setNotes: setTieRodRFNotes,
            id: 'tieRodRF'
        },
        {
            name: 'Tie rod end left front inner',
            component: tieRodEndLF,
            setComponent: setTieRodEndLF,
            notes: tieRodEndLFNotes,
            setNotes: setTieRodEndLFNotes,
            id: 'tieRodEndLF'
        },
        {
            name: 'Tie rod end right front inner',
            component: tieRodEndRF,
            setComponent: setTieRodEndRF,
            notes: tieRodEndRFNotes,
            setNotes: setTieRodEndRFNotes,
            id: 'tieRodEndRF'
        }
    ];

    useEffect(() => {
        if (focusedElement.current) {
            focusedElement.current.focus();
        }
    });

    const handleResults = () => {
        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };

        if (isRack) {
            if (rackSteering.every((item) => item.inner === rackSteering[0].inner) && rackSteering.every((item) => item.outer === rackSteering[0].outer)) {
                const allNotes = rackSteering.reduce((acc, item) => {
                    if (item.notesIn !== '') {
                        acc.push(item.notesIn)
                    }
                    if (item.notesOut !== '') {
                        acc.push(item.notesOut)
                    }
                    return acc
                }, []).join(', ').replace(/\,(?=[^,]*$)/g, ', ');
                const msg = `${statusIcon[rackSteering[0].inner]} Steering components, ${allNotes}`
                sortConcerns('steering', rackSteering[0].inner, msg)
                return
            } else {
                rackSteering.forEach(({ name, outer, inner, notesOut, notesIn }) => {
                    const outerMsg = `${statusIcon[outer]} ${name} outer tie rod, ${notesOut}`;
                    sortConcerns('steering', outer, outerMsg);
                    const innerMsg = `${statusIcon[inner]} ${name} inner tie rod, ${notesIn}`;
                    sortConcerns('steering', inner, innerMsg);
                });
            }
            
        } else {
            if (relaySteering.every((item) => item.component === relaySteering[0].component)) {
                const allNotes = relaySteering.reduce((acc, item) => {
                    if (item.notes !== '') {
                        acc.push(item.notes)
                    }
                    return acc
                }, []).join(', ').replace(/\,(?=[^,]*$)/g, ', ');
                const msg = `${statusIcon[relaySteering[0].component]} Steering components, ${allNotes}`
                sortConcerns('steering', relaySteering[0].component, msg)
                return
            } else {
                relaySteering.forEach(({ component, name, notes }) => {
                    const msg = `${statusIcon[component]} ${name} ${notes}`;
                    sortConcerns('steering', component, msg);
                });
            }            
        }
    };

    return (
        <fieldset>
            <legend>Steering & Alignment</legend>
            <label>
                <input
                    type='radio'
                    name='isRackRadio'
                    value={false}
                    checked={isRack}
                    onChange={() => setIsRack(true)}
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
                <input type='radio' name='isLeakingRadio' value={1} checked={isLeak} onChange={() => setIsLeak(1)} />
                False
            </label>
            <label>
                <input type='radio' name='isLeakingRadio' value={false} checked={!isLeak} onChange={() => setIsLeak(false)} />
                True
            </label>
            {isRack ? <RackSteering rackSteering={rackSteering} handleFocus={handleFocus} /> : <DragLinkSteering relaySteering={relaySteering} handleFocus={handleFocus} />}
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    );
};
