import {useState} from 'react';
import { getTeamMembers } from '../API/getTeamMembers';
import { Button } from './Button';
import { SearchResultTable } from './Table';
import { Modal } from './Modal';

//This is the Team Directory Page component that the user can see to actually query and visualize the results of the team member search

export function TeamDirectory() {
  //this keeps track of the search term in the search bar
  const [searchTerm, setSearchTerm] = useState('');
  //this keeps track of any specific property to search for (e.g. name, role, or email)
  const [property, setProperty] = useState('');
  //this is the team members found by the search
  const [teamMembers, setTeamMembers] = useState<{ name: string; role: string; email: string; picture:string; bio:string }[]>([]);
  //this state keeps track of whether the search is loading or not; displays intermediary states like loading spinners
  const [loading, setLoading] = useState(false);
  //this state keeps track of the add new member modal
  const [modal, setModal] = useState(false);

  function showModal(){
    if (modal){
        setModal(false);
        return;
    }
    setModal(true);
  }

  //search functionality
  async function handleSearch() {
    //sets loading, maybe add loading logic later or a spinner or something
    setLoading(true);
    //get the result from the "API"
    const result = await getTeamMembers(searchTerm, property);
    //set the state for the rerender
    setTeamMembers(result);
    //stop the loading logic like the spinner
    setLoading(false);
  };

  //enables property-specific filtering for the search
  function handleSearchFilter(label:string) {
    //if property is already set, unselect it and set state to empty string
    if (property){
        setProperty('');
        return;
    }
    //if property is empty string, add the label to the property
    setProperty(label);

  }
  
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
                <Button label="name" onClick={()=>handleSearchFilter("name")} selected={property==='name'? true : false} />
                <Button label="role" onClick={()=>handleSearchFilter("role")} selected={property==='role'? true : false}  />
                <Button label="email" onClick={()=>handleSearchFilter("email")} selected={property==='email'? true : false} />
            </div>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Submit Button */}
            <Button label="Search" onClick={handleSearch} selected={false} />
            </div>
            {/* Add teamMember button */}
            <div>
            <Button label="+ Add Member" onClick={showModal} selected={false}/>
            </div>
        </section>
        <SearchResultTable teamMembers={teamMembers} loading={loading}/>
        <Modal teamMember={{name:"", role:"", email:"", picture:"", bio:""}} modalState={modal?true:false} closeModalState={()=> setModal(false)} />
        </>

    )
}