-- create table resultados_partidas (
--     qtd_pontos_visitante integer,
--     qtd_pontos_mandante integer,
--     qtd_felinos_mandante integer,
--     qtd_felinos_visitante integer,
--     id_partida integer primary key
-- )

create table if not exists resultados_partidas (
    qtd_pontos_visitante integer,
    qtd_pontos_mandante integer,
    qtd_felinos_mandante integer,
    qtd_felinos_visitante integer,
    id_partida integer primary key,
    qtd_penalidades_mandante integer,
    qtd_penalidades_visitante integer,
    juiz varchar(300)
)