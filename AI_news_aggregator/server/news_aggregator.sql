--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: headlines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.headlines (
    id integer NOT NULL,
    headline text NOT NULL,
    score integer NOT NULL,
    category character varying(50) NOT NULL
);


ALTER TABLE public.headlines OWNER TO postgres;

--
-- Name: headlines_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.headlines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.headlines_id_seq OWNER TO postgres;

--
-- Name: headlines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.headlines_id_seq OWNED BY public.headlines.id;


--
-- Name: headlines id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.headlines ALTER COLUMN id SET DEFAULT nextval('public.headlines_id_seq'::regclass);


--
-- Data for Name: headlines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.headlines (id, headline, score, category) FROM stdin;
3	You won’t believe what this celebrity did at a party!	60	Clickbait
4	Government officials caught in secret meeting about UFOs!	90	Conspiracy
5	New study finds potential cure for cancer	20	Legitimate
6	The TRUTH about 5G towers they don’t want you to know!	95	Conspiracy
7	Stock market crashes due to shocking reason!	70	Clickbait
8	Scientists predict Earth’s magnetic poles will shift soon	15	Legitimate
9	Did the government hide evidence of alien life?	85	Conspiracy
10	Elections were rigged using secret hacking techniques	80	Conspiracy
11	This one food will make you lose weight instantly!	50	Clickbait
12	Climate change is accelerating faster than expected	10	Legitimate
14	THE GOVERNMENT IS WATCHING YOU!	95	Conspiracy
15	5G is dangerous!!!	90	Conspiracy
16	Stock Market Sees Biggest Drop in 10 Years	20	Legitimate
18	President denies all allegations in press conference	15	Legitimate
19	Can drinking lemon water cure cancer? Experts weigh in	60	Clickbait
20	Doctors warn against the latest TikTok health craze	10	Legitimate
21	BREAKING: New world order forming, experts claim!	95	Conspiracy
22	Study: People who wake up early are more successful	10	Legitimate
23	Secret societies control the world economy	90	Conspiracy
24	Do vaccines REALLY work? A shocking revelation!	70	Clickbait
25	Is sugar more addictive than cocaine? Scientists debate	60	Clickbait
26	Tech giant CEO found dead under mysterious circumstances	20	Legitimate
27	Government to announce strict new surveillance policies	15	Legitimate
28	Exclusive: Inside the top-secret military base that doesn’t exist	95	Conspiracy
29	We tried this viral TikTok trend—here’s what happened!	50	Clickbait
30	Scientists discover bacteria that can digest plastic	10	Legitimate
31	Aliens spotted in Area 51? Here’s what we know!	85	Conspiracy
32	You’re eating THIS toxic ingredient every day!	60	Clickbait
33	Astronomers detect radio signals from deep space	10	Legitimate
34	Governments are hiding the truth about the moon landing!	95	Conspiracy
35	Simple tricks to get rich overnight!	70	Clickbait
36	Shocking new health benefits of eating chocolate	20	Legitimate
37	The real reason billionaires don’t pay taxes	90	Conspiracy
38	Researchers develop new AI that can detect cancer early	10	Legitimate
39	EXPOSED: What doctors aren’t telling you about prescription drugs!	95	Conspiracy
40	Can meditation make you smarter? Here’s what science says	10	Legitimate
41	Is social media making you depressed? Experts say yes	15	Legitimate
42	Scientists warn about hidden dangers of climate change	10	Legitimate
43	You won’t believe what this celebrity did on live TV!	70	Clickbait
44	BREAKING: New technology could make humans live forever	60	Clickbait
45	Doctors discover shocking link between diet and mental health	20	Legitimate
46	New world order? Leaked documents reveal hidden agenda	95	Conspiracy
47	The one exercise that burns belly fat instantly!	70	Clickbait
48	Government funding new AI research for national security	15	Legitimate
49	How a 12-year-old made millions with cryptocurrency	60	Clickbait
50	BREAKING: AI robot gains consciousness?	95	Conspiracy
51	Experts warn about the hidden dangers of processed foods	10	Legitimate
52	Elon Musk reveals shocking plans for Mars colonization	20	Legitimate
53	Billionaire donates entire fortune to climate change research	10	Legitimate
54	The shocking truth about fast food you need to know!	60	Clickbait
55	Scientists develop self-healing materials for construction	10	Legitimate
2	NASA confirms water on Mars	10	Legitimate
17	Massive UFO sighting reported over New York	85	Conspiracy
98	Donald Trump Sends Out Embarrassing New Year’s Eve Message; This is Disturbing	10	Legitimate
\.


--
-- Name: headlines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.headlines_id_seq', 98, true);


--
-- Name: headlines headlines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.headlines
    ADD CONSTRAINT headlines_pkey PRIMARY KEY (id);


--
-- Name: headlines unique_headline; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.headlines
    ADD CONSTRAINT unique_headline UNIQUE (headline);


--
-- PostgreSQL database dump complete
--

