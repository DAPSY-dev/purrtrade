import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/images/logo.svg"
        alt={`${process.env.APP_NAME} logo`}
        width={300}
        height={64}
        priority
      />
      <h1>{process.env.APP_NAME}</h1>
    </div>
  );
}
