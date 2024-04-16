import mixedData from "../public/data/mixedData.json";

export async function getServerSideProps({ params }) {
  const { slug } = params ?? {};

  // Find the data with the matching URL slug
  const infoData = mixedData.find((data) => data.url === slug);

  if (!infoData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: infoData.title,
      content: infoData.content,
    },
  };
}

export default function Info({ title, content }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}
