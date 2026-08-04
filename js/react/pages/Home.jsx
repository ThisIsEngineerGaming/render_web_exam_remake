import { useEffect, useState } from "react";
import MarqueeTicker from "../components/MarqueeTicker.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProducts, createProductInstance, categories, manufacturers, customer } from "../data.js";
import Order from "../../entities/Order.js";
import { VideoBanner, VideoOverlay, ProductsGrid, ShowMore } from "./Home.styles.js";

// Port of the "INDEX PAGE" block from the old js/app.js
export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetchProducts().then((data) => {
      if (cancelled) return;
      const preview = data.slice(0, 8);
      setProducts(preview);

      // Preserve the original demo console output / entity wiring
      const instances = preview.map(createProductInstance);
      const order = new Order(1, customer, instances, "Created", new Date());
      console.log(categories[1].getInfo());
      console.log(manufacturers[1].getCompanyAge());
      console.log(customer.getFullName());
      console.log(order.status);
      order.changeStatus("Delivered");
      console.log(order.status);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <VideoBanner>
        <marquee behavior="scroll" direction="right" loop="infinite" bgColor="#0f0f0f">
          <img src="/img/placeholder.png" alt="freddy" />
          <img src="/img/placeholder.png" alt="freddy" />
          <img src="/img/placeholder.png" alt="freddy" />
        </marquee>
        <VideoOverlay>
          <p>MailABom</p>
        </VideoOverlay>
      </VideoBanner>

      <MarqueeTicker />

      <ProductsGrid>
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </ProductsGrid>

      <ShowMore to="/products">
        <p>showmore</p>
      </ShowMore>
    </>
  );
}
