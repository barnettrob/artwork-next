import { getAllBlogPosts } from '@/app/lib/api'

const PortfolioImages = async () => {
  const images = await getAllBlogPosts();

  return images;
}

export default PortfolioImages