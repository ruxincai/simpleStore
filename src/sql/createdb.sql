CREATE SEQUENCE public.product_id_seq
INCREMENT 1
MINVALUE 1
MAXVALUE 9223372036854775807
START 2
CACHE 1;
ALTER TABLE public.product_id_seq
OWNER TO postgres;

CREATE SEQUENCE public.transaction_id_seq
INCREMENT 1
MINVALUE 1
MAXVALUE 9223372036854775807
START 5
CACHE 1;
ALTER TABLE public.transaction_id_seq
OWNER TO postgres;

CREATE TABLE public.product (
  id integer NOT NULL DEFAULT nextval('product_id_seq'::regclass),
  code text NOT NULL,
  name text NOT NULL,
  description text,
  price double precision,
  imagepath text,
  CONSTRAINT product_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

CREATE TABLE public.transaction
(
  id integer NOT NULL DEFAULT nextval('transaction_id_seq'::regclass),
  detail json NOT NULL,
  confirm_time timestamp without time zone NOT NULL,
  CONSTRAINT transaction_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);