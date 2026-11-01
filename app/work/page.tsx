import MotionMediaListContent from '../components/portfolio/MotionMediaListContent';
import MotionMediaAll from '../components/portfolio/MotionMediaAll';

export default async function Home() {
  const title = "Work";
  const motionMediaAllContent = await MotionMediaListContent();

  return (
    <div>
      <div className='p-6 font-extralight'>
        <h1 className='text-center font-extralight text-xl mb-2'>{title}</h1>
        <MotionMediaAll content={motionMediaAllContent} showBackToTop={true} />
      </div>
    </div>
  )
}