SELECT ls.id, ls.stream_key, ls.playback_id, ls.stream_title, ls.stream_info, ls.thumbnail, ls.key_words, ls.private, ls.viewers, ls.live, ls.complete, ls.price, ls.total_interested, ls.scheduled_date, u.username 
FROM live_streams ls
JOIN users u ON u.id = ls.author_id
LIMIT 100;