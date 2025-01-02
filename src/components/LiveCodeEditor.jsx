import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

const LiveCodeEditor = () => {
  const [code, setCode] = useState(
    `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('Milind'));`
  );

  const [output, setOutput] = useState("");

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const runCode = () => {
    try {
      // Create a new function from the code string
      const runnable = new Function("console", code);

      // Capture console.log output
      let consoleOutput = "";
      const mockConsole = {
        log: (...args) => {
          consoleOutput += args.join(" ") + "\n";
        },
      };

      // Run the code with the mock console
      runnable(mockConsole);

      setOutput(consoleOutput);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-zinc-800/50 p-4 rounded-xl">
      <h3 className="text-zinc-200 text-lg mb-4">Live Code Editor</h3>
      <Highlight theme={themes.vsDark} code={code} language="javascript">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              padding: "1em",
              borderRadius: "0.5rem",
              overflow: "auto",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => {
                  const tokenProps = getTokenProps({ token });
                  return <span key={key} {...tokenProps} />;
                })}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        className="w-full bg-zinc-900 text-zinc-200 p-2 rounded-md mt-4"
        rows={5}
      />
      <button onClick={runCode} className="btn btn-primary mt-4 mb-4">
        Run Code
      </button>
      <div className="bg-zinc-900 p-4 rounded-xl">
        <h4 className="text-zinc-200 mb-2">Output:</h4>
        <pre className="text-sky-400 whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default LiveCodeEditor;
