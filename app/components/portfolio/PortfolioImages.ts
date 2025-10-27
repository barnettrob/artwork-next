import { getAllArtworkByCategory } from '@/app/lib/api'

const PortfolioImages = async (category: string) => {
  const images = await getAllArtworkByCategory(category);

  return images;
}

export default PortfolioImages