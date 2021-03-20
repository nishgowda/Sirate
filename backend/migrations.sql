--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: nishgowda
--

CREATE TABLE public.reviews (
    rid integer NOT NULL,
    rating integer NOT NULL,
    rev text NOT NULL,
    likes integer,
    dislikes integer,
    officer_name character varying(225),
    officer_badge_num integer,
    location character varying(225),
    uid integer
);


ALTER TABLE public.reviews OWNER TO nishgowda;

--
-- Name: reviews_rid_seq; Type: SEQUENCE; Schema: public; Owner: nishgowda
--

CREATE SEQUENCE public.reviews_rid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_rid_seq OWNER TO nishgowda;

--
-- Name: reviews_rid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nishgowda
--

ALTER SEQUENCE public.reviews_rid_seq OWNED BY public.reviews.rid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: nishgowda
--

CREATE TABLE public.users (
    uid integer NOT NULL,
    name character varying(225) NOT NULL,
    email character varying(225) NOT NULL,
    password character varying(255) NOT NULL,
    type character varying(140) NOT NULL
);


ALTER TABLE public.users OWNER TO nishgowda;

--
-- Name: users_uid_seq; Type: SEQUENCE; Schema: public; Owner: nishgowda
--

CREATE SEQUENCE public.users_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_uid_seq OWNER TO nishgowda;

--
-- Name: users_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nishgowda
--

ALTER SEQUENCE public.users_uid_seq OWNED BY public.users.uid;


--
-- Name: reviews rid; Type: DEFAULT; Schema: public; Owner: nishgowda
--

ALTER TABLE ONLY public.reviews ALTER COLUMN rid SET DEFAULT nextval('public.reviews_rid_seq'::regclass);


--
-- Name: users uid; Type: DEFAULT; Schema: public; Owner: nishgowda
--

ALTER TABLE ONLY public.users ALTER COLUMN uid SET DEFAULT nextval('public.users_uid_seq'::regclass);


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: nishgowda
--

COPY public.reviews (rid, rating, rev, likes, dislikes, officer_name, officer_badge_num, location, uid) FROM stdin;
1	4	p good	3	0	john	2345	phili, pa	1
2	3	nice	1	0	joe	7890	phili, pa	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: nishgowda
--

COPY public.users (uid, name, email, password, type) FROM stdin;
1	nish	blob@email.com	poo	civilian
3	joe	joe@email.com	$2b$10$chSy/3o2Rz/LalvG/jVN8uW1nBs5.0KcfXhpffy6o6SwwfebkZJY6	civilian
\.


--
-- Name: reviews_rid_seq; Type: SEQUENCE SET; Schema: public; Owner: nishgowda
--

SELECT pg_catalog.setval('public.reviews_rid_seq', 3, true);


--
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: nishgowda
--

SELECT pg_catalog.setval('public.users_uid_seq', 3, true);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: nishgowda
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (rid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: nishgowda
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);


--
-- Name: reviews fk_users_uid; Type: FK CONSTRAINT; Schema: public; Owner: nishgowda
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_users_uid FOREIGN KEY (uid) REFERENCES public.users(uid);


--
-- PostgreSQL database dump complete
--

