import React from 'react'
import { seoText } from '../../data/data'
import { Description } from '@headlessui/react'

const SEOText = () => {
  return (
    <div className="sm:py-12 py-12 sm:px-12 px-6 max-w-full ">
      <div className="max-w-[1400px] mx-auto flex flex-col justify-center gap-12">
            <div className='flex flex-col gap-6'>
                {
                    seoText.map((text, index) => (
                        <div className='flex flex-col gap-3' key={index}>
                            <h3 className='xl:text-lg sm:text-lg min-[420px]:text-lg text-lg text-headingColor'>{text.title}</h3>
                            <p className='text-headingColor sm:text-sm text-sm'>{text.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
  )
}

export default SEOText