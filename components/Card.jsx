import { download } from '@/public/assets'
import downloadImage from '@/utils/downloadImage'
import Image from 'next/image'
import Avatar from 'react-avatar';

export const Card = ({_id,name,photo,prompt}) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img className='w-full h-auto object-cover rounded-xl' src={photo} alt={prompt}/>

      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#171717] m-2 p-4 rounded-md'>
        <p className='text-white text-sm overflow-y-auto prompt'>{prompt}</p>

        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
              <Avatar name={name} round={true} size='40'/>
              <p className='text-white text-sm'>{name}</p>
          </div>
          <button type='button' className='outline-none bg-transparent border-none' onClick={() => downloadImage(_id,photo)}>
            <Image src={download} className='w-6 h-6 object-contain invert'/>
          </button>
        </div>
      </div>
    </div>
  )
}
