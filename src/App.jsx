import { useEffect, useState, useMemo } from 'react';
import './App.css';
import AddNewCertificate from './feautures/AddNewCertificate';
import shallow from 'zustand/shallow';
import useStore from './stores/useStore';
import { useCallback } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import styled from 'styled-components';

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


const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled.button`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  	<>
  		<TextField
  			id="search"
  			type="text"
  			placeholder="Filter By Name"
  			aria-label="Search Input"
  			value={filterText}
  			onChange={onFilter}
  		/>
  		<ClearButton type="button" onClick={onClear}>
  			X
  		</ClearButton>
  	</>
  );

function App() {
  const [
    ticket,
    auth,
    getAllData,
    allData,
    clear
  ] = useStore(getState, shallow);

  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText]);

  const getFromDB = useCallback (async () => {
    await auth(); 
    getAllDataFromDB();  
  }, [ticket]);

  useEffect(() => {
    getFromDB();
  }, [])

  useEffect(()=>{
    const d = allData.filter(
      item => item.CERTIFICATION_NAME && item.CERTIFICATION_NAME.toLowerCase().includes(filterText.toLowerCase()),
    );
    setFilteredItems(d);
  }, [filterText]);
  const getAllDataFromDB = async () => {
    const res = await getAllData();
    
    setFilteredItems(res);
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
                  data={filteredItems}
                  selectableRows
                  subHeader
			            subHeaderComponent={subHeaderComponentMemo}
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
