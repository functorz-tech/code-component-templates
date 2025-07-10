import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { RandomButton } from './components/RandomButton';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState<number>(0);

  return (
    <BrowserRouter>
      <div style={{ height: '100%', width: '100%' }}>
        <RandomButton
          propData={{ min: 0, max: 1000 }}
          propState={{
            result: { get: () => value, set: (val) => setValue(val) },
          }}
          event={{ onChange: () => console.log('value: ', value) }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
