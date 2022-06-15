import React, { useState, useEffect } from 'react'
import AddForm from '../common/AddForm'
import Modal from 'react-modal';
import { useHistory } from "react-router-dom";
import {
  inputFields,
  initialValues,
  view_all_table,
  LINK_URL
} from "../../shared/enums/leadcomments_enum";
import { useCreateLeadcomment } from "../../shared/hooks/UseLeadcomment"
import { useLeadcommentsByLead, useSingleLead, useLeadcallbacksByLead } from "../../shared/hooks/UseLead";
import DataTable from "../../components/common/DataTable";


function LeadCommentModal({ match, leadcomments, leadcomment_loading }) {
  let history = useHistory();
  const [dropdownOptions, setDropdownOptions] = useState({});

  const [addData] = useCreateLeadcomment();
  const [leadcommentsByLead, reloadLeadComments] = useLeadcommentsByLead(match.params.id);
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
    values.lead = match.params.id;
    await addData(values);
    reloadLeadComments(Math.random(100))
    closeModal();
  };

  return (
    <div className="card">
      <div className="card-header">
        <button className="btn btn-light waves-effect waves-light" onClick={openModal}>
          <i className="fa fa-plus me-1" /> Add Comment
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
          <div className="container-fluid">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">  Add Comment </h4>
                  <button onClick={closeModal} className="btn btn-sm btn-secondary align-self-right"> X </button>
                  <p className="card-title-desc">
                    Enter Details to add Comment
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
        <div className="card-title">Lead Comments</div>
      </div>
      <div className="card-body">
        <DataTable
          keys={view_all_table}
          data={leadcomments}
          field={LINK_URL}
          page={1}
          loading={leadcomment_loading}
        />
      </div>
    </div>
  )
}

export default LeadCommentModal