import { getLoremPicsumImages } from '@/app/lib/api'

const PortfolioImages = async () => {
  const images = await getLoremPicsumImages();
  
  return images;
}

export default PortfolioImages