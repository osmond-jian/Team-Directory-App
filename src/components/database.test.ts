import { describe, it, expect } from "vitest";
import { getTeamMembers } from "../getTeamMembers.ts";
import * as database from "../../database/team_database.json";

describe("Function should get team members from database JSON", () => {

  it("should grab all of the team members from the database", () => {
    expect(getTeamMembers('').length).toBe(database.length);
  });

  it("should search all of the grabbed data based on parameter string", () => {
    expect(getTeamMembers('Osmond')).toBe(
        {
            name: "Osmond Jian",
            role: "Fullstack Developer",
            email: "osmond@kpmpower.com"
        }
    );
  });
});
