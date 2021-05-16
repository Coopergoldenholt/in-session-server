select * from live_streams WHERE scheduled_date > $1 
ORDER BY scheduled_date
LIMIT 20;