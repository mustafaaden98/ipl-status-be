import db from '../services/db.js';

export const getTeams = async(req, res) => {
    try{
        const data = await db(`SELECT id,name FROM IPLTeam WHERE currentlyPlaying=1`);
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).send("Some Error", error)
    }

}

export const getResults = async(req, res) => {
    try{
        const mustafa = req.query.team1;
        const nafisa = req.query.team2;
        let counts = {};
        const data1 = await db(`SELECT COUNT(winner) as 'team1Win'from (SELECT winner from IPLMatch where team1 =? AND team2 =? or team2=? and team1=?) as T where winner = ?`,[mustafa,nafisa,mustafa,nafisa,mustafa])
        const data2 = await db(`SELECT COUNT(winner) as 'team2Win'from (SELECT winner from IPLMatch where team1 =? AND team2 =? or team2=? and team1=?) as T where winner = ?`,[nafisa,mustafa,nafisa,mustafa,nafisa])
        counts['team1'] = data1[0].team1Win;
        counts['team2'] = data2[0].team2Win;
        // const data = await db(`SELECT id,name FROM IPLTeam WHERE currentlyPlaying=1`);
        // console.log("data", data);
        res.status(200).json(counts)
    }
    catch(error){
        // res.status(500).send("Some Error", error)
        console.log("error", error)
    }

}

export const getMatches = async(req,res) => {
    const mustafa = req.query.team1;
    const nafisa = req.query.team2;
    try{
        // const data = await db(`SELECT COUNT(winner) as 'team1Win'from (SELECT winner from IPLMatch where team1 =? AND team2 =? or team2=? and team1=?) as T where winner = ?`,[mustafa,nafisa,mustafa,nafisa,mustafa])
        // const data = await db(`SELECT team1,team2,winner,dateOfMatch,city from IPLMatch ORDER BY dateOfMatch DESC limit 10`);
        const data = await db(`SELECT team1, team2, winner, dateOfMatch, city from IPLMatch where team1=? AND team2=? OR team1=? AND team2=? ORDER BY dateOfMatch desc`, 
        [mustafa,nafisa,nafisa,mustafa]);
        console.log("data", data);
        res.status(200).json(data);
    }catch(error){
        res.status(500).send(error);
    }
}