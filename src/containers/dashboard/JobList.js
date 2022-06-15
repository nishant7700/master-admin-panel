import React from 'react';
import moment from 'moment';

export default function JobList({ info, upcomming }) {
    console.log("INFO", info);
    return (
        <ul>
            {iterate(info, upcomming)}
        </ul>
    )
}

function iterate(data, flag) {
    if (!data) return;
    const bgColor = flag ? { backgroundColor : "#ffe66d"} : {};
    return (
        <>
            {
                data.map((person, index) => {
                    Old(person.doj)
                    return (
                        <li key={index}>
                            <div className="flex">
                                <div className="title">
                                    <p className='name'><strong>{person.name}</strong></p>
                                    <p className='name'>{person.doj && moment(person.doj).format("DD-MMM")}</p>
                                  
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </>
    )

}

// how old the person is
function Old(personExperience) {
    let year = new Date(personExperience).getFullYear()
    let currentYear = new Date().getFullYear()
    console.log(currentYear)

    let experience = currentYear - year;
    console.log(experience)
    return experience;

}



