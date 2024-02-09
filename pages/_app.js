import "@/styles/globals.css";
import "@/styles/custom.scss";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const loadImage = () => {
    const img = new Image();
    img.src = "/images/slider/slider-bg.jpg";
  };

  return (
    <>
      <Component {...pageProps} />
      <script
        dangerouslySetInnerHTML={{ __html: `(${loadImage.toString()})();` }}
      />
    </>
  );
}
