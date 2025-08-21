import React from 'react';
import type {databaseObject} from '../types';

//component displays table that shows search results; takes in a teamMembers prop (array) and a loading prop (controls visual loading state)

type TableProps = {
  teamMembers: Array<databaseObject>;
  loading:boolean;
//   onClick: () => void;
};

export const SearchResultTable: React.FC<TableProps> = ({teamMembers, loading}) => {

    return(
        <>
        {/* Table for display */}
        <section className="results-table">
            {/* If loading show this: */}
            {loading ? (
            <p>Loading...</p>
            ) : (
            // If Loaded show this:
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {teamMembers.length > 0 ? (
                    teamMembers.map((member) => (
                    <tr key={member.email}>
                        <td>{member.name}</td>
                        <td>{member.role}</td>
                        <td>{member.email}</td>
                    </tr>
                    ))
                ) : (
                    // IF no results found show this:
                    <tr>
                    <td colSpan={3}>No results found</td>
                    </tr>
                )}
                </tbody>
            </table>
            )}
        </section>
        </>
    )
}