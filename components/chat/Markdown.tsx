import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // #, ##, ### ...
        h1: ({ ...props }) => (
          <h1 className="text-2xl font-bold mb-3" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-xl font-semibold mt-4 mb-2" {...props} />
        ),
        p: ({ ...props }) => (
          <p className="mb-2 leading-relaxed text-sm" {...props} />
        ),
        // links
        a: ({ href, ...props }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-2"
            {...props}
          />
        ),
        // unordered lists
        ul: ({ ...props }) => (
          <ul className="list-disc pl-5 space-y-1 mb-2" {...props} />
        ),
        // ordered lists
        ol: ({ ...props }) => (
          <ol className="list-decimal pl-5 space-y-1 mb-2" {...props} />
        ),
        // list items
        li: ({ ...props }) => <li className="text-sm" {...props} />,
        strong: ({ ...props }) => <strong className="pr-1" {...props} />,
        code: ({ inline, children, ...props }: any) => {
          const code = String(children).replace(/\n$/, "");

          if (inline) {
            return (
              <code
                className="
                  px-1 py-0.5 rounded 
                  bg-gray-200 dark:bg-background 
                  text-[0.9em] font-mono
                "
                {...props}
              >
                {code}
              </code>
            );
          }

          return (
            <pre
              className="
                bg-gray-100 dark:bg-gray-900
                border border-gray-300 dark:border-gray-700
                rounded-lg px-3 py-2
                text-sm font-mono
                whitespace-pre-wrap   /* don't overflow */
                break-words           /* break long lines */
                leading-relaxed
              "
            >
              {code}
            </pre>
          );
        },
        // blockquote
        blockquote: ({ ...props }) => (
          <blockquote
            className="border-l-4 border-primary/40 pl-3 py-1 text-sm italic text-muted-foreground my-2"
            {...props}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
