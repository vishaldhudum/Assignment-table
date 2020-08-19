// Library
import React from 'react';

// Components
import DataTable from './DataTable'
import Header from './Header'
import EditDialog from "./EditDialog"

function App() {
  return (
    <div>
      <Header />
      <DataTable />
      <EditDialog />
    </div>
  );
}

export default App;
