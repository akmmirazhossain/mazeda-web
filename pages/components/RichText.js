// mazeda-web/pages/components/RichText.js
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const headingStyles = {
  1: "heading_akm mt-8 mb-4",
  2: "subheading_akm mt-8 mb-3",
  3: "font-semibold text-lg mt-6 mb-2",
  4: "font-semibold text-base mt-4 mb-2",
  5: "font-semibold text-sm mt-3 mb-1",
  6: "font-semibold text-sm mt-3 mb-1",
};

const RichText = ({ content }) => (
  <BlocksRenderer
    content={content}
    blocks={{
      heading: ({ children, level }) => {
        const Tag = `h${level}`;
        return (
          <Tag className={headingStyles[level] ?? "font-semibold"}>
            {children}
          </Tag>
        );
      },
      paragraph: ({ children }) => (
        <p className="body_text_akm mb-4">{children}</p>
      ),
      list: ({ children, format }) =>
        format === "ordered" ? (
          <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
        ) : (
          <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
        ),
      "list-item": ({ children }) => <li>{children}</li>,
      link: ({ children, url }) => (
        <a
          href={url}
          className="text_green hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      quote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">
          {children}
        </blockquote>
      ),
      code: ({ children }) => (
        <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm">
          <code>{children}</code>
        </pre>
      ),
      image: ({ image }) => (
        <img
          src={image.url}
          alt={image.alternativeText || ""}
          className="rounded-2xl my-4 w-full"
        />
      ),
    }}
    modifiers={{
      bold: ({ children }) => <strong className="font-bold">{children}</strong>,
      italic: ({ children }) => <em className="italic">{children}</em>,
      underline: ({ children }) => (
        <span className="underline">{children}</span>
      ),
      strikethrough: ({ children }) => (
        <span className="line-through">{children}</span>
      ),
      code: ({ children }) => (
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
          {children}
        </code>
      ),
    }}
  />
);

export default RichText;
