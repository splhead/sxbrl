CREATE TABLE IF NOT EXISTS dados.msc (
	conta varchar(15) NOT NULL,
	ic1 VARCHAR(10) NULL,
	tipo1 varchar(2) NULL,
	ic2 VARCHAR(10) NULL,
	tipo2 varchar(2) NULL,
	ic3 VARCHAR(10) NULL,
	tipo3 varchar(2) NULL,
	ic4 VARCHAR(10) NULL,
	tipo4 varchar(2) NULL,
	ic5 VARCHAR(10) NULL,
	tipo5 varchar(2) NULL,
	ic6 VARCHAR(10) NULL,
	tipo6 varchar(2) NULL,
	valor REAL NULL,
	tipo_valor char NULL,
	natureza_valor varchar(50) NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;