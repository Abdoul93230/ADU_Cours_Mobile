import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeBlock({ code, language }) {
  return (
    <div className="my-4">
      <SyntaxHighlighter 
        language={language} 
        style={dracula}
        className="rounded-lg"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;