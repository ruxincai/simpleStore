CREATE TABLE product (
  id   SERIAL NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  imagePath TEXT,

  PRIMARY KEY (id)
);