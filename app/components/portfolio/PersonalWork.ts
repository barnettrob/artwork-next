import { getAllArtwork } from "@/app/lib/api";

const PersonalWork = async () => {
  const images = await getAllArtwork();

  return images;
}

export default PersonalWork;