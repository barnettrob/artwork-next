import type { ComponentProps } from 'react';
import PersonalWork from '../components/portfolio/PersonalWork';
import AllWork from '../components/portfolio/AllWork'

export default async function Home() {
  const images = await PersonalWork() as unknown as ComponentProps<typeof AllWork>['images'];
  const title = "Play";

  return (
    <div>
      <div className='p-6 font-extralight personal-work'>
        <h1 className='text-center font-extralight text-xl mb-2'>{title}</h1>
        <AllWork images={images} />
      </div>
    </div>
  )
}