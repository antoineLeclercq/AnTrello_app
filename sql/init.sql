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

CREATE TABLE action (
  id serial PRIMARY KEY,
  type varchar(255) NOT NULL
);

CREATE TABLE actionable_item (
  id serial PRIMARY KEY,
  name varchar(255)
);

CREATE TABLE activity (
  id serial PRIMARY KEY,
  card_id integer NOT NULL REFERENCES card(id) ON DELETE CASCADE,
  list_id_source integer REFERENCES list(id) ON DELETE CASCADE,
  list_id_dest integer REFERENCES list(id) ON DELETE CASCADE,
  action_id integer REFERENCES action(id),
  actionable_item_id integer REFERENCES actionable_item(id),
  comment_id integer REFERENCES comment(id),
  date timestamp NOT NULL
);

CREATE TABLE notification (
  id serial PRIMARY KEY,
  activity_id integer NOT NULL REFERENCES activity(id) ON DELETE CASCADE,
  seen boolean NOT NULL
);

INSERT INTO action(type)
VALUES
  ('add'),
  ('archive'),
  ('update'),
  ('move'),
  ('copy');

INSERT INTO actionable_item(name)
VALUES
  ('card'),
  ('comment'),
  ('due_date');


-- Starting entities
INSERT INTO list(name, position) VALUES ('Backlog', 0);
INSERT INTO list(name, position) VALUES ('This Month', 1);
INSERT INTO list(name, position) VALUES ('This Week', 2);

INSERT INTO card (list_id, name, description, due_date, position, subscriber)
VALUES
  (1, 'fix background bug', 'harmless, bug, fix when possible', NULL, 0, 'false'),
  (1, 'replace modal', 'replace on second page', NULL, 1, false),
  (2, 'finish project', 'add tests', current_timestamp, 0, true);

INSERT INTO comment(card_id, content) VALUES (2, 'added 1 test');

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

INSERT INTO card_label (card_id, label_id)
VALUES
  (1, 2),
  (1, 5),
  (2, 3),
  (3, 2),
  (3, 6);


INSERT INTO activity(card_id, action_id, actionable_item_id, date)
VALUES (2, 1, 2, current_timestamp);
INSERT INTO activity(card_id, list_id_source, list_id_dest, action_id, actionable_item_id, date)
VALUES (3, 2, 3, 4, 1, current_timestamp);


INSERT INTO notification(activity_id, seen)
VALUES (1, false);




