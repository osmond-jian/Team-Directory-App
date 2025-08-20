import {useState} from 'react';
import { getTeamMembers } from '../API/getTeamMembers';
import { Button } from './button';

export function TeamDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [property, setProperty] = useState('');
  const [teamMembers, setTeamMembers] = useState<{ name: string; role: string; email: string }[]>([]);
  const [loading, setLoading] = useState(false);

//search functionality
  const handleSearch = async () => {
    //sets loading, maybe add loading logic later or a spinner or something
    setLoading(true);
    //get the result from the "API"
    const result = await getTeamMembers(searchTerm, property);
    //set the state for the rerender
    setTeamMembers(result);
    //stop the loading logic like the spinner
    setLoading(false);
  };
    return(
        <>
        {/* Header Card */}
        <header className="header-card">
            <h1>Team Directory</h1>
            <p>Search and filter team members by name, role, or email</p>
        </header>

        {/* Controls Area */}
        <section className="controls">
            <div className="controls-inputs">
            {/* Filter buttons */}
            <div className="filter-buttons">
                <button onClick={() => setProperty('name')}>Name</button>
                <button onClick={() => setProperty('role')}>Role</button>
                <button onClick={() => setProperty('email')}>Email</button>
            </div>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Submit Button */}
            <Button label="Search" onClick={handleSearch} />
            </div>
        </section>

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