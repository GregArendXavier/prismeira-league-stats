import { iPartidas } from "../../configs/interfaces";
import { ReactNode, useEffect, useState } from "react";
import api from "../../services/api";
import { IconMenu, IconSalvar } from "../../components/icons";
import Router from "next/router";
import styles from '../../styles/App.module.css'
import Link from "next/link";

export async function getServerSideProps(params: any) {

    const request: Promise<iPartidas[]> = api.get(`/partida/${params.query.id}`)
        .then(value => value.data)
        .catch(err => console.log('erro', err))
    const data = await request
    return {
      props: {
        data
      },
    }
  }

interface iProps {
    children?: ReactNode;
    data: iPartidas[];
}

export default function Partida(props: iProps) {

    const [idPartida, setIdPartida] = useState<number>(0)
    const [felinosVisitante, setFelinosVisitante] = useState<number>(0)
    const [pontosVisitante, setPontosVisitante] = useState<number>(0)
    const [felinosMandante, setFelinosMandante] = useState<number>(0)
    const [pontosMandante, setPontosMandante] = useState<number>(0)
    const [penalidadesVisitante, setPenalidadesVisitante] = useState<number>(0)
    const [penalidadesMandante, setPenalidadesMandante] = useState<number>(0)
    const [menu, setMenu] = useState<boolean>(false)
    const [diminuir, setDiminuir] = useState<boolean>(false)
    const [juiz, setJuiz] = useState<string>("")
    const [vencedor, setVencedor] = useState<string>("")

    const data = props.data[0]

    useEffect(() => {
        if (data) {
            setIdPartida(data.id_partida)
            setFelinosMandante(data.qtd_felinos_mandante)
            setFelinosVisitante(data.qtd_felinos_visitante)
            setPontosMandante(data.qtd_pontos_mandante)
            setPontosVisitante(data.qtd_pontos_visitante)
            setPenalidadesMandante(data.qtd_penalidades_mandante)
            setPenalidadesVisitante(data.qtd_penalidades_visitante)
            setJuiz(data.juiz)
            setVencedor(data.vencedor)
        }
    }, [])


  function handleClickVisitante (e: React.MouseEvent<HTMLButtonElement>, origem: string): void {
    e.preventDefault()
    if(e.shiftKey || diminuir) {
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
          setFelinosVisitante(felinosVisitante + 1)
      } else if(origem === 'PontosVisitante') {
          setPontosVisitante(pontosVisitante + 1)
      } else if (origem === 'PenalidadesVisitante') {
          setPenalidadesVisitante(penalidadesVisitante + 1)
      }
    }
  }

  function handleClickMandante (e: React.MouseEvent<HTMLButtonElement>, origem: string): void {
    e.preventDefault()
    if(e.shiftKey || diminuir) {
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
          setFelinosMandante(felinosMandante + 1)
      } else if (origem === 'PontosMandante') {
            setPontosMandante(pontosMandante + 1)
      } else if (origem === 'PenalidadesMandante') {
          setPenalidadesMandante(penalidadesMandante + 1)
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
        juiz,
        vencedor
      })
      .then(value => Router.reload())
    }
  }

  return (
    <div className={`flex flex-col justify-center items-strech`}>
      <div className={`flex cel:flex-col cel:my-2 cel:mx-2 ${styles.formNumber} dkp:my-8 dkp:flex-row dkp:justify-evenly dkp:items-baseline`}>
        <div className='flex cel:my-2'>
          <span className='cel:text-xl dkp:text-2xl mr-2'>Partida:</span>
          <input type="number" value={idPartida == 0 || Number.isNaN(idPartida) ? '' : idPartida } onChange={e => setIdPartida(parseInt(e.target.value))} name="Id Partida" id="1" placeholder="Id Partida" className={`bg-transparent w-32 rounded-md cel:text-xl dkp:text-2xl`}/>
        </div>
        <div className='cel:mb-2'>
          <span className="cel:text-xl dkp:text-2xl mr-2">
            Juiz:
          </span>
          <select onChange={e => setJuiz(e.currentTarget.value)} className={`bg-slate-800 rounded-md text-xl w-32 outline-none`} name='juiz'>
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
        <div className='cel:mb-2'>
          <span className="cel:text-xl dkp:text-2xl mr-2">
            Vencedor:
          </span>
          <select onChange={e => setVencedor(e.currentTarget.value)} className={`bg-slate-800 rounded-md text-xl w-32 outline-none`} name='vencedor'>
            <option value=""></option>
            <option value="6">Luis</option>
            <option value="1">Douglas</option>
            <option value="8">Gustavo</option>
            <option value="2">João</option>
            <option value="3">Leonardo</option>
            <option value="7">Erick</option>
            <option value="9">Vagner</option>
            <option value="10">Sandro</option>
            <option value="4">Iuri</option>
            <option value="5">Grégori</option>
          </select>
        </div>
        <button className={"text-center rounded-full dkp:py-2 dkp:px-2 hover:bg-gray-700 my-2"} onClick={e => handleSave()}>
          <div className="flex justify-start items-center">
            {IconSalvar}
            {/* <span className="cel:text-xl dkp:text-2xl mx-2">
              Salvar
            </span> */}
          </div>
        </button>
        <div className="absolute top-0 right-0 flex justify-center items-start">
          <button className={`hover:bg-gray-800 p-2`} onClick={e => setMenu(!menu)}>
            {IconMenu}
          </button>
          {menu ?
            <ul className='flex flex-col p-3 items-stretch rounded-l-2xl bg-gray-800'>
              <Link href={'/'} passHref>
                  <li className='flex flex-col p-3 items-center rounded-md hover:bg-gray-900/25'>
                      Home
                  </li>
              </Link>
              <Link href={'/placar'} passHref>
                  <li className='flex flex-col p-3 items-center rounded-md hover:bg-gray-900/25'>
                      Placar
                  </li>
              </Link>
              <Link href={'/partidas'} passHref>
                  <li className='flex flex-col p-3 items-center rounded-md hover:bg-gray-900/25'>
                      Partidas
                  </li>
              </Link>
            </ul>
          : null}
        </div>
        <div className="dkp:hidden cel:my-2">
          <div className="relative inline-block w-20 mr-2 align-middle select-none transition duration-200 ease-in">
            <button
              onClick={() => setDiminuir(!diminuir)}
            >
              <span className={`toggle-span block overflow-hidden h-6 w-10 rounded-full ${diminuir ? 'bg-slate-800' : 'bg-slate-400'} cursor-pointer`}></span>
              <span className={`absolute top-0 left-0 h-5 w-5 rounded-full shadow-inner transform transition ease-in-out duration-200 ${diminuir ? 'translate-x-full bg-white' : 'translate-x-0 bg-slate-800'}`}></span>
            </button>
          </div>
        </div>
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