import { useEffect, useState } from 'react'
import { abrevNotes } from '../../utils';

export const Tires = ({ sortConcerns, driveType, rawTireSize, setRawTireSize, loadRange, setLoadRange }) => {
    
    
    const [tireNotes, setTireNotes] = useState('');
    const [isAWD, setIsAWD] = useState(false);
    // LF
    const [lFDate, setLFDate] = useState(2021);
    const [lFTread, setLFTread] = useState(8);
    const [isUnevenLF, setIsUnevenLF] = useState(false);
    // RF
    const [rFDate, setRFDate] = useState(2021);
    const [rFTread, setRFTread] = useState(8);
    const [isUnevenRF, setIsUnevenRF] = useState(false);
    // RR
    const [rRDate, setRRDate] = useState(2021);
    const [rRTread, setRRTread] = useState(8);
    const [isUnevenRR, setIsUnevenRR] = useState(false);
    // LR
    const [lRDate, setLRDate] = useState(2021);
    const [lRTread, setLRTread] = useState(8);
    const [isUnevenLR, setIsUnevenLR] = useState(false);

    const tireInfo = [
      {
            name: 'Left front tire',
            date: lFDate,
            setDate: setLFDate,
            tread: lFTread,
            setTread: setLFTread,
            isUneven: isUnevenLF,
            setIsUneven: setIsUnevenLF
        },
        {
            name: 'Right front tire',
            date: rFDate,
            setDate: setRFDate,
            tread: rFTread,
            setTread: setRFTread,
            isUneven: isUnevenRF,
            setIsUneven: setIsUnevenRF
        },
        {
            name: 'Right rear tire',
            date: rRDate,
            setDate: setRRDate,
            tread: rRTread,
            setTread: setRRTread,
            isUneven: isUnevenRR,
            setIsUneven: setIsUnevenRR
        },
        {
            name: 'Left rear tire',
            date: lRDate,
            setDate: setLRDate,
            tread: lRTread,
            setTread: setLRTread,
            isUneven: isUnevenLR,
            setIsUneven: setIsUnevenLR
        },
    ];



    const loadRangeOptions = ['P', 'C', 'D', 'E']

    const handleDriveType = () => {
        if (driveType === 'AWD') {
            setIsAWD(true)
        } else {
            setIsAWD(false)
        }
    };

    useEffect(() => {
        handleDriveType()
    }, [driveType])

    const handleResults = () => {

        const statusIcon = {
            1: '✅',
            2: '🟡',
            3: '❌'
        };
        // Get last 2 digits of current year
        const now = new Date();
        const twoDigitYear = now.getFullYear() - 2000;        
           
        const getTireAge = (date) => twoDigitYear - (date % 100);

        // Compare all treads and dates
        const tireInfoValues = tireInfo.reduce((acc, item) => {
            acc.tread = [...(acc.tread || []), item.tread];
            acc.date = [...(acc.date || []), item.date];
            return acc;
        }, { tread: [], date: [] });

        if (tireInfoValues.tread.every(val => val === tireInfoValues.tread[0]) && 
            tireInfoValues.date.every(val => val === tireInfoValues.date[0])) {
                const { date, tread, isUneven } = tireInfo[0]
                const tireAge = getTireAge(date)
                const msg = `All tires: ${tread}/32 ${tireAge} years old${isUneven ? ', Uneven wear' : '' }${abrevNotes(tireNotes)}`
                if (tireAge >= 7 || tread < 3) {
                    sortConcerns('tires', 3, `❌ ${msg}`)
                } else if ((tread <= 5 && tread >= 3) || tireAge === 6 || isUneven) {
                    sortConcerns('tires', 2, `🟡 ${msg}`)
                } else {                    
                    sortConcerns('tires', 1, `✅ ${msg}`)               
                } 
        } else {
            tireInfo.map((item) => {
                const tireAge = getTireAge(item.date);            
                let msg = `${item.name}: ${item.tread}/32, ${tireAge} years old${item.isUneven ? ', Uneven wear' : '' }${abrevNotes(tireNotes)}`
                // No date code info
                if (item.date === '' || !item.date ) {
                    msg = `${item.name}: ${item.tread}/32, ${item.isUneven ? 'Uneven wear' : '' }${abrevNotes(tireNotes)}`
                }            
               // Sort by tire age, tread, and uneven wear
                if (tireAge >= 7 || item.tread < 3) {
                    sortConcerns('tires', 3, `❌ ${msg}`)
                } else if ((item.tread <= 5 && item.tread >= 3) || tireAge === 6 || item.isUneven) {
                    sortConcerns('tires', 2, `🟡 ${msg}`)
                } else {                    
                    sortConcerns('tires', 1, `✅ ${msg}`)               
                } 
            })
        }   
    };
 
    return (
        <fieldset >
            <legend>Tires</legend>
            <label>Tire size: 
                <input 
                    type='text'
                    value={rawTireSize}
                    onChange={(e) => setRawTireSize(e.target.value)}
                />
            </label>
            <h3>Select Load Range</h3>
            {loadRangeOptions.map((option) => (
                <label key={option}>
                    <input 
                        type='radio'
                        name='loadRangeRadio'
                        value={option}
                        checked={option === loadRange}
                        onChange={() => setLoadRange(option)}
                    />{option}
                </label>
            ))}
            <hr></hr>
            <label> Tire Notes:
                <textarea 
                    value={tireNotes}
                    onChange={(e) => setTireNotes(e.target.value)}
                />
            </label>
            {tireInfo.map((item, index) => (
                <div key={index} className='flexCol'>
                    
                    <h4>{item.name}</h4>
                    <label> Tread depth:
                        <input 
                            type='number'
                            value={item.tread}
                            onChange={(e) => item.setTread(e.target.value)}
                        />
                    </label>
                    
                    <label>Date code:
                        <input 
                            type='number'
                            value={item.date}
                            onChange={(e) => item.setDate(e.target.value)}
                        />
                    </label>
                    <h4>Uneven wear?</h4>
                    <label>True
                        <input type='radio'  value={true} name={item.name} checked={item.isUneven} onChange={() => item.setIsUneven(true) }/>
                    </label>
                    <label>False
                        <input type='radio' value={false} name={item.name} checked={!item.isUneven} onChange={() => item.setIsUneven(false) } />
                    </label>
                  
                </div>               
            ))}
            <button type='button' onClick={handleResults}>Test Result</button>
        </fieldset>
    )
}