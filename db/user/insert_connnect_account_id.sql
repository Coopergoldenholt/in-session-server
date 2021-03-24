INSERT INTO users (connected_account_id)
VALUES($1)
returning *;