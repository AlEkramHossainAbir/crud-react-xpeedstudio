import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateForm from './components/createForm/CreateForm';
import Header from './components/header/Header';
import ListTable from './components/table/ListTable';

function App() {
  return (
    <BrowserRouter className="App">
      <Header />
      <Routes>
        <Route exact path='/' element={<ListTable />} />
        <Route path='/form' element={<CreateForm />} />
        <Route path='/form/:id' element={<CreateForm />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
