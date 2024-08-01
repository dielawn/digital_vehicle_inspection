import { useEffect, useState } from 'react'

export const Tires = ({ sortConcerns, driveType, tireSize, setTireSize, loadRange, setLoadRange }) => {
    
    const [tireNotes, setTireNotes] = useState('');
    const [isAWD, setIsAWD] = useState(false);
    // LF
    const [lFDate, setLFDate] = useState('');
    const [lFTread, setLFTread] = useState(8);
    const [isUnevenLF, setIsUnevenLF] = useState(false);
    // RF
    const [rFDate, setRFDate] = useState('');
    const [rFTread, setRFTread] = useState(8);
    const [isUnevenRF, setIsUnevenRF] = useState(false);
    // RR
    const [rRDate, setRRDate] = useState('');
    const [rRTread, setRRTread] = useState(8);
    const [isUnevenRR, setIsUnevenRR] = useState(false);
    // LR
    const [lRDate, setLRDate] = useState('');
    const [lRTread, setLRTread] = useState(8);
    const [isUnevenLR, setIsUnevenLR] = useState(false);



    const tireInfo = [
      {
            name: 'Left front',
            date: lFDate,
            setDate: setLFDate,
            tread: lFTread,
            setTread: setLFTread,
            isUneven: isUnevenLF,
            setIsUneven: setIsUnevenLF
        },
        {
            name: 'Right front',
            date: rFDate,
            setDate: setRFDate,
            tread: rFTread,
            setTread: setRFTread,
            isUneven: isUnevenRF,
            setIsUneven: setIsUnevenRF
        },
        {
            name: 'Right rear',
            date: rRDate,
            setDate: setRRDate,
            tread: rRTread,
            setTread: setRRTread,
            isUneven: isUnevenRR,
            setIsUneven: setIsUnevenRR
        },
        {
            name: 'Left rear',
            date: lRDate,
            setDate: setLRDate,
            tread: lRTread,
            setTread: setLRTread,
            isUneven: isUnevenLR,
            setIsUneven: setIsUnevenLR
        },
    ];

    const loadRangeOptions = ['P', 'C', 'D', 'E']

    const formatTireSize = () => {
        const regex = /^(\d{3})(\d{2})(\d{2})$/;
        const match = tireSize.match(regex)
        if (match) {
            return `${match[1]}/${match[2]}/${match[3]}`
        } else {
            return tireSize
        }
    };

    const handleDriveType = () => {
        console.log(driveType)
        if (driveType === 'AWD') {
            setIsAWD(true)
        } else {
            setIsAWD(false)
        }
    }

    useEffect(() => {
        handleDriveType()
        console.log(driveType, isAWD)

    }, [driveType])


 
    const handleResults = () => {

        // Get last 2 digits of current year
        const now = new Date();
        const twoDigitYear = now.getFullYear() - 2000;        
           
        const getTireAge = (date) => twoDigitYear - (date % 100);

        tireInfo.map((item) => {
            const tireAge = getTireAge(item.date);            
            const formattedTireSize = formatTireSize();
            let msg = `${item.name}: ${item.tread}/32, ${tireAge} years old, ${item.isUneven ? 'Uneven wear' : '' }`
            // No date code info
            if (item.date === '' || !item.date ) {
                msg = `${item.name}: ${item.tread}/32, ${item.isUneven ? 'Uneven wear' : '' }`
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
    };



    return (
        <fieldset >
            <legend>Tires</legend>
            <label>Tire size: 
                <input 
                    type='text'
                    value={tireSize}
                    onChange={(e) => setTireSize(e.target.value)}
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