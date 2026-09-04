import MotionMediaListContent from '../components/portfolio/MotionMediaListContent';
import MotionMediaAll from '../components/portfolio/MotionMediaAll';

export default async function Home() {
  const title = "Motion Design";
  const motionMediaAllContent = await MotionMediaListContent();

  return (
    <div>
      <h1 className='text-center font-extralight text-xl'>{title}</h1>
      <div className='p-6 font-extralight'>
        <MotionMediaAll content={motionMediaAllContent} />
      </div>
    </div>
  )
}