import { useEffect, useState, useCallback } from "react";
import AddNewCertificationComponent from "./AddNewCertificationComponent";
import useStore from "../stores/useStore";
import { shallow } from "zustand/shallow";
import { useForm } from 'react-hook-form';

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
  state.getAllData
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
      getAllData
    ] = useStore(getState, shallow);

    const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm();

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

    const handleSave = useCallback(async (data) => {
      setCertificationName(data.certificatename);
      setCertificationOrg(data.certificationOrg);
      setCertificationType(data.certificationType);
      setCertificationIssuedDate(data.certificationIssuedDate);
      const resultId = await createCertification({
        parentId: 1377429,
        certificationFile
      });
      await addCertificationCategory({docId: resultId});
      await addToDB();
      await getAllData();
      props.onFinish();
    }, [certificationName, certificationOrg])

      const handleChangeFile = e => {
        const selectedFile = e.target.files[0];
        setCertificationFile(selectedFile);
      }

    const handleClose = () => {
      props.onClose();
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
        register,
        errors,
        handleSubmit,
        setValue
    }

    return <AddNewCertificationComponent {...args} />
}

export default AddNewCertificate;