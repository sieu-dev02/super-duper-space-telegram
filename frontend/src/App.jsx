import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import Header from './components/Header';
import MotorcycleList from './components/MotorcycleList';
// Nếu cài đặt shadcn/ui, bạn có thể import ThemeProvider ở đây.
// import { ThemeProvider } from '@shadcn/ui';

function App() {
  return (
    <ApolloProvider client={client}>
      {/* Nếu sử dụng shadcn/ui, bọc App trong ThemeProvider */}
      {/* <ThemeProvider> */}
        <Header />
        <MotorcycleList />
      {/* </ThemeProvider> */}
    </ApolloProvider>
  );
}

export default App;
