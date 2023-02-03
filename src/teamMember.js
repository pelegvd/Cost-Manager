/* Peleg Vadbeker 209485838
   Eden Blau 208571927
   Dudi Kreis 311333900
*/
import React from 'react';
function TeamMember({ name, role, picture }) {
    return (
        <div className="team-member-card">
            <img src={picture} alt={name} />
            <h3>{name}</h3>
            <p>{role}</p>
        </div>
    );
}

export default TeamMember;
