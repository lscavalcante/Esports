import { InputHTMLAttributes } from 'react'

// util for copu all elements atributes;
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export function Input(props: InputProps) {
    return (
        <input
            {...props}
            className={`
                w-full
                bg-zinc-900 py-3 px-4 rounded text-sm 
                placeholder:text-zinc-500
                outline-none 
                border-2 border-transparent
                transition duration-500 ease-out
                focus:border-violet-500
                focus:scale-105
            `
            }
        />
    )
}