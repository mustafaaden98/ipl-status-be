import fs from 'fs';
import yaml from 'js-yaml';
import query from './services/db.js';
import cors from 'cors';
import express from 'express';
import router from './routes/ipl.js';

const app = express();
app.use(cors({
    origin: "http://localhost:3000"
}));

app.use('/', router);
const PORT = 5000;


app.listen(PORT, () => console.log("App is listening on port 5000"))




// const cache = {
//     teamNameToId : {},
//     teamNameToCurrentPlaying: {}
// }

// const getTeamInfo = async (name) => {
//     if(!name) return null;
//     if(cache.teamNameToId[name]){
//         return cache.teamNameToId[name];
//     }
//     const response = await query(`SELECT id FROM IPLTeam WHERE name = ? LIMIT 1`, [name]); 
//     let teamId = null;
//     console.log("response index", response);
//     if(response && response.length && response[0].id){
//         teamId = response[0].id;
//     }
//     if(!teamId){
//         teamId = (await query(`INSERT INTO IPLTeam(name) VALUES (?)`, [name])).insertId;
//     }
//     cache.teamNameToId[name] = teamId;
//     return teamId;
// }

// const updateteamInCurrentSeason = async (team) => {
//     if(cache.teamNameToCurrentPlaying[team]){
//         return;
//     }
//     await query(`UPDATE IPLTeam SET currentlyPlaying=1 WHERE name =?`, [team]);
//     cache.teamNameToCurrentPlaying[team] = true
//     return;
// }
// const addMatchIfNotAdded = async (match) => {
//     const response = await query(`SELECT id FROM IPLMatch WHERE id = ?`, [match.id]);
//     if(response && response.length){
//         return true;
//     }else {
//         const team1 = await getTeamInfo(match.team1);
//         const team2 = await getTeamInfo(match.team2);
//         const winner = await getTeamInfo(match.winner);
//         await query(`INSERT INTO IPLMatch (id,team1,team2,dateOfMatch,winner,city) VALUES (?,?,?,?,?,?)` ,
//         [match.id, team1, team2,match.date,winner,match.city]);
//         return false;
//     }
// }
// const storeInDb = async ({IPLTeams, matchDetails, yearOfMatch}) => {
//     for(let i in IPLTeams){
//         await getTeamInfo(IPLTeams[i]);
//         if(yearOfMatch === 2020){
//             await updateteamInCurrentSeason(IPLTeams[i]);
//         }
//     }
//     const isAlreadyAdded = await addMatchIfNotAdded(matchDetails);
//     if(isAlreadyAdded) return;
// }

// try {
//     let files = fs.readdirSync("./data/ipl");
//     console.log("files", files);
//     const IPLTeams = [];
//     const matchDetails = {}
//     for(let i in files){
//         const file = files[i];
//         let fileContents = fs.readFileSync(`./data/ipl/${file}`, 'utf8');
//         let data = yaml.load(fileContents);
        
//         const teams = data && data.info.teams;
//         teams.forEach(team => {
//             if(!IPLTeams.includes(team)){
//                 IPLTeams.push(team);
//             }
//         })
//         const yearOfMatch = new Date(data.info.dates[0]).getFullYear();
//         const matchId = file.replace(".yaml","");
//         const matchDetails = {
//             id: matchId,
//             team1: teams[0],
//             team2: teams[1],
//             date: data.info.dates[0],
//             winner: data.info.outcome.winner,
//             city: data.info.city
//         }
//         await storeInDb({IPLTeams, matchDetails, yearOfMatch})
//     }
//     console.log("teams", IPLTeams)

// }catch(error){
//     console.log("error", error);
// }
