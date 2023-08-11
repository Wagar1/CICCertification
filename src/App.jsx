import { useEffect } from 'react';
import './App.css';
import AddNewCertificate from './feautures/AddNewCertificate';
import shallow from 'zustand/shallow';
import useStore from './stores/useStore';
import { useCallback } from 'react';

const getState = state => [
  state.ticket,
  state.auth
];

function App() {
  const [
    ticket,
    auth
  ] = useStore(getState, shallow);

  const getFromDB = useCallback (async () => {
    await auth();
  }, [ticket]);

  useEffect(() => {
    getFromDB();
  }, [])

  return (
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-sm-6">
            <AddNewCertificate />
          </div>
        </div>
        
      </div>
  )
}

export default App
