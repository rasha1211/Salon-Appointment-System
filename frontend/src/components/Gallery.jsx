import "../styles/Gallery.css";

import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";
import gallery5 from "../assets/gallery5.jpg";
import gallery6 from "../assets/gallery6.jpg";

function Gallery() {
  return (
    <section className="gallery">
      <h2>Our Gallery</h2>

      <div className="gallery-grid">
        <img src={gallery1} alt="Gallery 1" />
        <img src={gallery2} alt="Gallery 2" />
        <img src={gallery3} alt="Gallery 3" />
        <img src={gallery4} alt="Gallery 4" />
        <img src={gallery5} alt="Gallery 5" />
        <img src={gallery6} alt="Gallery 6" />
      </div>
    </section>
  );
}

export default Gallery;