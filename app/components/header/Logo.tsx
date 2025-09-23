import Image from "next/legacy/image";
import { logoData, authorName } from "@/app/lib/getData";
import { Config } from "@/config";

const getLogoData = async () => {
  const logoInfo = await logoData();
  return logoInfo;
}

const getAuthorData = async () => {
  const author = await authorName();
  return author;
}

const Logo = () => {
  let picture = false;
  let title = "";

  let logoPath = Config.logo.path;
  // Make sure logoPath is a string.
  logoPath = typeof logoPath === "undefined" ? "" : logoPath;

  // Check to see if logoPath is a file path with images directory.
  const logoPathArray = logoPath?.split("/");
  picture = logoPathArray?.length === 3 && logoPathArray[1] === "images" ? true : false;

  let logo: any;
  if (picture) {
    // show logo
    logo = <div className='image-card' 
              style={{ maxWidth: '380px', height: '300px', position: 'relative', overflow: 'hidden' }}>
            <Image
              alt={title}
              src={logoPath}
              quality={80}
              layout="fill"
              objectFit="cover"
              placeholder={'empty'}
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjOHf4cAUAB4QCzf7jDSoAAAAASUVORK5CYII='
              priority
            />
          </div>
  }
  else {
    // Show Author name because no logo picture.
    // If logoPath env variable is empty then default to Author Name.
    // Otherwise show the value as a string.
    logo = logoPathArray.length === 1 && logoPathArray[0] !== "" ? logoPath : "Author Name";
  }

  return (
    <div>{logo}</div>
  )
}

export default Logo