import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddNewCertificate = () => {
    const [sertificationFile, setSertificationFile] = useState();
    const [sertificationName, setSertificationName] = useState();
    const [sertificationOrg, setSertificationOrg] = useState();
    const [sertificationIssuedDate, setSertificationIssuedDate] = useState();
    const [sertificationValidDate, setSertificationValidDate] = useState();
    const [sertificationType, setSertificationType] = useState('professional');

    return (
        <>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikat faylı</label>
              <div className="col-sm-8">
                <input className="form-control form-control-sm" type="file" value={sertificationFile} onChange={e => setSertificationFile(e.target.value)} />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikatın adı</label>
              <div className="col-sm-8">
                <input type="text" className="form-control form-control-sm" value={sertificationName} onChange={e => setSertificationName(e.target.value)} />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikatı verən təşkilat</label>
              <div className="col-sm-8">
                <input type="text" className="form-control form-control-sm" value={sertificationOrg} onChange={e => setSertificationOrg(e.target.value)} />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikatın alınma tarixi</label>
              <div className="col-sm-8">
                <DatePicker selected={sertificationIssuedDate} onChange={(date) => setSertificationIssuedDate(date)} />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikatın etibarlılıq tarixi</label>
              <div className="col-sm-8">
                <DatePicker selected={sertificationValidDate} onChange={(date) => setSertificationValidDate(date)} />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikatın növü (peşəkar, iştirak)</label>
              <div className="col-sm-8">
              <select className="form-select form-select-sm" aria-label=".form-select-sm example" value={sertificationType} onChange={e => setSertificationType(e.target.value)}>
                <option disabled={true}>Seçin</option>
                <option value="professional">Peşakar</option>
                <option value="participation">İştirak</option>
              </select>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-2">
                <button type="button" className="btn btn-success">Əlavə et</button>
              </div>
            </div>
        </>
    )
}

export default AddNewCertificate;