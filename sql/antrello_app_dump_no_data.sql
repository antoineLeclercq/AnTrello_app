--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE antrello_app;
--
-- Name: antrello_app; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE antrello_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect antrello_app

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: update_notifications(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION update_notifications() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        IF NEW.subscriber = true THEN
            INSERT INTO notification (activity_id) (
                SELECT activity.id FROM activity
                LEFT JOIN notification ON activity.id = notification.activity_id
                WHERE activity.card_id = NEW.id AND notification.activity_id IS NULL
            );
        ELSIF NEW.subscriber = false THEN
            DELETE FROM notification WHERE activity_id IN (
                SELECT id FROM activity WHERE card_id = NEW.id
            );
        END IF;
        RETURN NULL;
    END;
$$;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: activity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE activity (
    id integer NOT NULL,
    card_id integer NOT NULL,
    card_id_source integer,
    comment_id integer,
    list_id_source integer,
    list_id_dest integer,
    action character varying(255) NOT NULL,
    actionable_item character varying(255) NOT NULL,
    due_date timestamp with time zone,
    date timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT activity_action_check CHECK (((action)::text = ANY (ARRAY[('add'::character varying)::text, ('change'::character varying)::text, ('remove'::character varying)::text, ('move'::character varying)::text, ('copy'::character varying)::text]))),
    CONSTRAINT activity_actionable_item_check CHECK (((actionable_item)::text = ANY (ARRAY[('card'::character varying)::text, ('due_date'::character varying)::text, ('comment'::character varying)::text])))
);


--
-- Name: activity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE activity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE activity_id_seq OWNED BY activity.id;


--
-- Name: card; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE card (
    id integer NOT NULL,
    list_id integer NOT NULL,
    name text NOT NULL,
    description text,
    due_date timestamp with time zone,
    "position" integer NOT NULL,
    subscriber boolean NOT NULL
);


--
-- Name: card_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE card_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE card_id_seq OWNED BY card.id;


--
-- Name: card_label; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE card_label (
    id integer NOT NULL,
    card_id integer NOT NULL,
    label_id integer NOT NULL
);


--
-- Name: card_label_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE card_label_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: card_label_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE card_label_id_seq OWNED BY card_label.id;


--
-- Name: comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE comment (
    id integer NOT NULL,
    card_id integer NOT NULL,
    content text NOT NULL
);


--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE comment_id_seq OWNED BY comment.id;


--
-- Name: label; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE label (
    id integer NOT NULL,
    name character varying(255),
    color character varying(7) NOT NULL
);


--
-- Name: label_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE label_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: label_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE label_id_seq OWNED BY label.id;


--
-- Name: list; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE list (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "position" integer NOT NULL
);


--
-- Name: list_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE list_id_seq OWNED BY list.id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE notification (
    id integer NOT NULL,
    activity_id integer NOT NULL,
    seen boolean DEFAULT false NOT NULL
);


--
-- Name: notification_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE notification_id_seq OWNED BY notification.id;


--
-- Name: activity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY activity ALTER COLUMN id SET DEFAULT nextval('activity_id_seq'::regclass);


--
-- Name: card id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY card ALTER COLUMN id SET DEFAULT nextval('card_id_seq'::regclass);


--
-- Name: card_label id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY card_label ALTER COLUMN id SET DEFAULT nextval('card_label_id_seq'::regclass);


--
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY comment ALTER COLUMN id SET DEFAULT nextval('comment_id_seq'::regclass);


--
-- Name: label id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY label ALTER COLUMN id SET DEFAULT nextval('label_id_seq'::regclass);


--
-- Name: list id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY list ALTER COLUMN id SET DEFAULT nextval('list_id_seq'::regclass);


--
-- Name: notification id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY notification ALTER COLUMN id SET DEFAULT nextval('notification_id_seq'::regclass);


--
-- Data for Name: activity; Type: TABLE DATA; Schema: public; Owner: -
--

COPY activity (id, card_id, card_id_source, comment_id, list_id_source, list_id_dest, action, actionable_item, due_date, date) FROM stdin;
\.


--
-- Name: activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('activity_id_seq', 21, true);


--
-- Data for Name: card; Type: TABLE DATA; Schema: public; Owner: -
--

COPY card (id, list_id, name, description, due_date, "position", subscriber) FROM stdin;
\.


--
-- Name: card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('card_id_seq', 9, true);


--
-- Data for Name: card_label; Type: TABLE DATA; Schema: public; Owner: -
--

COPY card_label (id, card_id, label_id) FROM stdin;
\.


--
-- Name: card_label_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('card_label_id_seq', 16, true);


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY comment (id, card_id, content) FROM stdin;
\.


--
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('comment_id_seq', 6, true);


--
-- Data for Name: label; Type: TABLE DATA; Schema: public; Owner: -
--

COPY label (id, name, color) FROM stdin;
1	\N	#F2D600
2	\N	#FFAB4A
3	\N	#EB5A46
4	\N	#C377E0
5	\N	#0079BF
6	\N	#51E898
7	\N	#FF80CE
8	\N	#4D4D4D
9	\N	#B6BBBF
\.


--
-- Name: label_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('label_id_seq', 9, true);


--
-- Data for Name: list; Type: TABLE DATA; Schema: public; Owner: -
--

COPY list (id, name, "position") FROM stdin;
\.


--
-- Name: list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('list_id_seq', 4, true);


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY notification (id, activity_id, seen) FROM stdin;
\.


--
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('notification_id_seq', 8, true);


--
-- Name: activity activity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);


--
-- Name: card_label card_label_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY card_label
    ADD CONSTRAINT card_label_pkey PRIMARY KEY (id);


--
-- Name: card card_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY card
    ADD CONSTRAINT card_pkey PRIMARY KEY (id);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- Name: label label_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY label
    ADD CONSTRAINT label_pkey PRIMARY KEY (id);


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);


--
-- Name: card notifications_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER notifications_update AFTER UPDATE OF subscriber ON card FOR EACH ROW EXECUTE PROCEDURE update_notifications();


--
-- Name: activity activity_card_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_card_id_fkey FOREIGN KEY (card_id) REFERENCES card(id) ON DELETE CASCADE;


--
-- Name: activity activity_card_id_source_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_card_id_source_fkey FOREIGN KEY (card_id_source) REFERENCES card(id) ON DELETE CASCADE;


--
-- Name: activity activity_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES comment(id) ON DELETE CASCADE;


--
-- Name: activity activity_list_id_dest_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_list_id_dest_fkey FOREIGN KEY (list_id_dest) REFERENCES list(id) ON DELETE CASCADE;


--
-- Name: activity activity_list_id_source_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_list_id_source_fkey FOREIGN KEY (list_id_source) REFERENCES list(id) ON DELETE CASCADE;


--
-- Name: card_label card_label_card_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY card_label
    ADD CONSTRAINT card_label_card_id_fkey FOREIGN KEY (card_id) REFERENCES card(id) ON DELETE CASCADE;


--
-- Name: card_label card_label_label_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY card_label
    ADD CONSTRAINT card_label_label_id_fkey FOREIGN KEY (label_id) REFERENCES label(id) ON DELETE CASCADE;


--
-- Name: card card_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY card
    ADD CONSTRAINT card_list_id_fkey FOREIGN KEY (list_id) REFERENCES list(id) ON DELETE CASCADE;


--
-- Name: comment comment_card_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_card_id_fkey FOREIGN KEY (card_id) REFERENCES card(id) ON DELETE CASCADE;


--
-- Name: notification notification_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES activity(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

