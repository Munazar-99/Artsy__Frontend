import React, { useState } from 'react'
import FormField from '../components/FormField'
import { getRandomPrompt } from '../utils'
import { preview } from '../../public/images'
import Loader from '../components/Loader'
import { useRouter } from 'next/router'
import Image from 'next/image'


const CreatePost = () => {
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: ''
    })
    const [generating, setGenerating] = useState(false)
    const [loading, setLoading] = useState(false)

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGenerating(true)
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt: form.prompt })
                })
                const data = await response.json()
                return setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
            } catch (error) {
                alert((error as Error).message)
            } finally {
                return setGenerating(false)
            }
        }
        alert('Please enter a prompt')
    }
    const handleSumbit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(form.prompt && form.name && !form.photo) {
            return await generateImage()
        }
        if (form.prompt && form.photo && form.name) {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sharePosts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                })
                await response.json()
                router.push('/')

            } catch (error) {
                alert((error as Error).message)
            } finally {
                setLoading(false)
            }
        } else {
            alert('Please fill all the fields')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSupriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({
            ...form, prompt: randomPrompt
        })
    }

    return (
        <section className="max-w-7xl mx-auto">
            <article>
                <h1 className="font-extrabold text-[#222328] text-[32px] ">
                    Create
                </h1>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[5000px]  ">
                    Create imaginative and visually stunning images through DAL-E AI and share them with the community
                </p>
            </article>
            <form className="mt-16 max-w-3xl" onSubmit={handleSumbit}>
                <div className="flex flex-col gap-5">
                    <FormField
                        labelName="Your Name"
                        name="name"
                        type="text"
                        value={form.name}
                        placeholder="John Doe"
                        handleChange={handleChange}
                    />
                    <FormField
                        labelName="The Prompt"
                        name="prompt"
                        type="text"
                        value={form.prompt}
                        placeholder="an oil painting by Matisse of a humanoid robot playing chess"
                        handleChange={handleChange}
                        IsSupriseMe
                        handleSupriseMe={handleSupriseMe}
                    />

                    <article className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                        {form.photo ? (
                            <img
                                src={form.photo}
                                className="w-full h-full object-contain"
                                alt={form.prompt}
                            />
                        ) : (
                            <Image
                                src={preview}
                                className="w-9/12 h-9/12 object-contain opacity-40"
                                alt='image placeholder'
                            />
                        )}

                        {generating && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg ">
                                <Loader />
                            </div>
                        )}
                    </article>
                </div>

                <section className="mt-5">
                    <button
                        type="button"
                        onClick={generateImage}
                        className="bg-green-700 text-white font-medium py-2.5 px-5 rounded-md text-sm w-full sm:w-auto text-center"
                    >
                        {generating ? 'Generating...' : 'Generate'}
                    </button>
                </section>
                <section className="mt-5">
                    <p className='mt-2 text-[#666e75] text-[14px]'>Once you have Creaated the Image you want, you can share it with others in the community</p>
                    <button
                        type="submit"
                        className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center  '
                    >
                        {loading ? 'Sharing...' : 'Share With the community'}
                    </button>
                </section>
            </form>


        </section>
    )
}

export default CreatePost