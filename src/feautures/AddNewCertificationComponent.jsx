import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ProgressBar } from "react-loader-spinner";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";


const AddNewCertificationComponent = props => {
    return ( <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Yeni sertifikat əlavə et
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { 
              props.isLoading ? <div style={{height: '100%', 
              display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <ProgressBar
                    height="80"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor = '#F4442E'
                    barColor = '#51E5FF'
                  />
              </div> : <Form>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column="sm" sm={4}>
                    <b>Sertifikat faylı</b>
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="file" size="sm" onChange={props.onChangeFile} />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column="sm" sm={4}>
                      <b>Sertifikatın adı</b>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" size="sm"
                      style={{ borderColor: props.errorMessages[1].value ? "red" : "" }}
                      value={props.certificationName} 
                      onChange={e => { props.setCertificationName(e.target.value); }}
                    />
                    {props.errorMessages[1].value ? <span style={{color: 'red'}}>Vacib xana</span> : <></>}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column="sm" sm={4}>
                      <b>Sertifikatı verən təşkilat</b>
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" size="sm"
                      style={{ borderColor: props.errorMessages[2].value ? "red" : "" }}
                      value={props.certificationOrg} 
                      onChange={e => props.setCertificationOrg(e.target.value)}
                    />
                    {props.errorMessages[2].value ? <span style={{color: 'red'}}>Vacib xana</span> : <></>}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column="sm" sm={4}>
                      <b>Sertifikatın alınma tarixi</b>
                  </Form.Label>
                  <Col sm={8}>
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
                      customInput={<Form.Control type="text" size="sm"
                        style={{ borderColor: props.errorMessages[3].value ? "red" : "" }}
                       />}
                      selected={props.certificationIssuedDate}   
                      onChange={(date) => props.setCertificationIssuedDate(date)}
                      isClearable
                    />
                    <div>
                      {props.errorMessages[3].value ? <span style={{color: 'red'}}>Vacib xana</span> : <></>}
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column="sm" sm={4}>
                      <b>Sertifikatın etibarlılıq tarixi</b>
                  </Form.Label>
                  <Col sm={8}>
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
                      customInput={<Form.Control type="text" size="sm" />}
                      selected={props.certificationValidDate}   
                      onChange={(date) => props.setCertificationValidDate(date)}
                      isClearable
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column="sm" sm={4}>
                      <b>Sertifikatın növü (peşəkar, iştirak)</b>
                  </Form.Label>
                  <Col sm={8}>
                  <Form.Select defaultValue="Choose..." size="sm">
                    <option disabled={true} >Seçin</option>
                    <option selected value="professional">Peşakar</option>
                    <option value="participation">İştirak</option>
                  </Form.Select>
                  {props.errorMessages[4].value ? <span style={{color: 'red'}}>Vacib xana</span> : <></>}
                  </Col>
                </Form.Group>
              </Form>
            } 
          </Modal.Body>
          {
            props.isLoading ? <></> : <><Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Cancel</Button>  
                <Button variant="primary" onClick={props.onSave}>Əlavə et</Button> 
              </Modal.Footer>
              { props.isError ? <Alert variant="danger">
              Yadda saxlamada səhv baş verdi
            </Alert>: <></> } </>
          }
        </Modal>        
    )
};

export default AddNewCertificationComponent;