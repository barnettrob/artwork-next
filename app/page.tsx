import Reel from './components/portfolio/Reel';
import ReelContent from './components/portfolio/ReelContent';
import Link from 'next/link';

export default async function Home() {
  const reelContent = await ReelContent();

  return (
    <div>
      <div className='p-6 font-extralight'>
        <Reel content={reelContent} />
        <div className='grid pt-6 place-items-center font-extralight'>
            <div className='mt-3'>
                <Link href="/work" className='underline'>See more of my work</Link>.
            </div>
          </div>
      </div>
    </div>
  )
}
