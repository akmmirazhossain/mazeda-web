// pages/index.js

import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Head>
        <title>Home Page</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center w-3/5 py-10">
        <div className="border p-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">
              Using Nextjs &lt;Image /&gt; tag
            </h1>
            <p className="text-lg text-gray-700 mb-2">
              NextJs auto compresses the original image into 3 individual
              resolutions (e.g. phone, tablet, desktop ), the particular image
              loads up when accessed from those devices.
              <br />
              The bottom image is using &lt;Image /&gt; tag and has three
              different resolutions.
            </p>
          </div>

          <div className="relative w-full h-[350px]">
            <Image
              src="/images/test/test.png"
              alt=""
              layout="fill"
              objectFit="cover"
              className=""
            />
          </div>
        </div>

        <div className="border mt-10 p-6">
          <h1 className="text-3xl font-bold mb-4">
            Using HTML &lt;img /&gt; tag
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            The images in HTML has only one resolution, and it remains unchanged
            for all the devices. The image below is using &lt;img /&gt; tag and
            has only one resolution.
          </p>
          <img src="/images/test/test.png" alt="Next.js Logo" className="" />
        </div>
      </main>
    </div>
  );
}
