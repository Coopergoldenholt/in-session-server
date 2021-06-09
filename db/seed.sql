CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar(100),
  "last_name" varchar(100),
  "password" text,
  "username" varchar(100),
  "email" varchar(300) unique,
  "created_at" timestamp,
  "profile_pic" text,
  "stripe_id" text,
  "connected_account_id" text,
  "country" varchar(50)
);

CREATE TABLE "live_streams" (
  "id" SERIAL PRIMARY KEY,
  "stream_key" text,
  "playback_id" text,
  "stream_title" varchar(2000),
  "thumbnail" text,
  "scheduled_date" timestamp,
  "key_words" varchar(1001),
  "author_id" int,
  "private" boolean,
  "viewers" int,
  "stream_info" varchar(10000),
  "live" boolean,
  "complete" boolean,
  "price" int,
  "total_interested" int
);

-- CREATE TABLE "private_connections"(
--   "id" SERIAL PRIMARY KEY,
--   "live_stream_id" int,
--   "user_id" int
-- );

CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "content" varchar(10000),
  "user_id" int,
  "live_stream_id" int,
  "comment_id" int,
  "post_date" timestamp
);

CREATE TABLE "subscriptions" (
  "id" SERIAL PRIMARY KEY,
  "subscribed_user_id" int,
  "subscription_user_id" int
);

-- CREATE TABLE "images"(
--   "id" SERIAL PRIMARY KEY,
--   "image" text
-- )

-- ALTER TABLE "users" ADD FOREIGN KEY ("profile_pic") REFERENCES "images" ("id");

ALTER TABLE "live_streams" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

-- ALTER TABLE "live_streams" ADD FOREIGN KEY ("thumbnail") REFERENCES "images" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("live_stream_id") REFERENCES "live_streams" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("comment_id") REFERENCES "comments" ("id");

ALTER TABLE "subscriptions" ADD FOREIGN KEY ("subscribed_user_id") REFERENCES "users" ("id");

ALTER TABLE "subscriptions" ADD FOREIGN KEY ("subscription_user_id") REFERENCES "users" ("id");

-- ALTER TABLE "private_connections" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

-- ALTER TABLE "private_connections" ADD FOREIGN KEY ("live_stream_id") REFERENCES "live_streams" ("id");
