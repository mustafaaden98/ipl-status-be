import express from 'express';
import {getTeams, getResults, getMatches} from '../controller/iplMatch.js'
const router = express.Router();


router.get('/teams', getTeams);
router.get('/results', getResults);
router.get('/matches', getMatches);

export default router