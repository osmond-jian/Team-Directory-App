// Profile.tsx
import { useParams } from 'react-router';
import { TeamMemberProfile } from '../components/MemberProfile';
import type { databaseObject } from '../types';

//Profile component - wraps the TeamMemberProfile component so I can pass a prop into it while rendering (complicated to do it via react-router)
export function Profile() {
  const { email } = useParams<{ email: string }>();

  const database: databaseObject[] = JSON.parse(localStorage.getItem("database") || "[]");
  const teamMember = database.find((member) => member.email === email);

  //Added in case user tries to access a user that does not exist
  if (!teamMember) {
    return <div>Team member not found</div>;
  }

  return <TeamMemberProfile teamMember={teamMember} />;
}
