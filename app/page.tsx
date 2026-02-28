import MotionMediaListContent from './components/portfolio/MotionMediaListContent';
import MotionMediaAll from './components/portfolio/MotionMediaAll';

export default async function Home() {
  const title = "Motion Design";
  const motionMediaAll = await MotionMediaListContent();
  const content = motionMediaAll.content;
  const order = motionMediaAll.order;

  return (
    <div>
      <h1 className='text-center font-extralight text-xl'>{title}</h1>
      <div className='p-6 font-extralight'>
        <MotionMediaAll images={content} order={order} />
      </div>
    </div>
  )
}
