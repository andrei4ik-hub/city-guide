// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { CssBaseline } from '@mui/material';
// import Map from './components/Map/Map';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <CssBaseline />
//       <Routes>
//         <Route path="/" element={<Map />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Map from './components/Map/Map';
import SignUp from '../src/components/SingUp';
import SignIn from '../src/components/SingIn';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
