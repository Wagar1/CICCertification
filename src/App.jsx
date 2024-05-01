import { useEffect, useState, useMemo } from "react";
import "./App.css";
import AddNewCertificate from "./feautures/AddNewCertificate";
import shallow from "zustand/shallow";
import useStore from "./stores/useStore";
import { useCallback } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import moment from "moment";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import * as excelJS from "exceljs";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

const getState = (state) => [
  state.ticket,
  state.auth,
  state.getAllData,
  state.allData,
  state.clear,
  state.setAddNewCertificationModal,
  state.deleteCertification,
  state.deleteFile,
  state.certificationName,
  state.setCertificationName,
  state.setCertificationOrg,
  state.setCertificationIssuedDate,
  state.setCertificationUserId,
  state.setCertificationUserFullName,
  state.setCertificationValidDate,
  state.setCertificationType,
  state.setCertificationId,
  state.setUpdateModal,
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

const FiltersComponent = (props) => {
  const [filterUserName, setFilterUserName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterOrg, setFilterOrg] = useState("");
  const [filterType, setFilterType] = useState("default");
  const [startIssueDate, setStartIssueDate] = useState(null);
  const [endIssueDate, setEndIssueDate] = useState(null);
  const [startValidDate, setStartValidDate] = useState(null);
  const [endValidDate, setEndValidDate] = useState(null);
  useEffect(() => {
    props.filter({
      filterUserName,
      filterName,
      filterOrg,
      filterType,
      startIssueDate,
      endIssueDate,
      startValidDate,
      endValidDate,
    });
  }, [
    filterUserName,
    filterName,
    filterOrg,
    filterType,
    startIssueDate,
    endIssueDate,
    startValidDate,
    endValidDate,
  ]);

  return (
    <Container fluid>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column="sm" sm={2}>
          <b>Əməkdaş</b>
        </Form.Label>
        <Col sm={2}>
          <Form.Control
            type="text"
            size="sm"
            value={filterUserName}
            onChange={(e) => {
              setFilterUserName(e.target.value);
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column="sm" sm={2}>
          <b>Sertifikatın adı</b>
        </Form.Label>
        <Col sm={2}>
          <Form.Control
            type="text"
            size="sm"
            value={filterName}
            onChange={(e) => {
              setFilterName(e.target.value);
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column="sm" sm={2}>
          <b>Sertifikatı verən təşkilat</b>
        </Form.Label>
        <Col sm={2}>
          <Form.Control
            type="text"
            size="sm"
            value={filterOrg}
            onChange={(e) => {
              setFilterOrg(e.target.value);
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column="sm" sm={2}>
          <b>Sertifikatın növü</b>
        </Form.Label>
        <Col sm={2}>
          <Form.Select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
            defaultValue="default"
            size="sm"
          >
            <option selected={true} value="default" disabled={true}>
              Seçin
            </option>
            <option value="">Hamsı</option>
            <option selected value="professional">
              Peşakar
            </option>
            <option value="participation">Təlimdə iştirak</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column="sm" sm={2}>
          <b>Sertifikatın alınma tarixi</b>
        </Form.Label>
        <Col sm={2}>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startIssueDate}
            onChange={(date) => setStartIssueDate(date)}
            selectsStart
            startDate={startIssueDate}
            endDate={endIssueDate}
            isClearable={true}
            customInput={<Form.Control type="text" size="sm" />}
          />
        </Col>
        <Col sm={2}>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endIssueDate}
            onChange={(date) => setEndIssueDate(date)}
            selectsEnd
            startDate={startIssueDate}
            endDate={endIssueDate}
            minDate={startIssueDate}
            isClearable={true}
            customInput={<Form.Control type="text" size="sm" />}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column="sm" sm={2}>
          <b>Sertifikatın etibarlılıq tarixi</b>
        </Form.Label>
        <Col sm={2}>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startValidDate}
            onChange={(date) => setStartValidDate(date)}
            selectsStart
            startDate={startValidDate}
            endDate={endValidDate}
            isClearable={true}
            customInput={<Form.Control type="text" size="sm" />}
          />
        </Col>
        <Col sm={2}>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endValidDate}
            onChange={(date) => setEndValidDate(date)}
            selectsEnd
            startDate={startValidDate}
            endDate={endValidDate}
            minDate={startValidDate}
            isClearable={true}
            customInput={<Form.Control type="text" size="sm" />}
          />
        </Col>
      </Form.Group>
    </Container>
  );
};
function App() {
  const [
    ticket,
    auth,
    getAllData,
    allData,
    clear,
    setAddNewCertificationModal,
    deleteCertification,
    deleteFile,
    certificationName,
    setCertificationName,
    setCertificationOrg,
    setCertificationIssuedDate,
    setCertificationUserId,
    setCertificationUserFullName,
    setCertificationValidDate,
    setCertificationType,
    setCertificationId,
    setUpdateModal,
  ] = useStore(getState, shallow);

  const [filterText, setFilterText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const onDelete = async (userFullName, seq, fileId) => {
    Swal.fire({
      title: `Are you sure to delete data of ${userFullName}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCertification(seq);
        await deleteFile(fileId);
        clear();
        await getAllDataFromDB();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const onEdit = (seq) => {
    const element = allData.find((x) => x.SEQ === seq);
    setCertificationName(element.CERTIFICATION_NAME);
    setCertificationOrg(element.CERTIFICATION_ORG);
    const issueDate = new Date(element.CERTIFICATION_ISSUEDATE);
    setCertificationIssuedDate(issueDate);
    const validDate =
      element.CERTIFICATION_VALIDDATE !== "?"
        ? new Date(element.CERTIFICATION_VALIDDATE)
        : "";
    setCertificationValidDate(validDate);
    setCertificationUserId(element.CERTIFICATION_USERID);
    setCertificationUserFullName(element.CERTIFICATION_USERFULLNAME);
    setCertificationType(element.CERTIFICATION_TYPE);
    setCertificationId(element.CERTIFICATION_ID);
    setUpdateModal(true);
    setAddNewCertificationModal(true);
  };
  const columns = [
    {
      name: "#",
      width: "70px",
      selector: (row, index) => index + 1,
    },
    {
      name: "Action",
      width: "150px",
      selector: (row) => (
        <div style={{ display: "flex" }}>
          <button className="btn" onClick={() => onEdit(row.SEQ)}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button
            className="btn"
            onClick={() =>
              onDelete(
                row.CERTIFICATION_USERFULLNAME,
                row.SEQ,
                row.CERTIFICATION_FILE_ID
              )
            }
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      ),
    },
    {
      name: "Əməkdaş",
      width: "200px",
      selector: (row) => row.CERTIFICATION_USERFULLNAME,
      sortable: true,
    },
    {
      name: "Sertifikatın adı",
      width: "450px",
      selector: (row) => row.CERTIFICATION_NAME,
      sortable: true,
    },
    {
      name: "Sertifikatı verən təşkilat",
      width: "200px",
      selector: (row) => row.CERTIFICATION_ORG,
      sortable: true,
    },
    {
      name: "Sertifikatın növü",
      selector: (row) =>
        row.CERTIFICATION_TYPE == "professional"
          ? "Peşakar"
          : "Təlimdə iştirak",
      sortable: true,
    },
    {
      name: "Sertifikatın alınma tarixi",
      selector: (row) =>
        moment(row.CERTIFICATION_ISSUEDATE).format("DD/MM/yyyy"),
    },
    {
      name: "Sertifikatın etibarlılıq tarixi",
      selector: (row) =>
        row.CERTIFICATION_VALIDDATE !== "?"
          ? moment(row.CERTIFICATION_VALIDDATE).format("DD/MM/yyyy")
          : "",
    },
    {
      name: "Sertifikat faylı",
      width: "500px",
      selector: (row) => (
        <div style={{ display: "flex" }}>
          {" "}
          <div
            dangerouslySetInnerHTML={{ __html: row.CERTIFICATION_FILE_GIF }}
          />
          <a
            href={row.CERTIFICATION_FILE_BROWSE}
            target="_blank"
            alt="certification_file_link"
          >
            {row.CERTIFICATION_NAME}
          </a>
          <div
            dangerouslySetInnerHTML={{ __html: row.CERTIFICATION_FILE_FUNC }}
          />
        </div>
      ),
    },
  ];

  const getFromDB = useCallback(async () => {
    await auth();
    getAllDataFromDB();
  }, [ticket]);

  useEffect(() => {
    getFromDB();
  }, []);

  const handleFilter = (params) => {
    const d = allData.filter((item) => {
      const issueDate = new Date(item.CERTIFICATION_ISSUEDATE);
      const validDate = new Date(item.CERTIFICATION_VALIDDATE);
      var res =
        (!params.filterUserName ||
          item.CERTIFICATION_USERFULLNAME.toLowerCase().includes(
            params.filterUserName.toLowerCase()
          )) &&
        (!params.filterName ||
          item.CERTIFICATION_NAME.toLowerCase().includes(
            params.filterName.toLowerCase()
          )) &&
        (!params.filterOrg ||
          item.CERTIFICATION_ORG.toLowerCase().includes(
            params.filterOrg.toLowerCase()
          )) &&
        (!params.filterType ||
          item.CERTIFICATION_TYPE.toLowerCase().includes(
            params.filterType.toLowerCase()
          )) &&
        ((!params.startIssueDate && !params.endIssueDate) ||
          (!params.endIssueDate &&
            issueDate &&
            issueDate >= params.startIssueDate) ||
          (!params.startIssueDate &&
            issueDate &&
            issueDate <= params.endIssueDate) ||
          (issueDate >= params.startIssueDate &&
            issueDate <= params.endIssueDate)) &&
        ((!params.startValidDate && !params.endValidDate) ||
          (!params.endValidDate &&
            validDate &&
            validDate >= params.startValidDate) ||
          (!params.startValidDate &&
            validDate &&
            validDate <= params.endValidDate) ||
          (validDate >= params.startValidDate &&
            validDate <= params.endValidDate));
      return res;
    });
    setFilteredItems(d);
  };

  const getAllDataFromDB = async () => {
    const res = await getAllData();

    setFilteredItems(res);
    setShowTable(true);
  };
  const [showTable, setShowTable] = useState(true);
  const showForm = () => {
    setAddNewCertificationModal(true);
    clear();
  };
  const handleFinish = async () => {
    setAddNewCertificationModal(false);
    clear();
    await getAllDataFromDB();
  };
  const customStyles = {
    table: {
      style: {
        backgroundColor: "#f7f8f8",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#f7f8f8",
      },
    },
    headRow: {
      style: {
        background:
          "linear-gradient(0deg, rgb(194, 219, 231) 40%, rgb(220, 236, 248) 90%)",
      },
    },
    subHeader: {
      style: {
        backgroundColor: "#f7f8f8",
      },
    },
  };
  const filterArgs = {
    filter: handleFilter,
  };

  useEffect(() => {}, []);

  const exportToExcel = () => {
    const workbook = new excelJS.Workbook();
    workbook.created = new Date();
    workbook.modified = new Date();
    let sheet = workbook.addWorksheet("Sertifikatlar");
    sheet.columns = [
      { key: "user", width: 30 },
      { key: "userDep", width: 30 },
      { key: "userPro", width: 30 },
      { key: "name", width: 30 },
      { key: "org", width: 50 },
      { key: "type", width: 30 },
      { key: "issueDate", width: 50 },
      { key: "validDate", width: 50 },
    ];
    const headers = [
      "Əməkdaş",
      "Əməkdaşın çalışdığı departament",
      "Əməkdaşın tutduğu vəzifə",
      "Sertifikatın adı",
      "Sertifikatı verən təşkilat",
      "Sertifikatın növü",
      "Sertifikatın alınma tarixi",
      "Sertifikatın etibarlılıq tarixi",
    ];
    const headerRow = sheet.addRow(headers);
    headerRow.font = { bold: true, size: 18 };
    for (let index = 0; index < allData.length; index++) {
      const element = allData[index];
      const elRow = {
        user: element.CERTIFICATION_USERFULLNAME
          ? element.CERTIFICATION_USERFULLNAME
          : "",
        userDep: element.CERTIFICATION_USERMAINGROUP
          ? element.CERTIFICATION_USERMAINGROUP
          : "",
        userPro: element.CERTIFICATION_USERTITLE
          ? element.CERTIFICATION_USERTITLE
          : "",
        name: element.CERTIFICATION_NAME ? element.CERTIFICATION_NAME : "",
        org: element.CERTIFICATION_ORG ? element.CERTIFICATION_ORG : "",
        type: element.CERTIFICATION_TYPE
          ? element.CERTIFICATION_TYPE == "professional"
            ? "Peşakar"
            : "Təlimdə iştirak"
          : "",
        issueDate: element.CERTIFICATION_ISSUEDATE
          ? moment(new Date(element.CERTIFICATION_ISSUEDATE)).format(
              "DD/MM/YYYY"
            )
          : "",
        validDate: element.CERTIFICATION_VALIDDATE
          ? moment(new Date(element.CERTIFICATION_VALIDDATE)).format(
              "DD/MM/YYYY"
            )
          : "",
      };
      sheet.addRow(elRow);
    }
    workbook.xlsx.writeBuffer().then(function (buffer) {
      const blob = new Blob([buffer], { type: "applicationi/xlsx" });
      saveAs(blob, "müraciətlər.xlsx");
    });
  };
  return (
    <div className="container-fluid">
      <div className="row mt-2" style={{ textAlign: "center" }}>
        <h1>
          <img src={window.logoUrl} width={"50px"} height={"50px"} alt="logo" />{" "}
          Sertifikatlar
        </h1>
      </div>
      <div className="row mt-4">
        <div className="col-sm-12">
          <AddNewCertificate onFinish={handleFinish} onClose={showForm} />
          <FiltersComponent {...filterArgs} />
          {showTable ? (
            <MainTable
              columns={columns}
              data={filteredItems}
              highlightOnHover
              pointerOnHover
              dense
              responsive
              customStyles={customStyles}
              subHeader
              subHeaderAlign={"right"}
              subHeaderComponent={
                <div style={{ display: "flex" }}>
                  {window.canModify ? (
                    <>
                      <button
                        className="btn btn-secondary"
                        style={{ marginRight: "10px" }}
                        onClick={exportToExcel}
                      >
                        {<span>Export</span>}
                      </button>

                      <button className="btn btn-primary" onClick={showForm}>
                        {
                          <span>
                            <i className="fas fa-plus"></i>
                          </span>
                        }
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              }
            />
          ) : (
            <></>
          )}
        </div>
        <div className="col-sm-6"></div>
      </div>
    </div>
  );
}

export default App;
