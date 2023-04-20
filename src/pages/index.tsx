import React, { useState, useEffect } from 'react'
import FormField from '../components/FormField'
import Loader from '../components/Loader'
import useSWR from 'swr';
import { GetStaticProps} from 'next'
import RenderCards from '@/components/RenderCards'
import { fetcher } from '../../utils';
import { allowedNodeEnvironmentFlags } from 'process';


type Props = {
  allPosts: ResBody[]
}
const Home = ({allPosts}:Props) => {

    const [searchedText, setSearchedText] = useState('')
    const [searchedResults, setSearchedResults] = useState<ResBody[]>([])
    const [isSupriseMe, setIsSuprisMe] = useState<boolean>(false)
    const { data,error,isLoading } = useSWR<ResBody[]>('images', fetcher);

        
    const handleSearch = ( e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedText(e.target.value)
        const searchResults = data?.filter(post => {
            return post.name.toLowerCase().includes(searchedText.toLowerCase())
                || post.prompt.toLowerCase().includes(searchedText.toLowerCase())
        })
        return  searchResults && setSearchedResults(searchResults)
    }


    return (
        <section className="max-w-7xl mx-auto">
            <article>
                <h1 className="font-extrabold text-[#222328] text-[32px] ">
                    The Community Showcase
                </h1>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[5000px]  ">
                    Browse through a collection of imaginative and visually stunning images generated by DAL-E AI
                </p>
            </article>
            <article className="mt-16">
                <FormField
                    labelName='Search posts'
                    type='text'
                    name='text'
                    placeholder='Search for any image'
                    value={searchedText}
                    handleChange={handleSearch}
                    IsSupriseMe={isSupriseMe}
                />
            </article>
            <article className="mt-10">
                { isLoading ?
                    (<article className="flex justify-center items-end h-[25vh]">
                        <Loader />
                    </article>)
                    :
                    (<>
                        {searchedText &&
                            (<h2 className="font-medium text-[#666e75] text-xl mb-3  ">
                                Showing Results for <span className="text-[#222328]">{searchedText}</span>
                            </h2>
                            )}
                        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-1 ">
                            {searchedText  ? (
                                <RenderCards data={searchedResults} title="No Searches found" />
                            ) :
                                (
                                    data && <RenderCards data={data} title="No Posts found " />
                                )
                            }
                        </div>
                    </>)
                }
            </article>


        </section>
    )
}

export default Home

export const getStaticProps: GetStaticProps<Props> = async () => {

 const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getPosts`)
 const result = await data.json()
 const allPosts:ResBody[] = result.data.reverse()
  return {
    props: { allPosts },
  }
}
