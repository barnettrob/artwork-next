import Reel from './components/portfolio/Reel';
import ReelContent from './components/portfolio/ReelContent';


export default async function Home() {
  const reelContent = await ReelContent();

  return (
    <div>
      <div className='p-6 font-extralight'>
        <Reel content={reelContent} />
      </div>
    </div>
  )
}
