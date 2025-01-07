import PortfolioImages from './components/portfolio/PortfolioImages';
import AllWork from './components/portfolio/AllWork'

export default async function Home() {
  const images = await PortfolioImages();

  return (
    <div className='p-6 font-extralight masonry'>
      <AllWork images={images} />
    </div>
  )
}
