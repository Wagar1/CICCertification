import { useEffect, useState, useCallback } from "react";
import AddNewCertificationComponent from "./AddNewCertificationComponent";
import useStore from "../stores/useStore";
import { shallow } from "zustand/shallow";

function range(start, end, step) {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

const getState = state => [
  state.createCertification,
  state.addCertificationCategory,
  state.certificationFile,
  state.setCertificationFile,
  state.certificationName,
  state.setCertificationName,
  state.certificationOrg,
  state.setCertificationOrg,
  state.certificationIssuedDate,
  state.setCertificationIssuedDate,
  state.certificationValidDate,
  state.setCertificationValidDate,
  state.certificationType, 
  state.setCertificationType,
  state.addToDB,
  state.getAllData,
  state.addNewCertificationModal,
  state.setAddNewCertificationModal,
  state.clear,
  state.certificationUserId,
  state.setCertificationUserId,
  state.certificationUserFullName,
  state.setCertificationUserFullName
];

const initialErrorMessages = [
  { id : 0, value: false, for: 'certificationFile' },
  { id : 1, value: false, for: 'certificationName' },
  { id : 2, value: false, for: 'certificationOrg' },
  { id : 3, value: false, for: 'certificationIssuedDate' },
  { id : 4, value: false, for: 'certificationType' }
];

const AddNewCertificate = props => {
    
    const [
      createCertification,
      addCertificationCategory,
      certificationFile,
      setCertificationFile,
      certificationName,
      setCertificationName,
      certificationOrg,
      setCertificationOrg,
      certificationIssuedDate,
      setCertificationIssuedDate,
      certificationValidDate,
      setCertificationValidDate,
      certificationType, 
      setCertificationType,
      addToDB,
      getAllData,
      addNewCertificationModal,
      setAddNewCertificationModal,
      clear,
      certificationUserId,
      setCertificationUserId,
      certificationUserFullName,
      setCertificationUserFullName
    ] = useStore(getState, shallow);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [errorMessages, setErrorMessages] = useState(initialErrorMessages);

    const years = range(1990, new Date().getFullYear() + 1, 1);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    
    // useEffect(() => {
    //   // Loging for debugging
    //   console.log(certificationFile);
    //   console.log(certificationName);
    //   console.log(certificationOrg);
    //   console.log(certificationIssuedDate);
    //   console.log(certificationValidDate);
    //   console.log(certificationType);
      
    // }, [certificationFile, certificationName,
    // certificationOrg, certificationIssuedDate,
    // certificationValidDate, certificationType]);

    useEffect(()=>{
      setErrorMessages(initialErrorMessages);
      setIsLoading(false);
      setIsError(false);
      clear();
    }, [addNewCertificationModal])

    useEffect(()=>{
      console.log(errorMessages);
    }, [errorMessages]);

    const isValid = () => {
      const messages = JSON.parse(JSON.stringify(errorMessages))
      if(!certificationName) messages[1].value = true;
      if(!certificationOrg) messages[2].value = true;
      if(!certificationIssuedDate) messages[3].value = true;
      if(!certificationType) messages[4].value = true;
      setErrorMessages(messages);
      if(!certificationName || !certificationOrg || !certificationIssuedDate || !certificationType) return false;
      else return true;
    }

    const handleSave = async (data) => {
      if(!isValid()) {
        return;
      };
      setIsLoading(true);
      try{
        const resultId = await createCertification({
          parentId: 1377429,
          certificationFile
        });
        await addCertificationCategory({docId: resultId});
        await addToDB();
        await getAllData();       
        props.onFinish();
      }catch(error){
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    }

      const handleChangeFile = e => {
        const selectedFile = e.target.files[0];
        setCertificationFile(selectedFile);
      }

    const handleClose = () => {
      props.onClose();
    }

      const handleUserSelect = (user, fieldPrefix) => {
        setCertificationUserId(user.userId);
        setCertificationUserFullName(user.userName); 
    }

    const args = {
        setCertificationFile,
        certificationName,
        setCertificationName,
        certificationOrg,
        setCertificationOrg,
        certificationIssuedDate,
        setCertificationIssuedDate,
        certificationValidDate,
        setCertificationValidDate,
        certificationType,
        setCertificationType,
        years,
        months,
        onSave: handleSave,
        onChangeFile: handleChangeFile,
        onClose: handleClose,
        isLoading,
        isError,
        show: addNewCertificationModal,
        onHide: () => setAddNewCertificationModal(false),
        errorMessages,
        onUserSelected: handleUserSelect,
        certificationUserId,
        certificationUserFullName
    }

    return <AddNewCertificationComponent {...args} />
}

export default AddNewCertificate;