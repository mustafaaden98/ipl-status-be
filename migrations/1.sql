DROP DATABASE cricket;
CREATE DATABASE cricket;
use cricket;

CREATE TABLE IPLTeam(
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE IPLMatch(
    id BIGINT NOT NULL,
    -- playerOfTheMatch BIGINT,
    stadium VARCHAR(100),
    team1 BIGINT,
    team2 BIGINT,    
    tossDecision VARCHAR(20),
    tossWinner BIGINT,
    winner BIGINT,
    dateOfMatch DATE,
    PRIMARY KEY (id),
    -- FOREIGN KEY (playerOfTheMatch) REFERENCES player(id),
    FOREIGN KEY (team1) REFERENCES IPLTeam(id),
    FOREIGN KEY (team2) REFERENCES IPLTeam(id),
    FOREIGN KEY (tossWinner) REFERENCES IPLTeam(id),
    FOREIGN KEY (winner) REFERENCES IPLTeam(id)
)