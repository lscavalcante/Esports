import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/input';
import { CreateAdModal } from './components/CreateAdModal';
import { Game } from './models/game';
import axios from 'axios';


function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response =>  setGames(response.data))
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img className='w-64 h-32' src={logoImg} alt="Logo eSports" />

      <h1 className="text-6xl text-white text-center font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal games={games} />
      </Dialog.Root>

      <div className='mt-2 w-full rounded shadow-2xl bg-[#2A2634]'>
      <h1 className='text-white font-bold text-center text-4xl'>Aqui é um GRID com 6 colunas </h1>
        <div className='grid grid-cols-6 gap-6 m-2'>
          <div className="col-span-6 sm:col-span-3">
            <Input id="name" placeholder="Grid 3" />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input id="name" placeholder="Grid 3" />
          </div>

          <div className="col-span-6 sm:col-span-1">
            <Input id="name" placeholder="Grid 1" />
          </div>
          <div className="col-span-6 sm:col-span-1">
            <Input id="name" placeholder="Grid 1" />
          </div>
          <div className="col-span-6 sm:col-span-1">
            <Input id="name" placeholder="Grid 1" />
          </div>
          <div className="col-span-6 sm:col-span-1">
            <Input id="name" placeholder="Grid 1" />
          </div>
          <div className="col-span-6 sm:col-span-1">
            <Input id="name" placeholder="Grid 1" />
          </div>
          <div className="col-span-6 sm:col-span-1">
            <Input id="name" placeholder="Grid 1" />
          </div>

        </div>
      </div>


    </div>
  )
}

export default App