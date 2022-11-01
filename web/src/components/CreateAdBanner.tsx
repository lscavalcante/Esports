import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
    return (
        <div className='pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden'>

            <div className='bg-[#2A3634] px-8 py-8 flex fle-row flex-wrap justify-between items-center'>
                <div >
                    <strong className='text-2xl text-white font-black block'>Não encontrou o seu duo?</strong>
                    <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
                </div>
                <Dialog.Trigger className='py-3 px-4 bg-violet-500 text-white rounded transition delay-50 hover:bg-violet-700 flex flex-row justify-center items-center gap-3 mt-4 flex-grow sm:flex-grow-0 sm:mt-0'>
                    <MagnifyingGlassPlus size={24} />
                    Publica anúncio
                </Dialog.Trigger>
            </div>

        </div>
    );
}