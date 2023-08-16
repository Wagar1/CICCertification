import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddNewCertificationComponent = props => {
    return (
        <div className="modal fade" id="addNewCertificateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">Yeni sertifikat əlavə et</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
              </div>
              <div class="modal-body">
                <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikat faylı</label>
              <div className="col-sm-8">
                <input className="form-control form-control-sm" type="file" onChange={props.onChangeFile} />
              </div>
                </div>
                <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikatın adı</label>
              <div className="col-sm-8">
                <input type="text" className="form-control form-control-sm" value={props.certificationName} onChange={e => props.setCertificationName(e.target.value)} />
              </div>
                </div>
                <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikatı verən təşkilat</label>
              <div className="col-sm-8">
                <input type="text" className="form-control form-control-sm" value={props.certificationOrg} onChange={e => props.setCertificationOrg(e.target.value)} />
              </div>
                </div>
                <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikatın alınma tarixi</label>
              <div className="col-sm-8">
                <DatePicker
                      dateFormat="dd/MM/yyyy"
                      renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                        <div
                          style={{
                            margin: 10,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                {"<"}
                              </button>
                              <select
                                value={date.getFullYear()}
                                onChange={({ target: { value } }) => changeYear(value)}
                              >
                                {props.years.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>

                              <select
                                value={props.months[date.getMonth()]}
                                onChange={({ target: { value } }) =>
                                  changeMonth(props.months.indexOf(value))
                                }
                              >
                                {props.months.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>

                              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                {">"}
                              </button>
                        </div>
                    )}
                  
                  selected={props.certificationIssuedDate}   
                  onChange={(date) => props.setCertificationIssuedDate(date)}
                  isClearable
                />
            </div>
                </div>
                <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikatın etibarlılıq tarixi</label>
              <div className="col-sm-8">
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                      }) => (
                      <div
                        style={{
                          margin: 10,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                              {"<"}
                            </button>
                            <select
                              value={date.getFullYear()}
                              onChange={({ target: { value } }) => changeYear(value)}
                            >
                              {props.years.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <select
                              value={props.months[date.getMonth()]}
                              onChange={({ target: { value } }) =>
                                changeMonth(props.months.indexOf(value))
                              }
                            >
                              {props.months.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                              {">"}
                            </button>
                      </div>
                    )}
                  
                  selected={props.certificationValidDate}   
                    onChange={(date) => props.setCertificationValidDate(date)}
                    isClearable
                />
              </div>
                </div>
                <div className="mb-3 row">
              <label className="col-sm-4 col-form-label">Sertifikatın növü (peşəkar, iştirak)</label>
              <div className="col-sm-8">
              <select className="form-select form-select-sm" aria-label=".form-select-sm example" 
              value={props.certificationType} onChange={e => props.setCertificationType(e.target.value)}>
                <option disabled={true}>Seçin</option>
                <option value="professional">Peşakar</option>
                <option value="participation">İştirak</option>
              </select>
              </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.onClose}>Bağla</button>
                <button type="button" className="btn btn-primary"  onClick={props.onSave}>Əlavə et</button>
              </div>
            </div>
          </div>
        </div>
    )
};

export default AddNewCertificationComponent;