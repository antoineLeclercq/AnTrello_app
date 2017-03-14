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
  seen boolean DEFAULT false NOT NULL
);

-- automatically add and delete notifications on subscriber column change in card table
CREATE FUNCTION update_notifications() RETURNS trigger AS $notifications_update$
    BEGIN
        IF NEW.subscriber = true THEN
            INSERT INTO notification (activity_id) (
                SELECT id FROM activity WHERE card_id = NEW.id
            );
        ELSIF NEW.subscriber = false THEN
            DELETE FROM notification WHERE activity_id IN (
                SELECT id FROM activity WHERE card_id = NEW.id
            );
        END IF;
        RETURN NULL;
    END;
$notifications_update$ LANGUAGE plpgsql;

CREATE TRIGGER notifications_update AFTER UPDATE OF subscriber ON card
FOR EACH ROW EXECUTE PROCEDURE update_notifications();

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
