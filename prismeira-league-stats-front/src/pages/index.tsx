import { useState, useEffect } from 'react';
import styles from '../styles/App.module.css'
import api from '../services/api';
import Router from 'next/router';

export default function Home() {

  const [segundos, setSegundos] = useState<number>(0)
  const [minutos, setMinutos] = useState<number>(0)
  const [horas, setHoras] = useState<number>(0)
  const [dias, setDias] = useState<number>(0)

  let dataTarget =  new Date(2024, 2, 3, 12).getTime()

  function calculaCountdown() {
    let diasFaltantes = Math.floor((dataTarget -Date.now())  / 86400000)
    
    let horasFaltantes = Math.floor(((dataTarget -Date.now()) - (diasFaltantes * 86400000)) / 3600000)
  
    let minutosFaltantes = Math.floor(((dataTarget -Date.now()) - (diasFaltantes * 86400000 + horasFaltantes * 3600000)) / 60000)
    
    let segundosFaltantes = Math.floor(((dataTarget -Date.now()) - (diasFaltantes * 86400000 + horasFaltantes * 3600000 + minutosFaltantes * 60000)) / 1000)
    
    // return {
    //   diasFaltantes, horasFaltantes, minutosFaltantes, segundosFaltantes
    // }

    setDias(diasFaltantes)
    setHoras(horasFaltantes)
    setMinutos(minutosFaltantes)
    setSegundos(segundosFaltantes)
  }

  // let teste = renderCountdown(new Date(2024, 2, 3, 12).getTime() - hoje)
  
  useEffect(() => {
    setInterval(() => calculaCountdown(), 1000)
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <span className='text-8xl bg-gray-800 mx-4 py-8 px-10 rounded-lg border-2 border-white' style={{
        boxShadow: "15px 15px 15px #000"
      }}>
        {/* shadow-2xl */}
        {dias}
      </span>
      <span className="text-8xl mx-4">:</span>
      <span className='text-8xl bg-gray-800 mx-4 py-8 px-10 rounded-lg border-2 border-white' style={{
        boxShadow: "15px 15px 15px #000"
      }}>
        {horas}
      </span>
      <span className="text-8xl mx-4">:</span>
      <span className='text-8xl bg-gray-800 mx-4 py-8 px-10 rounded-lg border-2 border-white' style={{
        boxShadow: "15px 15px 15px #000"
      }}>
        {minutos}
      </span>
      <span className="text-8xl mx-4">:</span>
      <span className='text-8xl bg-gray-800 mx-4 py-8 px-10 rounded-lg border-2 border-white' style={{
        boxShadow: "15px 15px 15px #000"
      }}>
        {segundos < 10 ? `0${segundos}` : segundos}
      </span>
    </div>
  );
}
