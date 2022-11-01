import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import { Input } from './Form/input';
import { Game } from '../models/game';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { Ad } from '../models/ad';
import { ServerError } from '../models/error';


interface CreateAdModalProps {
    games: Game[]
}

export function CreateAdModal(props: CreateAdModalProps) {
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data: any = Object.fromEntries(formData);

        const body: Ad = {
            // ...data,
            name: data.name,
            discord: data.discord,
            yearsPlaying: Number(data.yearsPlaying),
            useVoiceChannel: useVoiceChannel,
            weekDays: weekDays.map(Number),
            hourEnd: data.hourEnd,
            hourStart: data.hourStart,
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads/`, body);
            alert('Ad cadastrado com sucesso!!!')
        } catch (error: any) {
            const err: ServerError = { ...error.response.data }
            let msgOfError = '';

            for (var val of err.errors) {
                msgOfError += `Field: ${val.path.join(', ')}\nMessage: ${val.message}\n\n`
            }
            alert(`${msgOfError}`)
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'>

                <Dialog.Content className='bg-[#2A2634] py-8 px-6 text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-full shadow-black/25 sm:w-[590px]'>
                    <Dialog.Title className='text-2xl text-white font-black'>Publique um anuncio</Dialog.Title>
                    <form onSubmit={handleCreateAd} action="" className="mt-8 grid grid-cols-6 gap-3">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                                <select
                                    required
                                    className='bg-zinc-900 py-3 px-4 rounded text-sm  placeholder:text-zinc-500 outline-none border-2 border-transparent transition duration-500 ease-out focus:border-violet-500 focus:scale-105 appearance-none'
                                    defaultValue=''
                                    id='game'
                                    name='game'
                                >
                                    <option disabled value=''>Selecione o game que deseja jogar</option>
                                    {props.games.map(game => {
                                        return (
                                            <option key={game.id} value={game.id}>{game.title}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>


                        <div className="col-span-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="game">Seu nome?</label>
                                <Input required id="name" name='name' placeholder="Como te chamam dentro do game?" />
                            </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="yearsPlaying">Joga há quantos anos ?</label>
                                <Input required id="yearsPlaying" name='yearsPlaying' type="number" placeholder="Tudo bem ser 0" />
                            </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="game">Qual seu Discord ?</label>
                                <Input required id="discord" name='discord' placeholder="Usuario#0000" />
                            </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="weekDays">Quando costuma jogar?</label>

                                <ToggleGroup.Root
                                    className='grid grid-cols-7 gap-2 sm:grid-cols-4'
                                    type='multiple'
                                    value={weekDays}
                                    onValueChange={setWeekDays}
                                >
                                    <ToggleGroup.ToggleGroupItem
                                        value="0"
                                        className={`w-8 h-8 rounded bg-zinc-900" title="Domingo ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>D
                                    </ToggleGroup.ToggleGroupItem>
                                    <ToggleGroup.ToggleGroupItem
                                        value="1"
                                        className={`w-8 h-8 rounded bg-zinc-900" title="Segunda ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S
                                    </ToggleGroup.ToggleGroupItem>
                                    <ToggleGroup.ToggleGroupItem
                                        value="2"
                                        className={`w-8 h-8 rounded bg-zinc-900" title="Terça ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>T
                                    </ToggleGroup.ToggleGroupItem>
                                    <ToggleGroup.ToggleGroupItem
                                        value="3"
                                        className={`w-8 h-8 rounded bg-zinc-900" title="Quarta ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q
                                    </ToggleGroup.ToggleGroupItem>
                                    <ToggleGroup.ToggleGroupItem
                                        value="4"
                                        className={`w-8 h-8 rounded bg-zinc-900" title="Quinta ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q
                                    </ToggleGroup.ToggleGroupItem>
                                    <ToggleGroup.ToggleGroupItem
                                        value="5"
                                        className={`w-8 h-8 rounded bg-zinc-900" title="Sexta ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S
                                    </ToggleGroup.ToggleGroupItem>
                                    <ToggleGroup.ToggleGroupItem
                                        value="6"
                                        className={`w-8 h-8 rounded bg-zinc-900" title="Sabado ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S
                                    </ToggleGroup.ToggleGroupItem>
                                </ToggleGroup.Root>

                            </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="hourStart">Qual horário do dia?</label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <Input id="hourStart" name='hourStart' type="time" placeholder="De" />
                                    <Input id="hourEnd" name='hourEnd' type="time" placeholder="Até" />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-6">
                            <label className="mt-2 flex text-sm items-center justify-start gap-2">
                                <Checkbox.Root
                                    checked={useVoiceChannel}
                                    onCheckedChange={(checked) => {
                                        if (checked === true) {
                                            setUseVoiceChannel(true)
                                        } else {
                                            setUseVoiceChannel(false)
                                        }
                                    }}
                                    className='flex justify-center items-center w-6 h-6 rounded bg-zinc-900'
                                >
                                    <Checkbox.Indicator>
                                        <Check className='w-4 h-4 text-emerald-400' />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                                Constumo me conectar ao chat de voz
                            </label>
                        </div>

                        <div className="col-span-6">
                            <footer className="mt-4 flex justify-end gap-4">
                                <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                                <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" type="submit" >
                                    <GameController className="w-6 h-6" />
                                    Encontrar duo
                                </button>
                            </footer>
                        </div>


                    </form>


                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    );
}