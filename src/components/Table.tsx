import React, { useState } from 'react';
import type { databaseObject } from '../types';
import { Button } from './Button';
import { Modal } from './Modal';
import { deleteTeamMember } from '../API/updateLocalStorageDatabase';
import { Link } from 'react-router';
import './Table.scss';

type TableProps = {
  teamMembers: Array<databaseObject>;
  loading: boolean;
  handleSearchRefresh: () => void;
};

//pagination constant that can be easily changed here
const ITEMS_PER_PAGE = 10;

export const SearchResultTable: React.FC<TableProps> = ({
  teamMembers,
  loading,
  handleSearchRefresh,
}) => {
  const [modal, setModal] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<databaseObject>({
    name: '',
    role: '',
    email: '',
    picture: '',
    bio: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

  function showModal(selectedMember: databaseObject) {
    setModal(true);
    setSelectedTeamMember(selectedMember);
  }

  // Pagination logic
  const totalPages = Math.ceil(teamMembers.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = teamMembers.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <section className="results-table">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((member) => (
                      <tr key={member.email}>
                        <td>{member.name}</td>
                        <td>{member.role}</td>
                        <td>{member.email}</td>
                        <td>
                          <Button label={'Edit'} onClick={() => showModal(member)} selected={false} />
                        </td>
                        <td>
                          <Button
                            label={'Delete'}
                            onClick={() => {
                              deleteTeamMember(member);
                              handleSearchRefresh();
                            }}
                            selected={false}
                          />
                        </td>
                        <td>
                          <Link to={`/profile/${member.email}`}>See More</Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>No results found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                  ← Prev
                </button>

                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={pageNum === currentPage ? 'active' : ''}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Modal
        teamMember={selectedTeamMember}
        modalState={modal}
        closeModalState={() => setModal(false)}
        handleSearchRefresh={handleSearchRefresh}
      />
    </>
  );
};
