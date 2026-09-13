import Reel from './components/portfolio/Reel';
import ReelContent from './components/portfolio/ReelContent';
import Link from 'next/link';
import MotionMediaFeaturedContent from './components/portfolio/MotionMediaFeaturedContent';
import MotionMediaAll from './components/portfolio/MotionMediaAll';

export default async function Home() {
  const reelContent = await ReelContent();
  const motionMediaFeaturedContent = await MotionMediaFeaturedContent();
  const featuredTitle = "Featured Work";

  return (
    <div>
      <div className='p-6 font-extralight'>
        <Reel content={reelContent} />
        <div className='pt-6 mt-3 container mx-auto font-extralight'>
          <h3 className='text-center font-extralight text-xl mb-2'>{featuredTitle}</h3>
          <MotionMediaAll content={motionMediaFeaturedContent} showBackToTop={false} />
        </div>
        <div className='grid pt-6 place-items-center font-extralight'>
            <div className='mt-3'>
                <Link href="/work" className='underline'>See more of my work</Link>.
            </div>
          </div>
      </div>
    </div>
  )
}
