SELECT * FROM live_streams ls
JOIN images ON ls.thumbnail = images.id
LIMIT 100;