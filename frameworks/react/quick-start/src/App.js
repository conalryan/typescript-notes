import './App.css';
import { Component, MyButton } from './components/components';
import ConditionalRendering from './conditional-rendering/conditional-rendering';
import Interpolation from './interpolation/Interpolation';
import logo from './logo.svg';
import RenderingLists from './rendering-listes/rendering-lists';
import RespondingToEvents from './responding-to-events/responding-to-events';

function App() {

  let user = {
    name: 'Bob'
  };

  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span>The user is {user.name}</span>
      </header>

      <MyButton />

      <Component />

      <Interpolation />

      <ConditionalRendering />

      <RenderingLists />

      <RespondingToEvents />
    </div>
  );
}

export default App;
