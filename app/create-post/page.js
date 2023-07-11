'use client'

import FormField from '@/components/FormField';
import React, { useState } from 'react'
import { preview } from '@/public/assets';
import Image from 'next/image';
import { getRandomPrompt } from '@/utils/getRandomPrompt';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import { toast } from 'react-hot-toast';

const CreatePost = () => {

    const router = useRouter()

    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });
    
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }

    // Generate an image using DALL-E
    const generateImage =  async() => {
        if(form.prompt){
          try {
            setGeneratingImg(true)
            const res = await fetch('api/dalle',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({prompt:form.prompt})
            })

            const data = await res.json()
            setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
            console.log(data)
          } catch (error) {
            alert(error)
          }finally{
            setGeneratingImg(false)
          }
        }else{  
          alert('No prompt')
        }  
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt()
        setForm({...form,prompt:randomPrompt})
    }

    // Send data to mongo db
    const handleSubmit = async () => {
      try {
        setLoading(true)
        toast.success('Adding, please hold on...')
        const res = await fetch('/api/posts',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(form)
        })
        
        toast.success('Post successfully added!')
        router.push('/')
        
      } catch (error) {
          alert(error)
      }finally{
        setLoading(false)
      }
    }

  return (
    <section className="flex flex-col justify-center align-middle items-center max-w-7xl">

      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      <form className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <Image
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            disabled={!form.prompt || generatingImg ? true : false}
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:opacity-70"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">Once you have created the image you want, you can share it with others in the community</p>
          <button
            disabled={!form.name || !form.photo || !form.prompt || loading ? true : false}
            type="button"
            onClick={handleSubmit}
            className="mt-3 text-white bg-[#262cdf] font-medium rounded-md text-sm w-full px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost