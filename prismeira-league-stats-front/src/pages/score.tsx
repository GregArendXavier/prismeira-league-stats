import { useState } from 'react';
import styles from '../styles/App.module.css'
import api from '../services/api';
import Router from 'next/router';
import { IconSalvar } from '../components/icons';

export default function Score() {

  const [idPartida, setIdPartida] = useState<number>(0)
  const [felinosVisitante, setFelinosVisitante] = useState<number>(0)
  const [pontosVisitante, setPontosVisitante] = useState<number>(0)
  const [felinosMandante, setFelinosMandante] = useState<number>(0)
  const [pontosMandante, setPontosMandante] = useState<number>(0)
  const [penalidadesVisitante, setPenalidadesVisitante] = useState<number>(0)
  const [penalidadesMandante, setPenalidadesMandante] = useState<number>(0)
  const [juiz, setJuiz] = useState<string>("")

  function handleClickVisitante (e: React.MouseEvent<HTMLButtonElement>, origem: string): void {
    e.preventDefault()
    if(e.shiftKey) {
      if (origem === 'FelinosVisitante') {
        if (felinosVisitante > 0) {
          setFelinosVisitante(felinosVisitante - 1)
        }
      } else if(origem === 'PontosVisitante') { 
          if(pontosVisitante > 0) {
            setPontosVisitante(pontosVisitante - 1)
          }
      } else if (origem === 'PenalidadesVisitante') {
        if (penalidadesVisitante > 0) {
          setPenalidadesVisitante(penalidadesVisitante - 1)
        }
      }
    } else {
      if (origem === 'FelinosVisitante') {
        if(felinosVisitante < 8) {
          setFelinosVisitante(felinosVisitante + 1)
        }
      } else if(origem === 'PontosVisitante') {
        if(pontosVisitante < 8) {
          setPontosVisitante(pontosVisitante + 1)
        }
      } else if (origem === 'PenalidadesVisitante') {
        if(penalidadesVisitante < 8) {
          setPenalidadesVisitante(penalidadesVisitante + 1)
        }
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
      } else if(origem === 'PontosMandante') {
          if (pontosMandante > 0) {
            setPontosMandante(pontosMandante - 1)
          }
      } else if (origem === 'PenalidadesMandante') {
          if(penalidadesMandante > 0) {
            setPenalidadesMandante(penalidadesMandante - 1)
          }
      }
    } else {
      if (origem === 'FelinosMandante') {
        if (felinosMandante < 8) {
          setFelinosMandante(felinosMandante + 1)
        }
      } else if (origem === 'PontosMandante') {
          if (pontosMandante < 8) {
            setPontosMandante(pontosMandante + 1)
          }
      } else if (origem === 'PenalidadesMandante') {
        if (penalidadesMandante < 8) {
          setPenalidadesMandante(penalidadesMandante + 1)
        }
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
        felinosVisitante,
        penalidadesMandante,
        penalidadesVisitante,
        juiz
      })
      .then(value => Router.reload())
    }
  }

  return (
    <div className={`flex flex-col justify-center items-strech`}>
      <div className={`${styles.formNumber} my-8 flex justify-evenly items-baseline`}>
        <div className='flex'>
          <span className='text-2xl mr-2'>Partida:</span>
          <input type="number" value={idPartida == 0 || Number.isNaN(idPartida) ? '' : idPartida } onChange={e => setIdPartida(parseInt(e.target.value))} name="Id Partida" id="1" placeholder="Id Partida" className={`bg-transparent w-32 rounded-md text-2xl`}/>
        </div>
        <div>
          <span className="text-2xl mr-2">
            Juiz:
          </span>
          <select onChange={e => setJuiz(e.currentTarget.value)} className={`${styles.formSelect} bg-transparent rounded-md text-xl w-32 outline-none`} name='juiz'>
            <option value=""></option>
            <option value="luis">Luis</option>
            <option value="douglas">Douglas</option>
            <option value="gustavo">Gustavo</option>
            <option value="joao">João</option>
            <option value="leonardo">Leonardo</option>
            <option value="erick">Erick</option>
            <option value="Vagner">Vagner</option>
            <option value="Sandro">Sandro</option>
            <option value="iuri">Iuri</option>
            <option value="gregori">Grégori</option>
          </select>
        </div>
        <button className={"rounded-full border-white border-2 py-2 px-6 hover:bg-gray-700"} onClick={e => handleSave()}>
          <div className="flex justify-center items-baseline">
            {IconSalvar}
            <span className="text-2xl mx-2">
              Salvar
            </span>
          </div>
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
          <button className={"rounded-full border-white border-2 py-2 px-4 outline-none"}
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
          <button className={"rounded-full border-white border-2 py-2 px-4 outline-none"}
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
          <button className={"rounded-full border-white border-2 py-2 px-4 outline-none"}
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
          <button className={"rounded-full border-white border-2 py-2 px-4 outline-none"}
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
      <span className='text-5xl text-center border-y-2 p-2'>
        Penalidades
      </span>
      <div className="flex justify-around my-4">
        <div className="flex flex-col justify-center items-center">
          <span className='my-4 text-5xl font-light'>
            {penalidadesMandante}
          </span>
          <button className={"rounded-full border-white border-2 py-2 px-4 outline-none"}
            onClick={e => handleClickMandante(e, "PenalidadesMandante")}
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
            {penalidadesVisitante}
          </span>
          <button className={"rounded-full border-white border-2 py-2 px-4 outline-none"}
            onClick={e => handleClickVisitante(e, "PenalidadesVisitante")}
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
