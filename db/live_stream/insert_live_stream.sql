INSERT INTO live_streams (stream_key, playback_id, stream_title, thumbnail, scheduled_date, key_words, author_id, private, live, complete, price, stream_info, total_interested)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
returning *;