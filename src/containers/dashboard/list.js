import React from 'react';
import moment from 'moment';

export default function list({ info, upcomming }) {
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
                    Old(person.dob)
                    return (
                        <li key={index}>
                            <div className="flex">
                                <div className="title">
                                    <p className='name'><strong>{person.name}</strong></p>
                                    <p className='name'>{person.dob && moment(person.dob).format("DD-MMM")}</p>
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
function Old(personAge) {
    let year = new Date(personAge).getFullYear()
    let currentYear = new Date().getFullYear()
    // console.log(currentYear)

    let age = currentYear - year;
    // console.log(age)
    return age;

}

