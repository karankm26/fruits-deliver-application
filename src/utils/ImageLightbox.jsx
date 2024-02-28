import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { forwardRef, useImperativeHandle, useState } from "react";

const ImageLightbox = forwardRef(({}, ref) => {
  const [open, setOpen] = useState(false);

  function isValidDocUrl(str) {
    if (typeof str !== "string") return false;
    return !!str.match(/\w+\.(docx|doc|pdf|xlsx)$/gi);
  }

  const handleImageClick = (item, image) => {
    const { filename, url } = image;
    const allImageURLs = item?.images
      ?.map((item) => {
        return !isValidDocUrl(item.url) && filename !== item.filename
          ? { src: item.url }
          : null;
      })
      .filter((img) => Boolean(img));
    setOpen([{ src: url }, ...allImageURLs]);
  };
  useImperativeHandle(ref, () => ({
    handleImageClick,
  }));
  return (
    <div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Zoom, Fullscreen, Thumbnails, Captions, Slideshow, Download]}
        slides={open}
        animation={{ zoom: 500 }}
      />
    </div>
  );
});
export default ImageLightbox;
