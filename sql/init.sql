CREATE TABLE list (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  position integer NOT NULL
);

CREATE TABLE card (
  id serial PRIMARY KEY,
  list_id integer REFERENCES list(id) NOT NULL,
  name text NOT NULL,
  description text,
  due_date timestamp NOT NULL,
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
  card_id integer REFERENCES card(id) NOT NULL,
  label_id integer REFERENCES label(id) NOT NULL
);

CREATE TABLE comment (
  id serial PRIMARY KEY,
  card_id integer REFERENCES card(id) NOT NULL,
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
  card_id integer REFERENCES card(id) NOT NULL,
  list_id integer REFERENCES list(id),
  action_id integer REFERENCES action(id),
  actionable_item_id integer REFERENCES actionable_item(id),
  comment_id integer REFERENCES comment(id),
  date timestamp NOT NULL
);

CREATE TABLE notification (
  id serial PRIMARY KEY,
  activity_id integer REFERENCES activity(id) NOT NULL,
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
