-- drop tables if exist to ensure working with the most to date tables
-- the order of which tables are dropped matter! 
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS voters;

-- parties table
CREATE TABLE parties (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

-- candidates table
CREATE TABLE candidates (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    party_id INTEGER,
    industry_connected BOOLEAN NOT NULL,
    -- constraint allows us to flag foreign key and tell QL which table and field it references
        -- since constraint relies on parties table, parties table MUST be defined first before
        -- candidates table (therefore the list sequence in this file)
    -- since strict rule established that no candidate can be a member of a party that doesn't
    -- exist, then if party is deleted `ON DELETE SET NULL`
        -- NOTE: because of the dependancy of the foreign key, candidates table must also be
        -- dropped before parties table as well since foreign key constraint requires the parties
        -- table to exist
    CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

-- voters table
CREATE TABLE voters (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    -- capture date and time of when voter registers (based on time of server location, not
    -- location of client's machine)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- vote tracking table
CREATE TABLE votes (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    voter_id INTEGER NOT NULL,
    candidate_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- constraints will ensure that there are no duplicate records since voters are not allowed to vote twice
    -- if relevant candidate/voter is removed, vote is also removed
    -- uc_voter is unique count, so whoever has a voter_id of 1 can only appear once
    CONSTRAINT uc_voter UNIQUE (voter_id),
    -- before, ON DELETE SET NULL means if record is deleted, set to NULL. now, 
    -- ON DELETE CASCADE will delete entire row from table
    CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
    CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);