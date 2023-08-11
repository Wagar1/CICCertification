import { useEffect } from 'react';
import './App.css';
import AddNewCertificate from './feautures/AddNewCertificate';
import shallow from 'zustand/shallow';
import useStore from './stores/useStore';
import { useCallback } from 'react';

const getState = state => [
  state.ticket,
  state.auth,
  state.getAllData,
  state.allData
];

function App() {
  const [
    ticket,
    auth,
    getAllData,
    allData
  ] = useStore(getState, shallow);

  const getFromDB = useCallback (async () => {
    await auth(); 
  }, [ticket]);

  useEffect(() => {
    getFromDB();
    console.log(ticket);
  }, [])
  const getAllDataFromDB = async () => {
    const res = await getAllData();
    console.log(res);
  }
  return (
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-sm-6">
            <AddNewCertificate />
            <button onClick={getAllDataFromDB}>Get All data</button>
          </div>
        </div>
        
      </div>
  )
}

export default App
