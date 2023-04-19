import React from 'react'

type Props = {
    labelName:string , type:string , name:string , value:string , placeholder:string , handleChange?:(e: React.ChangeEvent<HTMLInputElement>)=>void, IsSupriseMe?:boolean, handleSupriseMe?:()=>void
}

const FormField = ({
    labelName, type, name, value, placeholder, handleChange, IsSupriseMe, handleSupriseMe
  }: Props) => {
  return (
    <section>
      <article className="flex items-center gap-2 mb-2">
        <label
          className='block text-sm font-medium text-gray-900'
          htmlFor={name}>
          {labelName}
        </label>
        {IsSupriseMe && (
          <button
            className="text-black font-semibold text-xs py-1 px-2 rounded-[5px] bg-[#6469ff]/70 ml-5"
            type='button'
            onClick={handleSupriseMe}
          >
            Suprise Me
          </button>
        )}

      </article>
      <input
        className=' border bg-black/20 placeholder-black/50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] w-full p-3 outline-none block'
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
      />
    </section>
  )
}

export default FormField