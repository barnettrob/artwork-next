import { getAllArtwork } from '@/app/lib/api'

const PortfolioImages = async () => {
  const images = await getAllArtwork();

  return images;
}

export default PortfolioImages