// import logo from './logo.svg';
// import './App.css';

import { ChakraProvider, Container, Stack } from '@chakra-ui/react';

import Demo from './components/Demo';
import Footer from './components/Footer';
import Header from './components/Header';

import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
          <Container maxW="container.md" mt={8}>
            <Stack spacing="24px">
      <Header />
      <Demo />
      <Footer />
      </Stack>
      </Container>

      {/*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
      */}
    </ChakraProvider>
  );
}

export default App;
