import Image from "next/legacy/image";
import { getAbout } from "../lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const About = async () => {
  const aboutPage = await getAbout();
  const aboutPageItems = typeof aboutPage !== "undefined" && "data" in aboutPage && 
  "pageCollection" in aboutPage.data && 
  "items" in aboutPage.data.pageCollection ? aboutPage.data.pageCollection.items : [];
  let title = "";
  if (Array.isArray(aboutPageItems) && aboutPageItems.length > 0) {
    title = "title" in aboutPageItems[0] ? aboutPageItems[0].title : title;
  }

  return (
    <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4 container mx-auto'>
      <div>
        {documentToReactComponents(aboutPageItems[0].body.json)}
      </div>
      <div className='image-card' 
          style={{ maxWidth: '380px', height: '300px', position: 'relative', overflow: 'hidden' }}>
        <Image
          alt={title}
          src={aboutPageItems[0].picture.url}
          quality={80}
          layout="fill"
          objectFit="cover"
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
          priority
        />
      </div>
    </div>
  )
}

export default About