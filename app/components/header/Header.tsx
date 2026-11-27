import { getAllSocialMedia } from '@/app/lib/api';
import Menu from './Menu'

type SocialLink = {
  name: 'instagram' | 'linkedin';
  url: string;
};

const Header = async () => {
  const socialMedia = await getAllSocialMedia();
  const data = typeof socialMedia === 'object' && socialMedia !== null && 'data' in socialMedia
    ? socialMedia.data
    : null;
  const collection = typeof data === 'object' && data !== null && 'socialMediaCollection' in data
    ? data.socialMediaCollection
    : null;
  const items = typeof collection === 'object' && collection !== null && 'items' in collection && Array.isArray(collection.items)
    ? collection.items
    : [];
  const socialLinks: SocialLink[] = items.flatMap((item: unknown): SocialLink[] => {
    if (
      typeof item === 'object' &&
      item !== null &&
      'name' in item &&
      'url' in item &&
      typeof item.name === 'string' &&
      typeof item.url === 'string' &&
      (item.name === 'instagram' || item.name === 'linkedin')
    ) {
      return [{ name: item.name, url: item.url }];
    }

    return [];
  }).sort((a: SocialLink, b: SocialLink) => a.name.localeCompare(b.name));

  return (
    <div>
        <Menu socialLinks={socialLinks} />
    </div>
  )
}

export default Header