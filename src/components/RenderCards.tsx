import React from 'react'
import Card from './Card'

type Props = { data:ResBody[] , title:string}

function RenderCards({data, title}: Props) {
    if (data?.length > 0) {
        return <>
         {data?.map((post, index) => {
            return (
                <Card key={post._id} {...post} index={index} />
            )
        })}
        </> 
    }
    return (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
    )
}

export default RenderCards