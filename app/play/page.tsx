import type { ComponentProps } from 'react';
import PersonalWork from '../components/portfolio/PersonalWork';
import AllWork from '../components/portfolio/AllWork'

export default async function Home() {
  const images = await PersonalWork() as unknown as ComponentProps<typeof AllWork>['images'];

  return (
    <div>
      <div className='p-6 font-extralight personal-work'>
        <AllWork images={images} />
      </div>
    </div>
  )
}