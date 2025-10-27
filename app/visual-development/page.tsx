import PortfolioImages from '../components/portfolio/PortfolioImages';
import AllWork from '../components/portfolio/AllWork'

export default async function Home() {
  const title = "Visual Development";
  const images = await PortfolioImages(title);

  return (
    <div>
      <h1 className='text-center font-extralight text-xl'>{title}</h1>
      <div className='p-6 font-extralight'>
        <AllWork images={images} />
      </div>
    </div>
  )
}