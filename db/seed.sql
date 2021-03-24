CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar(300) unique,
  "created_at" timestamp,
  "profile_pic" text,
  "stripe_id" text,
  "connected_account_id" text,
  "country" varchar(50)
);

CREATE TABLE "live_streams" (
  "id" int PRIMARY KEY,
  "stream_key" text,
  "playback_id" text,
  "scheduled_date" timestamp,
  "key_words" varchar(1001),
  "user_id" int,
  "start_date" timestamp,
  "end_date" timestamp
);

CREATE TABLE "comments" (
  "id" int PRIMARY KEY,
  "content" varchar(10000),
  "user_id" int,
  "live_stream_id" int,
  "comment_id" int,
  "post_date" timestamp
);

CREATE TABLE "questions" (
  "id" int PRIMARY KEY,
  "content" varchar(10000),
  "user_id" int,
  "live_stream_id" int,
  "time_answered" text,
  "post_date" timestamp
);

CREATE TABLE "subscriptions" (
  "id" int PRIMARY KEY,
  "subscribed_user_id" int,
  "subscription_user_id" int
);

ALTER TABLE "live_streams" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("live_stream_id") REFERENCES "live_streams" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("comment_id") REFERENCES "comments" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("live_stream_id") REFERENCES "live_streams" ("id");

ALTER TABLE "subscriptions" ADD FOREIGN KEY ("subscribed_user_id") REFERENCES "users" ("id");

ALTER TABLE "subscriptions" ADD FOREIGN KEY ("subscription_user_id") REFERENCES "users" ("id");
