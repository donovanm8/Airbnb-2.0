import Banner from "@/components/Banner";
import Header from "@/components/Header";
import LardCard from "@/components/LardCard";
import MediumCard from "@/components/MediumCard";
import SmallCard from "@/components/SmallCard";
import Head from "next/head";
import { useSelector } from "react-redux";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import Footer from "@/components/Footer";

export default function Home({ exploreData, cardsData }) {
  const user = useSelector((state) => state.user);
  const [isMoved, setIsMoved] = useState(false);

  const rowRef = useRef(null);
  const handleClick = (direction) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Head>
        <title>Airbnb Clone</title>
        <link rel="icon" href="https://rb.gy/gd2h2" />
      </Head>
      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="font-semibold text-4xl pb-5">
            {user.name
              ? `Welcome back ${user.name.split(" ")[0]}, lets explore Japan!`
              : "Explore Japan"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ id, image, location, distance }) => (
              <SmallCard
                key={id}
                image={image}
                location={location}
                distance={distance}
              />
            ))}
          </div>
        </section>

        <section className="relative">
          <h2 className="text-4xl font-semibold py-8">Stay anywhere</h2>
          <span onClick={() => handleClick("left")}>
            <ArrowLeftCircleIcon className="w-8 absolute cursor-pointer hover:scale-105 transition-none z-50 top-64 left-4 text-white" />
          </span>
          <div
            ref={rowRef}
            className="flex space-x-4 overflow-x-scroll scrollbar-hide p-3 -ml-3"
          >
            {cardsData?.map(({ img, title }, index) => (
              <MediumCard img={img} title={title} key={index} />
            ))}
          </div>
          <span onClick={() => handleClick("right")}>
            <ArrowRightCircleIcon className="w-8 absolute cursor-pointer hover:scale-105 transition-none z-50 top-64 right-4 text-white" />
          </span>
        </section>

        <LardCard
          img="https://rb.gy/7uhz5"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  );
}

// https://rb.gy/7uhz5
// https://rb.gy/lmjmk
// https://rb.gy/q56km
// https://rb.gy/jev1l
// https://rb.gy/xv5wh

export async function getStaticProps() {
  const res = await fetch("https://www.jsonkeeper.com/b/CWAS");
  const exploreData = await res.json();

  const secRec = await fetch(`https://www.jsonkeeper.com/b/6J24`);
  const cardsData = await secRec.json();

  return {
    props: {
      exploreData: exploreData,
      cardsData: cardsData,
    },
  };
}
