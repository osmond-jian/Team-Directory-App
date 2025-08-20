import { describe, it, expect } from "vitest";
import { getTeamMembers } from "../../API/getTeamMembers";
import database from "../../../database/team_database.json";

describe("Function should get team members from database JSON", () => {

  it("should grab all of the team members from the database", async () => {
    const teamMembers = await getTeamMembers('');
    expect(teamMembers.length).toBe(database.length);
  });

  it("should search all of the grabbed data based on parameter string, case insensitve", async () => {
    const teamMember = await getTeamMembers('oSmOnd');
    expect(teamMember).toStrictEqual(
        [{
            name: "Osmond Jian",
            role: "FullStack Developer",
            email: "osmond@kpmpower.com"
        }]
    );
  });

  it("should only return results from that property if a property paramter is provided", async () => {
    const filteredTeamMembers = await getTeamMembers('Osmond', 'role');
    expect(filteredTeamMembers).toStrictEqual([]);
  })
});
