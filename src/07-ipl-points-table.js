/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here

  if( !Array.isArray(matches) || matches.length === 0) return [];

  const accObj = {};

  for (let i = 0;  i < matches.length; i++)
  {

    const mtch = matches[i];
    if(!mtch || typeof mtch != "object") continue;

    const tm1 = mtch.team1;
    const tm2 = mtch.team2;
    const rst = mtch.result;
     

     if (typeof tm1 !== "string" || typeof tm2 !== "string" || typeof rst !== "string") continue;
    if (tm1.trim() === "" || tm2.trim() === "") continue;

    const team1  = tm1.trim();
    const team2  =  tm2.trim();
    const result = rst.trim().toLowerCase();
     
    
    if (!accObj[team1]) accObj[team1] = { team: team1, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0 };
    if (!accObj[team2]) accObj[team2] = { team: team2, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0 };


    accObj[team1].played += 1;
    accObj[team2].played += 1;

    if (result === "tie")
    {    accObj[team1].played += 1;
      accObj[team2].played += 1;
        accObj[team1].tied += 1;
        accObj[team2].tied += 1;
        accObj[team1].points += 1;
        accObj[team2].points += 1;
    } 
    else if(  result === "no_result" || result === "nr" ||  result === "noresult")
    { accObj[team1].played += 1;
      accObj[team2].played += 1;
      accObj[team1].noResult += 1;
      accObj[team2].noResult += 1;
      accObj[team1].points += 1;
      accObj[team2].points += 1;
    }
    else if (result === "win")
    {
        const wnr = mtch.winner;
      if (typeof wnr !== "string" || wnr.trim() === "") continue;

      const winner = wnr.trim();
      if (winner !== team1 && winner !== team2) continue;

      const loser = winner === team1 ? team2 : team1;
       accObj[winner].played += 1;
      accObj[loser].played += 1;
      accObj[winner].won += 1;
      accObj[winner].points += 2;
      accObj[loser].lost += 1;
    }
     
  const sortedObj = Object.values(accObj);   
  sortedObj.sort((a, b) =>  {
    if (b.points !== a.points) return b.points - a.points;
    return a.team.localeCompare(b.team);
  });

  return sortedObj
}

}
