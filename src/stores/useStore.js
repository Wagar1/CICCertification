import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";

const handleAuth = async (set, get) => {
  if (window.location.hostname === "localhost") {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", "vugar.i.eyvazov");
    urlencoded.append("password", "Putin12345");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        window.mainUrl + "/api/v1/auth",
        requestOptions
      );
      const json = await response.json();
      set({
        ticket: json.ticket,
      });
      return json.ticket;
    } catch (error) {
      console.error(error);
    }
  } else {
    set({
      ticket: window.OTCSTicket,
    });
    return window.OTCSTicket;
  }
};

const handleCreateCertification = async (set, get, props) => {
  try {
    const ticket = get().ticket;
    const myHeaders = new Headers();
    myHeaders.append("OTCSTicket", ticket);

    const formData = new FormData();
    formData.append("type", "144");
    formData.append("parent_id", props.parentId);
    formData.append("name", props.certificationFile?.name + "_" + uuidv4());
    formData.append("file", props.certificationFile);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    const response = await fetch(
      window.mainUrl + "/api/v2/nodes",
      requestOptions
    );
    const json = await response.json();
    let id = json.results.data.properties.id;
    return id;
  } catch (error) {
    throw error;
  }
};

const handleAddCertificationCategory = async (set, get, props) => {
  try {
    const ticket = get().ticket;
    const myHeaders = new Headers();
    myHeaders.append("OTCSTicket", ticket);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const certificationId = get().certificationId;
    const url =
      window.mainUrl +
      `/api/v1/nodes/${window.addCertificationCategory}/output?format=json&doc=${props.docId}&value=${certificationId}`;

    const response = await fetch(url, requestOptions);
    console.log("Category was added to the file", response);
  } catch (e) {
    console.error(e);
  }
};

const handleAddToDB = async (set, get, props) => {
  try {
    const ticket = get().ticket;
    const myHeaders = new Headers();
    myHeaders.append("OTCSTicket", ticket);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const certificationId = get().certificationId;
    let currentDate = new Date();
    currentDate = moment(currentDate).format("MM/DD/yyyy");
    const certificationName = get().certificationName;
    const certificationOrg = get().certificationOrg;
    const cIssueDate = get().certificationIssuedDate;

    let certificationIssuedDate = "";
    if (cIssueDate)
      certificationIssuedDate = moment(cIssueDate).format("MM/DD/yyyy");
    let certificationValidDate = "";
    const cValidDate = get().certificationValidDate;
    if (cValidDate)
      certificationValidDate = moment(cValidDate).format("MM/DD/yyyy");

    const certificationType = get().certificationType;
    const certificationUserId = get().certificationUserId;
    const url = `${window.mainUrl}/api/v1/nodes/1395634/output?format=json&cid=${certificationId}&cEnterDate=${currentDate}&cuserid=${certificationUserId}&cname=${certificationName}&corg=${certificationOrg}&issueDate=${certificationIssuedDate}&validDate=${certificationValidDate}&type=${certificationType}&nexturl=https://ecm.caspianic.com/otcs/livelink.exe`;

    const response = await fetch(url, requestOptions);
    console.log("Data was added to DB ", response);
  } catch (e) {
    console.error(e);
  }
};

const handleGetAllData = async (set, get) => {
  try {
    const ticket = get().ticket;
    const myHeaders = new Headers();
    myHeaders.append("OTCSTicket", ticket);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      window.mainUrl + `/api/v1/nodes/1400179/output?format=json`,
      requestOptions
    );
    const json = await response.json();
    let data = JSON.parse(json.data).result;
    data.pop();
    set({ allData: data });
    return data;
  } catch (e) {
    console.error(e);
  }
};

const handleClear = (set, get) => {
  set({
    certificationId: uuidv4(),
    certificationFile: null,
    certificationName: "",
    certificationOrg: "",
    certificationIssuedDate: null,
    certificationValidDate: null,
    certificationType: "",
    certificationUserId: "",
    certificationUserFullName: "",
  });
};

const handleAddNewCertificationModal = (set, get, value) => {
  set({
    addNewCertificationModal: value,
  });
};

const handleCertificationUserId = (set, get, value) => {
  set({
    certificationUserId: value,
  });
};

const handleCertificationUserFullName = (set, get, value) => {
  set({
    certificationUserFullName: value,
  });
};

const handleDeleteCertification = async (set, get, seq) => {
  try {
    const ticket = get().ticket;
    const myHeaders = new Headers();
    myHeaders.append("OTCSTicket", ticket);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      window.mainUrl + `/api/v1/nodes/1557826/output?format=json&seq=${seq}`,
      requestOptions
    );
    let allData = get().allData;
    allData = allData.filter((x) => x.SEQ !== seq);
    set({
      allData,
    });
  } catch (e) {
    console.error(e);
  }
};

const handleDeleteFile = async (set, get, fileId) => {
  try {
    const ticket = get().ticket;
    const myHeaders = new Headers();
    myHeaders.append("OTCSTicket", ticket);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      window.mainUrl + `/api/v1/nodes/${fileId}`,
      requestOptions
    );
  } catch (e) {
    console.error(e);
  }
};

const handleUpdateDB = async (set, get) => {
  try {
    const ticket = get().ticket;
    const myHeaders = new Headers();
    myHeaders.append("OTCSTicket", ticket);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const certificationId = get().certificationId;
    let currentDate = new Date();
    currentDate = moment(currentDate).format("MM/DD/yyyy");
    const certificationName = get().certificationName;
    const certificationOrg = get().certificationOrg;
    const cIssueDate = get().certificationIssuedDate;

    let certificationIssuedDate = "";
    if (cIssueDate)
      certificationIssuedDate = moment(cIssueDate).format("MM/DD/yyyy");
    let certificationValidDate = "";
    const cValidDate = get().certificationValidDate;
    if (cValidDate)
      certificationValidDate = moment(cValidDate).format("MM/DD/yyyy");

    const certificationType = get().certificationType;
    const certificationUserId = get().certificationUserId;
    const allData = get().allData;
    const seq = allData.find((x) => x.CERTIFICATION_ID == certificationId)?.SEQ;
    const url = `${window.mainUrl}/api/v1/nodes/1559421/output?format=json&seq=${seq}&cid=${certificationId}&cEnterDate=${currentDate}&cuserid=${certificationUserId}&cname=${certificationName}&corg=${certificationOrg}&issueDate=${certificationIssuedDate}&validDate=${certificationValidDate}&type=${certificationType}&nexturl=https://ecm.caspianic.com/otcs/livelink.exe`;

    const response = await fetch(url, requestOptions);
    console.log("Data was updated in DB ", response);
  } catch (e) {
    console.error(e);
  }
};

const store = (set, get) => ({
  ticket: "",
  auth: async () => await handleAuth(set, get),
  certificationId: uuidv4(),
  setCertificationId: (certId) => set({ certificationId: certId }),
  createCertification: (files) => handleCreateCertification(set, get, files),
  addCertificationCategory: (props) =>
    handleAddCertificationCategory(set, get, props),
  addToDB: (props) => handleAddToDB(set, get, props),
  certificationFile: null,
  setCertificationFile: (props) => set({ certificationFile: props }),
  certificationName: "",
  setCertificationName: (props) => set({ certificationName: props }),
  certificationOrg: "",
  setCertificationOrg: (props) => set({ certificationOrg: props }),
  certificationIssuedDate: null,
  setCertificationIssuedDate: (props) =>
    set({ certificationIssuedDate: props }),
  certificationValidDate: null,
  setCertificationValidDate: (props) => set({ certificationValidDate: props }),
  certificationType: "",
  setCertificationType: (props) => set({ certificationType: props }),
  allData: [],
  getAllData: () => handleGetAllData(set, get),
  clear: () => handleClear(set, get),
  addNewCertificationModal: false,
  setAddNewCertificationModal: (value) =>
    handleAddNewCertificationModal(set, get, value),
  certificationUserId: "",
  setCertificationUserId: (value) => handleCertificationUserId(set, get, value),
  certificationUserFullName: "",
  setCertificationUserFullName: (value) =>
    handleCertificationUserFullName(set, get, value),
  deleteCertification: (seq) => handleDeleteCertification(set, get, seq),
  deleteFile: (fileId) => handleDeleteFile(set, get, fileId),
  updateModal: false,
  setUpdateModal: (update) => set({ updateModal: update }),
  updateDB: async () => await handleUpdateDB(set, get),
  certificationFileName: "",
  setCertificationFileName: (name) => set({ certificationFileName: name }),
  certificationFileId: "",
  setCertificationId: (fileId) => set({ certificationFileId: fileId }),
});

const useStore = create(devtools(store));

export default useStore;
