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
    <div className='about p-6 grid grid-cols-1 md:grid-cols-2 gap-4 container mx-auto'>
      <div className="description">
        {documentToReactComponents(aboutPageItems[0].body.json)}
      </div>
      <div>
        <div style={{ maxWidth: "360px", margin: "0 auto" }}>
        <Image
          alt={title}
          src={aboutPageItems[0].picture.url}
          width={aboutPageItems[0].picture.width}
          height={aboutPageItems[0].picture.height}
          quality={80}
          layout="responsive"
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
          priority
        />
        </div>
      </div>
    </div>
  )
}

export default About