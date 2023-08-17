import { useEffect, useState, useMemo } from 'react';
import './App.css';
import AddNewCertificate from './feautures/AddNewCertificate';
import shallow from 'zustand/shallow';
import useStore from './stores/useStore';
import { useCallback } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import moment from 'moment';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const getState = state => [
  state.ticket,
  state.auth,
  state.getAllData,
  state.allData,
  state.clear,
  state.setAddNewCertificationModal
];

const columns = [
  {
      name: 'Sertifikatın adı',
      selector: row => row.CERTIFICATION_NAME,
      sortable: true,
  },
  {
      name: 'Sertifikatı verən təşkilat',
      selector: row => row.CERTIFICATION_ORG,
      sortable: true
  },
  {
    name: 'Sertifikatın növü ',
    selector: row => row.CERTIFICATION_TYPE,
    sortable: true
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

const MainTable = styled(DataTable)`
  background-color: white;
`;

const MainRow = styled.div`
  &:hover {
    background-color: #f7f8f8; 
    cursor: pointer;
  }
`;

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

const FiltersComponent = props => {
  const [filterName, setFilterName] = useState('');
  const [filterOrg, setFilterOrg] = useState('');
  const [filterType, setFilterType] = useState('')
  const [startIssueDate, setStartIssueDate] = useState(null);
  const [endIssueDate, setEndIssueDate] = useState(null);
  const [startValidDate, setStartValidDate] = useState(null);
  const [endValidDate, setEndValidDate] = useState(null);
  useEffect(() => {
    props.filter({
      filterName,
      filterOrg,
      filterType,
      startIssueDate,
      endIssueDate,
      startValidDate,
      endValidDate
    });
  }, [filterName, filterOrg, filterType, startIssueDate, endIssueDate, startValidDate, endValidDate]);
  return<div className="container-fluid">
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label">Sertifikatın adı</label>
      <div className="col-sm-2">
        <input className="form-control form-control-sm" type="text" value={filterName} onChange={e => { setFilterName(e.target.value); }} />
      </div>
    </div>
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label">Sertifikatı verən təşkilat</label>
      <div className="col-sm-2">
        <input className="form-control form-control-sm" type="text" value={filterOrg} onChange={e => { setFilterOrg(e.target.value); }} />
      </div>
    </div>
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label">Sertifikatın növü (peşəkar, iştirak)</label>
      <div className="col-sm-2">
      <select className="form-select form-select-sm" aria-label=".form-select-sm example" value={filterType} onChange={e => { setFilterType(e.target.value); }}>
        <option value="">Hamısı</option>
        <option value="professional">Peşakar</option>
        <option value="participation">İştirak</option>
      </select>
      </div>
    </div>
    <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Sertifikatın alınma tarixi</label>
        <div className="col-sm-2">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startIssueDate}
            onChange={(date) => setStartIssueDate(date)}
            selectsStart
            startDate={startIssueDate}
            endDate={endIssueDate}
            isClearable={true}
          />
        </div>
        <div className="col-sm-2">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endIssueDate}
            onChange={(date) => setEndIssueDate(date)}
            selectsEnd
            startDate={startIssueDate}
            endDate={endIssueDate}
            minDate={startIssueDate}
            isClearable={true}
          />
        </div>
    </div>
    <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Sertifikatın etibarlılıq tarixi</label>
        <div className="col-sm-2">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startValidDate}
            onChange={(date) => setStartValidDate(date)}
            selectsStart
            startDate={startValidDate}
            endDate={endValidDate}
            isClearable={true}
          />
        </div>
        <div className="col-sm-2">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endValidDate}
            onChange={(date) => setEndValidDate(date)}
            selectsEnd
            startDate={startValidDate}
            endDate={endValidDate}
            minDate={startValidDate}
            isClearable={true}
          />
        </div>
    </div>
  </div>
}
function App() {
  const [
    ticket,
    auth,
    getAllData,
    allData,
    clear,
    setAddNewCertificationModal
  ] = useStore(getState, shallow);

  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);


  const getFromDB = useCallback (async () => {
    await auth(); 
    getAllDataFromDB();  
  }, [ticket]);

  useEffect(() => {
    getFromDB();
  }, [])

  const handleFilter = params => {
    const d = allData.filter(
      item => {
        const issueDate = new Date(item.CERTIFICATION_ISSUEDATE);
        const validDate = new Date(item.CERTIFICATION_VALIDDATE);
        var res = (!params.filterName || item.CERTIFICATION_NAME.toLowerCase().includes(params.filterName.toLowerCase())) &&
        (!params.filterOrg || item.CERTIFICATION_ORG.toLowerCase().includes(params.filterOrg.toLowerCase())) &&
        (!params.filterType || item.CERTIFICATION_TYPE.toLowerCase().includes(params.filterType.toLowerCase())) &&
        ((!params.startIssueDate && !params.endIssueDate) || 
        (!params.endIssueDate && issueDate && issueDate >= params.startIssueDate) || 
        (!params.startIssueDate && issueDate && issueDate <= params.endIssueDate) ||
        (issueDate >= params.startIssueDate && issueDate <= params.endIssueDate)) &&
        ((!params.startValidDate && !params.endValidDate) || 
        (!params.endValidDate && validDate && validDate >= params.startValidDate) || 
        (!params.startValidDate && validDate && validDate <= params.endValidDate) ||
        (validDate >= params.startValidDate && validDate <= params.endValidDate));
        return res;
      }
    );
    setFilteredItems(d);
  }

  const getAllDataFromDB = async () => {
    const res = await getAllData();
    
    setFilteredItems(res);
    setShowTable(true);
  }
  const [showTable, setShowTable] = useState(true);
  const showForm = () => {
    setAddNewCertificationModal(true);
    clear();
  }
  const handleFinish = async () => {
    setAddNewCertificationModal(false);
    clear();
    await getAllDataFromDB();
  }
  const customStyles = {
    table: {
      style: {
        backgroundColor: '#f7f8f8',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#f7f8f8'
      }
    },
    headRow: {
      style: {
        backgroundColor: '#f7f8f8',
      },
    },
    subHeader: {
      style: {
        backgroundColor: '#f7f8f8',
      },
    },
};
const filterArgs = {
  filter: handleFilter
}
  return (
      <div className="container-fluid">
        <div className="row mt-2">
          <h1>Sertifikatlar</h1>
        </div>
        <div className="row mt-4">
          <div className="col-sm-12">
            <AddNewCertificate onFinish={handleFinish} onClose={showForm} /> 
            <FiltersComponent {...filterArgs} />
            {
              showTable ? <MainTable
                  columns={columns}
                  data={filteredItems}
                  selectableRows
                  highlightOnHover
                  striped
                  pointerOnHover
                  dense
                  pagination
                  responsive
                  customStyles={customStyles}
                  subHeader
                  subHeaderAlign={'right'}
                  subHeaderComponent={<button className="btn btn-primary" onClick={showForm}>{<span><i className="fas fa-plus"></i></span>}</button> }
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
