INSERT INTO users (first_name, last_name, created_at, profile_pic, stripe_id, password, email, username, connected_account_id)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning first_name, last_name, created_at, profile_pic, stripe_id, email, connected_account_id;