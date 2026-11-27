import { getAllArtwork, getPlayArtworkOrder } from "@/app/lib/api";
import { orderArtworkContent } from "@/app/lib/orderArtworkContent";

const PersonalWork = async () => {
  const images = await getAllArtwork();
  const playArtworkOrderObj = await getPlayArtworkOrder();

  let order = [];
  for (const key in playArtworkOrderObj) {
    if (playArtworkOrderObj.hasOwnProperty(key)) {
      const element = playArtworkOrderObj[key];
      if ("orderCollection" in element && "items" in element.orderCollection) {
        for (const item of element.orderCollection.items) {
          if ("title" in item) {
            order.push(item.title);
          }
        }
      }
    }
  }

  // Order content based on order array
  const orderedContent = orderArtworkContent(images, order);

  return orderedContent;
}

export default PersonalWork;