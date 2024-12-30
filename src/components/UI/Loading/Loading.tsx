import Image from "next/image";

export default function Loading() {
  return <Image src="/loader.svg" alt="loading" width={30} height={30} />
}