import Image from "next/image";

export default function Poster({poster, title, size}: {poster: string; title: string; size: number}) {
  const baseLink: string = `https://image.tmdb.org/t/p/w${size}`;

  return <Image src={`${baseLink}${poster}`} alt={title} fill loading="lazy"
    style={{position: "absolute", width: "100%", height: "100%", objectFit: "cover"}}
  />
}