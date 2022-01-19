CREATE TABLE IF NOT EXISTS place_master (
	place_seq INTEGER PRIMARY KEY not NULL,
	region TEXT,
	prefecture TEXT,
	name TEXT,
	detail TEXT,
	longitude REAL,
	latitude REAL,
	tag TEXT,
	address TEXT,
	updated_at TEXT,
	get_flg INTEGER,
	got_at TEXT
);

CREATE TABLE IF NOT EXISTS medal_master (
    medal_id INTEGER PRIMARY KEY NOT NULL,
    title TEXT,
    limit_count INTEGER
);

CREATE TABLE IF NOT EXISTS medal_place (
    place_seq INTEGER,
    medal_id INTEGER
);
