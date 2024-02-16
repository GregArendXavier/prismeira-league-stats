import { useState, useEffect } from 'react';
import styles from '../styles/App.module.css'
import api from '../services/api';
import Router from 'next/router';
import Lottie from 'react-lottie';
import congrats from '../components/congrats.json'
import { IconMenu } from '../components/icons';
import Link from 'next/link';

export default function Home() {

  const [segundos, setSegundos] = useState<number>(1)
  const [minutos, setMinutos] = useState<number>(0)
  const [horas, setHoras] = useState<number>(0)
  const [dias, setDias] = useState<number>(0)
  const [partyState, setPartyState] = useState({
      isStopped: false, isPaused: false, direction: 1
  })
  const [menu, setMenu] = useState<boolean>(false)

  const dataTarget = new Date(2024, 2, 3, 11, 30).getTime()

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: congrats,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  function calculaCountdown() {
    let diasFaltantes = Math.floor((dataTarget -Date.now())  / 86400000)
    
    let horasFaltantes = Math.floor(((dataTarget -Date.now()) - (diasFaltantes * 86400000)) / 3600000)
  
    let minutosFaltantes = Math.floor(((dataTarget -Date.now()) - (diasFaltantes * 86400000 + horasFaltantes * 3600000)) / 60000)
    
    let segundosFaltantes = Math.floor(((dataTarget -Date.now()) - (diasFaltantes * 86400000 + horasFaltantes * 3600000 + minutosFaltantes * 60000)) / 1000)

    setDias(diasFaltantes)
    setHoras(horasFaltantes)
    setMinutos(minutosFaltantes)
    setSegundos(segundosFaltantes)
  }

  useEffect(() => {
    if (dataTarget - Date.now() > 0) {
      setInterval(() => calculaCountdown(), 1000)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <div className="absolute top-0 right-0 flex justify-center items-start">
        <button className={`hover:bg-gray-800 p-2 text-white`} onClick={e => setMenu(!menu)}>
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
      <div className="flex justify-center items-center grow">
        {dias === 0 && horas === 0 && minutos === 0 && segundos === 0 ? 
          <div style={{
                pointerEvents: 'none',
                position: "absolute",
                left: '0',
                top: '0',
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '10'
            }}>
                <Lottie 
                  options={defaultOptions}
                  height={700}
                  width={700}
                  direction={partyState.direction}
                  isStopped={partyState.isStopped}
                  isPaused={partyState.isPaused}
                />
          </div>
        : null}
        <span className='dkp:text-8xl text-white bg-gray-800 mx-4 dkp:py-8 dkp:px-10 rounded-lg border-2 border-white cel:p-3 cel:text-xl' style={{
          boxShadow: "15px 15px 15px #000",
          color: '#fff'
        }}>
          {dias < 10 ? `0${dias}` : dias}
        </span>
        <span className="dkp:text-8xl text-white dkp:mx-4 cel:text-xl cel:mx-0">:</span>
        <span className='dkp:text-8xl text-white bg-gray-800 mx-4 dkp:py-8 dkp:px-10 rounded-lg border-2 border-white cel:p-3 cel:text-xl' style={{
          boxShadow: "15px 15px 15px #000"
        }}>
        {horas < 10 ? `0${horas}` : horas}
        </span>
        <span className="dkp:text-8xl text-white dkp:mx-4 cel:text-xl cel:mx-0">:</span>
        <span className='dkp:text-8xl text-white bg-gray-800 mx-4 dkp:py-8 dkp:px-10 rounded-lg border-2 border-white cel:p-3 cel:text-xl' style={{
          boxShadow: "15px 15px 15px #000"
        }}>
          {minutos < 10 ? `0${minutos}` : minutos}
        </span>
        <span className="dkp:text-8xl text-white dkp:mx-4 cel:text-xl cel:mx-0">:</span>
        <span className='dkp:text-8xl text-white bg-gray-800 mx-4 dkp:py-8 dkp:px-10 rounded-lg border-2 border-white cel:p-3 cel:text-xl' style={{
          boxShadow: "15px 15px 15px #000"
        }}>
          {segundos < 10 ? `0${segundos}` : segundos}
        </span>
      </div>
    </div>
  );
}
