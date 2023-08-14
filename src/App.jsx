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
  state.allData,
  state.clear
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
    selector: row => moment(row.CERTIFICATION_ISSUEDATE).format('DD/MM/yyyy'),
  },
  {
    name: 'Sertifikatın etibarlılıq tarixi',
    selector: row => moment(row.CERTIFICATION_VALIDDATE).format('DD/MM/yyyy'),
  },
  {
    name: 'Sertifikat faylı',
    selector: row => <div style={{display: 'flex'}}> <div dangerouslySetInnerHTML={{ __html: row.CERTIFICATION_FILE_GIF }} /><a href={row.CERTIFICATION_FILE_BROWSE} alt="certification_file_link">{row.CERTIFICATION_NAME}</a><div dangerouslySetInnerHTML={{__html: row.CERTIFICATION_FILE_FUNC}} /></div>,
  }
];

function App() {
  const [
    ticket,
    auth,
    getAllData,
    allData,
    clear
  ] = useStore(getState, shallow);

  const getFromDB = useCallback (async () => {
    await auth(); 
    getAllDataFromDB();
  }, [ticket]);

  useEffect(() => {
    getFromDB();
  }, [])
  const getAllDataFromDB = async () => {
    const res = await getAllData();
    setShowTable(true);
  }
  const [showTable, setShowTable] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const showForm = () => {
    setShowAddForm(!showAddForm);
    clear();
  }
  const handleFinish = () => {
    alert('Done !');
    setShowAddForm(!showAddForm);
    clear();
  }
  return (
      <div className="container-fluid">
        <div className="row mt-2">
          <h1>Sertifikatlar</h1>
        </div>
        <div className="row mt-4">
          <div className="col-sm-12">
            { showAddForm ? <AddNewCertificate onFinish={handleFinish} /> : <></> }
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
