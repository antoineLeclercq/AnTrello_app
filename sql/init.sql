CREATE TABLE list (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  position integer NOT NULL
);

CREATE TABLE card (
  id serial PRIMARY KEY,
  list_id integer NOT NULL REFERENCES list(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  due_date timestamp with time zone,
  position integer NOT NULL,
  subscriber boolean NOT NULL
);

CREATE TABLE label (
  id serial PRIMARY KEY,
  name varchar(255),
  color varchar(7) NOT NULL
);

CREATE TABLE card_label (
  id serial PRIMARY KEY,
  card_id integer NOT NULL REFERENCES card(id) ON DELETE CASCADE,
  label_id integer NOT NULL REFERENCES label(id) ON DELETE CASCADE
);

CREATE TABLE comment (
  id serial PRIMARY KEY,
  card_id integer NOT NULL REFERENCES card(id) ON DELETE CASCADE,
  content text NOT NULL
);

CREATE TABLE activity (
  id serial PRIMARY KEY,
  card_id integer NOT NULL REFERENCES card(id) ON DELETE CASCADE,
  card_id_source integer REFERENCES card(id) ON DELETE CASCADE,
  comment_id integer REFERENCES comment(id) ON DELETE CASCADE,
  list_id_source integer REFERENCES list(id) ON DELETE CASCADE,
  list_id_dest integer REFERENCES list(id) ON DELETE CASCADE,
  action varchar(255) NOT NULL,
  actionable_item varchar(255) NOT NULL,
  due_date timestamp with time zone,
  date timestamp with time zone NOT NULL DEFAULT current_timestamp
);

ALTER TABLE activity ADD CHECK (action IN ('add', 'change', 'remove', 'move', 'copy'));
ALTER TABLE activity ADD CHECK (actionable_item IN ('card', 'due_date', 'comment'));

CREATE TABLE notification (
  id serial PRIMARY KEY,
  activity_id integer NOT NULL REFERENCES activity(id) ON DELETE CASCADE,
  seen boolean NOT NULL
);

-- Starting entities
INSERT INTO list(name, position) VALUES ('Backlog', 0);
INSERT INTO list(name, position) VALUES ('This Month', 1);
INSERT INTO list(name, position) VALUES ('This Week', 2);
INSERT INTO list(name, position) VALUES ('Today', 3);


-- INSERT INTO card (list_id, name, description, due_date, position, subscriber)
-- VALUES
--   (1, 'backlog task', NULL, NULL, 0, 'false'),
--   (2, 'task for this month', NULL, NULL, 0, false),
--   (3, 'task for this week', 'finish by end of week', NULL, 0, true),
--   (4, 'task for today', 'finish by today', current_timestamp, 0, true),
--   (4, 'another task for today', 'finish by today', current_timestamp, 1, true);

-- INSERT INTO comment(card_id, content)
-- VALUES
--   (2, 'test comment - finish by end of month'),
--   (3, 'test comment - finish by end of week'),
--   (4, 'test comment - finish by end of day');


INSERT INTO label(color)
VALUES
  ('#F2D600'),
  ('#FFAB4A'),
  ('#EB5A46'),
  ('#C377E0'),
  ('#0079BF'),
  ('#51E898'),
  ('#FF80CE'),
  ('#4D4D4D'),
  ('#B6BBBF');

-- INSERT INTO card_label (card_id, label_id)
-- VALUES
--   (1, 2),
--   (1, 5),
--   (2, 3),
--   (3, 2),
--   (3, 6),
--   (4, 7),
--   (4, 1),
--   (4, 4),
--   (5, 4);

-- INSERT INTO activity(card_id, action, actionable_item, due_date)
-- VALUES (4, 'add', 'due_date', current_timestamp);
-- INSERT INTO activity(card_id, list_id_source, list_id_dest, action, actionable_item)
-- VALUES (1, 3, 1, 'move', 'card');
