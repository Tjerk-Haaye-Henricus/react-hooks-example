import React, {
  useState,
  useEffect,
  Fragment,
  createContext,
  useContext
} from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import "./styles.css";

const IntroText = () => {
  return (
    <Fragment>
      <h1>Hey Boys 🙋‍♂️️️, Hey Girls 🙋</h1>
      <p>
        This is a example of using <strong>Hooks</strong> in a{" "}
        <strong>React</strong> Application
      </p>
      <p>
        First we're going to use the <strong>State</strong> Hook.
        <br />
        <strong>React</strong> Application
      </p>
    </Fragment>
  );
};

const CodeBox = ({ code }) => {
  return (
    <div className="code-box">
      <h2 className="code-box__headline">This is our "State"</h2>
      <code
        className="code-box__code"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </div>
  );
};

const Context = createContext();

const Console = () => {
  const context = useContext(Context);

  return (
    <div className="console">
      {context.lines.map(line => (
        <p className="console__line">
          <i>{moment(line.time).fromNow()}</i>: <strong>{line.text}</strong>
        </p>
      ))}
    </div>
  );
};

let TimeOutHandler = null;

// This is a stateless component in React
// Normally a stateless component has no lifecycle methods
// It also has no state and a context has to be wrapped in form of a provider
const App = () => {
  // At this line we're creating a member of out state
  const [showIcon, setShowIcon] = useState(false);
  const [logs, setLogs] = useState([]);
  const [chatboxValue, setChatBoxValue] = useState("");

  // This is called like ComponentDidMount or ComponentDidUpdate
  useEffect(() => {
    if (TimeOutHandler) {
      window.clearInterval(TimeOutHandler);
    }
    TimeOutHandler = window.setTimeout(() => setShowIcon(false), 5000);
  });

  return (
    <div className="App">
      <Context.Provider
        value={{
          addLine: log =>
            setLogs(
              [
                {
                  time: moment(),
                  text: log
                }
              ].concat(logs)
            ),

          lines: logs
        }}
      >
        <div className="wrapper">
          <div className="icon-wrapper">
            {showIcon && <span className="icon">🧙‍♂️</span>}
          </div>
          <IntroText />
          <button onClick={() => setShowIcon(!showIcon)}>
            {showIcon ? "Hide Icon" : "Show Icon for 5 secconds"}
          </button>
        </div>
        <CodeBox
          code={`&#123;&nbsp;"showIcon": ${showIcon.toString()}&nbsp;&#125;`}
        />
        <div className="chatbox">
          <Console />
          <Context.Consumer>
            {({ addLine }) => (
              <Fragment>
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    chatboxValue !== "" &&
                      addLine(JSON.stringify(chatboxValue));
                    setChatBoxValue("");
                  }}
                  className="chatbox__interactions"
                >
                  <input
                    placeholder="Write a message ❤️️️"
                    value={chatboxValue}
                    onChange={event => setChatBoxValue(event.target.value)}
                  />
                  <button type="submit">💌</button>
                </form>
              </Fragment>
            )}
          </Context.Consumer>
        </div>
      </Context.Provider>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
