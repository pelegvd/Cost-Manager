/* Peleg Vadbeker 209485838
   Eden Blau 208571927
   Dudi Kreis 311333900
*/
import React, {useEffect} from 'react';
import './About.css'
import TeamMember from './teamMember';
import peleg from './peleg.jpg'
import eden from './eden.jpeg'
import dudi from './dudi.jpeg'

//array of 3 group members

const teamMembers = [
    {
        name: 'Peleg Vadbeker',
        role: 'Computer Science student - HIT and System Administrator',
        picture: peleg
    },
    {
        name: 'Eden Blau',
        role: 'Computer Science student - HIT and NOC engineer',
        picture: eden
    },
    {
        name: 'Dudi Kreis',
        role: 'Computer Science student - HIT and Junior Front End Developer',
        picture: dudi
    }
];

/*
About us function tell us about the project and team members.
about us contain map function that iterates over the team members array and for each team member it creates a new "team Member" component
note : we have team member as objects and team Member component.
*/


function AboutUs() {
    useEffect(() => {
        document.title = 'About Us';
    }, []);
    return (
        <div className="about-us-container">
            <h1 className="about-us-text">About Our Project</h1>
            <p className="about-us-text">Our system is a tool for managing financial expenses, to enter your financial expenses you must enter date, item, price, category and description and click on add item.</p>
            <p className="about-us-text">The items you entered will appear in the table below, you also have the option to filter by month and year and see the expenses in this period.</p>
            <h2>Meet the Team</h2>
            <div className="team-members-container">
                {teamMembers.map((member) => (
                    <TeamMember
                        key={member.name}
                        name={member.name}
                        role={member.role}
                        picture={member.picture}
                    />
                ))}
            </div>
        </div>
    );
}

export default AboutUs;
