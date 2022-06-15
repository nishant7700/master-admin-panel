import React, { useState, useEffect } from 'react'
import AddForm from '../common/AddForm'
import Modal from 'react-modal';
import { useHistory } from "react-router-dom";
import {
    inputFields,
    initialValues,
    view_all_table,
    LINK_URL
} from "../../shared/enums/appointments_enum";
import { useCreateAppointment } from "../../shared/hooks/UseAppointment"
import { useAppointmentsByPatient, useSinglePatient, } from "../../shared/hooks/UsePatient";
import DataTable from "../../components/common/DataTable";


function PatientAppointmentModal({ match, appointments, appointment_loading }) {
    let history = useHistory();
    const [dropdownOptions, setDropdownOptions] = useState({});

    const [addData] = useCreateAppointment();
    const [reloadAppointments] = useAppointmentsByPatient(match.params.id);
    const [Togglebutton, setTogglebutton] = useState(false);

    const triggerToggle = () => {
        setTogglebutton(!Togglebutton)
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            width: "80%",
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: "none",
            zIndex: 999
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const submitFormClicked = async (values) => {
        values.patient = match.params.id;
        await addData(values);
        reloadAppointments(Math.random(100))
        closeModal();
    };

    return (
        <div className="card">
            <div className="card-header">
                <button className="btn btn-light waves-effect waves-light" onClick={openModal}>
                    <i className="fa fa-plus me-1" /> Add Appointment
                </button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="PatientAppointment Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                    <div className="container-fluid">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">  Add Appointment </h4>
                                    <button onClick={closeModal} className="btn btn-sm btn-secondary align-self-right"> X </button>
                                    <p className="card-title-desc">
                                        Enter Details to add Appointment
                                    </p>
                                </div>
                                <AddForm
                                    edit={false}
                                    submitForm={submitFormClicked}
                                    inputFields={inputFields}
                                    initialValues={initialValues}
                                    dropdown_options={dropdownOptions}
                                    is_modal={true}
                                    hideBackBtn={true}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className="card-title">Patient Appointment</div>
            </div>
            <div className="card-body">
                <DataTable
                    keys={view_all_table}
                    data={appointments}
                    field={LINK_URL}
                    page={1}
                    loading={appointment_loading}
                />
            </div>
        </div>
    )
}

export default PatientAppointmentModal