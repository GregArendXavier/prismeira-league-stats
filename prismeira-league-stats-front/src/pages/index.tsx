import { useState } from 'react';
import styles from '../styles/App.module.css'
import api from '../services/api';
import Router from 'next/router';

export default function Home() {

  const [idPartida, setIdPartida] = useState<number>(0)
  const [felinosVisitante, setFelinosVisitante] = useState<number>(0)
  const [pontosVisitante, setPontosVisitante] = useState<number>(0)
  const [felinosMandante, setFelinosMandante] = useState<number>(0)
  const [pontosMandante, setPontosMandante] = useState<number>(0)

  function handleClickVisitante (e: React.MouseEvent<HTMLButtonElement>, origem: string): void {
    e.preventDefault()
    if(e.shiftKey) {
      if (origem === 'FelinosVisitante') {
        if (felinosVisitante > 0) {
          setFelinosVisitante(felinosVisitante - 1)
        }
      } else if(pontosVisitante > 0) {
        setPontosVisitante(pontosVisitante - 1)
      }
    } else {
      if (origem === 'FelinosVisitante') {
        setFelinosVisitante(felinosVisitante + 1)
      } else {
        setPontosVisitante(pontosVisitante + 1)
      }
    }
  }

  function handleClickMandante (e: React.MouseEvent<HTMLButtonElement>, origem: string): void {
    e.preventDefault()
    if(e.shiftKey) {
      if (origem === 'FelinosMandante') {
        if (felinosMandante > 0) {
          setFelinosMandante(felinosMandante - 1)
        }
      } else if (pontosMandante > 0) {
        setPontosMandante(pontosMandante - 1)
      }
    } else {
      if (origem === 'FelinosMandante') {
        setFelinosMandante(felinosMandante + 1)
      } else {
        setPontosMandante(pontosMandante + 1)
      }
    }
  }

  function handleSave() {

    if(idPartida === 0) {
      alert('Valor inválido em Id Partida')
    } else {
      api.post('/upsert', {
        idPartida,
        pontosMandante,
        pontosVisitante,
        felinosMandante,
        felinosVisitante
      })
      .then(value => Router.reload())
    }
  }

  return (
    <div className="flex flex-col justify-center items-strech">
      <div className={`${styles.formNumber} my-8 flex justify-around items-baseline`}>
        <div>
          <span className='text-2xl'>Partida: </span>
          <input type="number" value={idPartida == 0 ? '' : idPartida } onChange={e => setIdPartida(parseInt(e.target.value))} name="Id Partida" id="1" placeholder="Id da Partida" className={`bg-transparent rounded-md mx-1 text-2xl`}/>
        </div>
        <button className={"rounded-full border-white border-2 py-2 px-6 hover:bg-gray-700"} onClick={e => handleSave()}>
          <span className="text-2xl">
            Salvar
          </span>
        </button>
      </div>
      <span className='text-5xl text-center border-y-2 p-2'>
        Placar
      </span>
      <div className="flex justify-around my-4">
        <div className="flex flex-col justify-center items-center">
          <span className='my-4 text-5xl font-light'>
            {pontosMandante}
          </span>
          <button className={"rounded-full border-white border-2 py-2 px-4"}
            onClick={e => handleClickMandante(e, "PontosMandante")}
            style={{
              height: '7rem',
              width: '7rem'
            }}
          >
            <span>
              Mandante
            </span>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className='my-4 text-5xl font-light'>
            {pontosVisitante}
          </span>
          <button className={"rounded-full border-white border-2 py-2 px-4"}
            onClick={e => handleClickVisitante(e, "PontosVisitante")}
            style={{
              height: '7rem',
              width: '7rem'
            }}
            >
            <span>
              Visitante
            </span>
          </button>
        </div>
      </div>
      <span className='text-5xl text-center border-y-2 p-2'>
        Felinos
      </span>
      <div className="flex justify-around my-4">
        <div className="flex flex-col justify-center items-center">
          <span className='my-4 text-5xl font-light'>
            {felinosMandante}
          </span>
          <button className={"rounded-full border-white border-2 py-2 px-4"}
            onClick={e => handleClickMandante(e, "FelinosMandante")}
            style={{
              height: '7rem',
              width: '7rem'
            }}
          >
            <span>
              Mandante
            </span>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className='my-4 text-5xl font-light'>
            {felinosVisitante}
          </span>
          <button className={"rounded-full border-white border-2 py-2 px-4"}
          onClick={e => handleClickVisitante(e, "FelinosVisitante")}
            style={{
              height: '7rem',
              width: '7rem'
            }}
          >
            <span>
              Visitante
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
