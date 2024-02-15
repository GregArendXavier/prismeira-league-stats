import { ReactNode, useState } from 'react';
import { iPartidas } from '../configs/interfaces';
import api from '../services/api';
import { IconMenu, IconeLapis, IconeLixo } from '../components/icons';
import Link from 'next/link';
import style from '../styles/App.module.css'

export async function getServerSideProps() {
    const request: Promise<iPartidas[]> = api.get('/partidas').then(value => value.data)
    const data = await request
    return {
      props: {
        data
      }
    }
  }

interface iProps {
    children?: ReactNode;
    data: iPartidas[];
}

export default function Partidas(props: iProps) {

    const [menu, setMenu] = useState<boolean>(false)

    const bgColor1 = 'bg-violet-900'

    const bgColor2 = 'bg-violet-950'


    function renderTable() {

        let rows: iPartidas[] = props.data

        if (rows.length >= 1) {
            return rows.map((row, i) => (
                <tr key={row.id_partida} className={`${i % 2 === 0 ? bgColor2 : bgColor1}`} >
                    <td className='text-center py-2 px-4'>{row.id_partida}</td>
                    <td className='text-center py-2 px-4'>{row.qtd_pontos_mandante}</td>
                    <td className='text-center py-2 px-4'>{row.qtd_pontos_visitante}</td>
                    <td className='text-center py-2 px-4'>{row.qtd_felinos_mandante}</td>
                    <td className='text-center py-2 px-4'>{row.qtd_felinos_visitante}</td>
                    <td className='text-center py-2 px-4'>{row.qtd_penalidades_mandante}</td>
                    <td className='text-center py-2 px-4'>{row.qtd_penalidades_visitante}</td>
                    <td className='text-center py-2 px-4'>{row.juiz.charAt(0).toUpperCase() + row.juiz.slice(1)}</td>
                    {/* <td className='flex flex-col justify-center items-center py-2 px-8'>
                        <button className='flex' value={row.id_partida} onClick={e => console.log('Editar')}>
                            <span className='mr-2'>Editar</span>
                            <span>{IconeLapis}</span>
                        </button>
                        <button className='flex' value={row.id_partida} onClick={e => console.log('Excluir')}>
                            <span className='mr-2'>Excluir</span>
                            <span>{IconeLixo}</span>
                        </button>
                    </td> */}
                </tr>
            ))
        }
        if (rows.length === 0) {
            return (
                <tr key={'00'}>
                    <td>
                        No data
                    </td>
                </tr>
            )
        }
    }

    return (
        <div className="cel:block dkp:flex justify-center items-center">
            <div className={`absolute top-0 right-0 flex justify-center items-start ${style.table}`}>
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
            <table className={`cel:my-10 cel:mx-0 rounded-xl overflow-hidden dkp:m-10`}>
                <thead>
                    <tr key={'01'} className={bgColor1}>
                        <th className='p-2'>Id Partida</th>
                        <th className='p-2'>Qtd Pontos Mandante</th>
                        <th className='p-2'>Qtd Pontos Visitante</th>
                        <th className='p-2'>Qtd Felinos Mandante</th>
                        <th className='p-2'>Qtd Felinos Visitante</th>
                        <th className='p-2'>Qtd Penalidades Mandante</th>
                        <th className='p-2'>Qtd Penalidades Visitante</th>
                        <th className='p-2'>Juiz</th>
                        {/* <th className='p-2'>Ações</th> */}
                    </tr>
                </thead>
                <tbody>
                    {renderTable()}
                </tbody>
            </table>
        </div>
    )
}