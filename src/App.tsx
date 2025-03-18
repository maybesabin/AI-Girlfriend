import { useState } from 'react'
import Chat from './Chat'
import { Heart } from 'lucide-react'

const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [name, setName] = useState('')
  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-[#fde6ff] via-white to-[#fde6ff]'>
      {isSubmitted && <Chat name={name} />}

      {/* Asking Name */}
      {!isSubmitted &&
        <form
          onSubmit={() => setIsSubmitted(true)}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent backdrop-blur-lg z-50 flex items-center justify-center flex-col gap-4 p-6 w-full h-full`}>

          <h1 className='text-[#b274f3] text-3xl font-semibold'>
            Hey, What would you like to call her?
          </h1>
          <div className='md:w-[500px] w-full flex items-center gap-2 border border-[#b274f3] rounded-lg p-3'>
            <input
              placeholder='Her Name...'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full border-none outline-none text-sm'
              type="text"
            />
            <button type='submit'>
              <Heart color='#b274f3' className='fill-[#b274f3]' />
            </button>
          </div>
        </form>
      }
    </div>
  )
}

export default App