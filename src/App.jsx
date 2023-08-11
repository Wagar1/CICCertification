import { useEffect, useState } from 'react';
import './App.css';
import AddNewCertificate from './feautures/AddNewCertificate';
import shallow from 'zustand/shallow';
import useStore from './stores/useStore';
import { useCallback } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';

const getState = state => [
  state.ticket,
  state.auth,
  state.getAllData,
  state.allData
];

const columns = [
  {
      name: 'Sertifikatın adı',
      selector: row => row.CERTIFICATION_NAME,
  },
  {
      name: 'Sertifikatı verən təşkilat',
      selector: row => row.CERTIFICATION_ORG,
  },
  {
    name: 'Sertifikatın növü ',
    selector: row => row.CERTIFICATION_TYPE
  },
  {
    name: 'Sertifikatın alınma tarixi',
    selector: row => moment(row.CERTIFICATION_ISSUEDATE).format('DD/MM/yyyy')
  },
  {
    name: 'Sertifikatın etibarlılıq tarixi',
    selector: row => moment(row.CERTIFICATION_VALIDDATE).format('DD/MM/yyyy')
  }
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
    getAllDataFromDB();
  }, [])
  const getAllDataFromDB = async () => {
    const res = await getAllData();
    setShowTable(true);
  }
  const [showTable, setShowTable] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const showForm = () => {
    setShowAddForm(!showAddForm);
  }
  return (
      <div className="container-fluid">
        <div className="row mt-2">
          <h1>Sertifikatlar</h1>
        </div>
        <div className="row mt-4">
          <div className="col-sm-6">
            { showAddForm ? <AddNewCertificate /> : <></> }
            <button className="btn" onClick={showForm}>{!showAddForm ? <span>Yeni sertifikat əlavə et</span> : <span>Əlavə et formasını gizlət</span>}</button>
            {
              showTable ? <DataTable
                  columns={columns}
                  data={allData}
                  selectableRows
              /> : <></>
            }
          </div>
          <div className="col-sm-6">
            
          </div>
        </div>
        
      </div>
  )
}

export default App
