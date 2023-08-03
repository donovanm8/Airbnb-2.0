import Image from "next/image";

export default function LardCard({ img, title, description, buttonText }) {
  return (
    <section className="relative py-16 cursor-pointer">
      <div className="relative h-96 min-w-[300px]">
        <Image src={img} fill style={{ objectFit: "cover" }} className="rounded-2xl"/>
      </div>

      <div className="absolute top-44 left-12 text-white">
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <p className="">{description}</p>
        <button className="text-gray-900 bg-white px-4 py-2 rounded-lg mt-5">{buttonText}</button>
      </div>
    </section>
  );
}
