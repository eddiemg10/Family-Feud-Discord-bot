import logo from "./logo.svg";
import "./App.css";
import icon from "./images/bot-logo.png";
import discord from "./images/discord-logo.png";
import line from "./images/line.png";
import demo from "./images/demo.gif";

// import "./index.css";

function App() {
  return (
    <div className="App font-monts pt-20 pb-80 bg-dark text-white px-10">
      <div class="flex justify-center mb-20">
        <img className="w-60" src={icon}></img>
      </div>

      <div className="flex w-full flex-wrap">
        <div className="lg:w-[70%] w-full flex-col flex items-center">
          <h1 className="text-8xl font-sans font-black mb-5">DISCORD FEUD</h1>
          <h2 className="text-3xl">Family Feud Discord Bot</h2>

          <div className="lg:w-[70%] w-full md:px-20 px-10  text-left py-20 mt-20 bg-discord">
            <p className="text-2xl font-light">
              The family feud discrod bot allows you to play the game show
              Family Feud in your own discord server!
            </p>
            <div className="mt-16 w-full flex flex-col items-center px-10">
              <a
                target="_blank"
                href="https://discord.com/api/oauth2/authorize?client_id=937994236551376958&permissions=2147945536&scope=bot%20applications.commands"
                className="bg-white text-discord font-semibold w-full text-center py-4 text-2xl hover:shadow-lg hover:cursor-pointer transition "
              >
                Add to Discord
              </a>
            </div>
          </div>
        </div>
        <div className="lg:w-[30%] w-full flex justify-center items-center">
          <img src={discord} className="lg:w-[80%] w-[40%] object-contain" />
        </div>
      </div>

      <div className="mt-80 flex flex-col w-full lg:px-40 md:px-20 px-8">
        <h2 className="text-5xl font-semibold text-start">How to use it</h2>
        <p className="font-thin text-3xl text-left mt-10">
          Discord Feud is one of the simplest bots to use. To use it, you only
          need to know 1 command:
        </p>
        <h1 className="font-black font-sans text-discord text-8xl mt-7">
          !feud
        </h1>

        <div className="flex items-end my-10 mt-20">
          <h1 className="font-black font-sans text-discord text-9xl">1.</h1>
          <p className="font-thin md:text-2xl text-base text-left ml-10">
            Add the bot to a discord server. You can find the invite link{" "}
            <a
              target="_blank"
              className="text-discord font-semibold underline"
              href="https://discord.com/api/oauth2/authorize?client_id=937994236551376958&permissions=2147945536&scope=bot%20applications.commands"
            >
              here
            </a>
          </p>
        </div>

        <div className="flex items-end my-10">
          <h1 className="font-black font-sans text-discord text-8xl">2.</h1>
          <p className="font-thin md:text-2xl text-base text-left ml-10">
            Go to any text channel and start a session by sending the
            <span className="text-discord font-semibold">!feud</span> command
          </p>
        </div>

        <div className="flex items-end my-10">
          <h1 className="font-black font-sans text-discord text-8xl">3.</h1>
          <p className="font-thin md:text-2xl text-base text-left ml-10">
            Other players can join by sending{" "}
            <span className="text-discord font-semibold">join.</span> The
            session initiator can start the game by sending{" "}
            <span className="text-discord font-semibold">start.</span>
          </p>
        </div>

        <div className="flex items-end my-10">
          <h1 className="font-black font-sans text-discord text-8xl">4.</h1>
          <p className="font-thin md:text-2xl text-base text-left ml-10">
            Once the game starts, all participants take turns answering the same
            questions until all answers are given or nobody gives a correct
            answer.
          </p>
        </div>

        <div>
          <img src={line} />
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-start mt-16">Example</h2>
          <div className="mt-10 w-full">
            <img src={demo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
