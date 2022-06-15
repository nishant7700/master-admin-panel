import React, { useState, useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { useHistory } from "react-router-dom";
import AddForm from "../../components/common/AddForm";
import { convertToFormData } from "../../shared/upload";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from "../../shared/enums/clients_enum";
import {
  useCreateClient,
  useGetDropdownOptions,
} from "../../shared/hooks/UseClient";
// import { useSelectAllClient } from "../../shared/hooks/UseClient";

const AddClient = ({}) => {
  let history = useHistory();
  const [client, addData] = useCreateClient();
  const { add_client_loading } = client;
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState(null);

  const submitFormClicked = async (values) => {
    const data = await convertToFormData({ values, featuredImage });
    await addData(data);
    history.push(`/${LINK_URL}`);
  };

  const [dropdownOptions, setClientSearchField, setClientSearchValue] =
    useGetDropdownOptions();
  const loadOptions = async (inputValue, callback, field) => {
    if (field == "client") {
      await setClientSearchField("name");
      await setClientSearchValue(inputValue);
      callback(dropdownOptions.client);
    }
  };

  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title={`Add ${PAGE_SINGLE_TITLE}`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink="Add"
        />
      </div>
      <div className="container-fluid">
        <div className="col-lg-9">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title"> {PAGE_SINGLE_TITLE} </h4>
              <p className="card-title-desc">
                Enter Details to add {PAGE_SINGLE_TITLE}
              </p>
            </div>
            <AddForm
              edit={false}
              featuredImage={featuredImage}
              gallery={gallery}
              setFeaturedImage={setFeaturedImage}
              setGallery={setGallery}
              submitForm={submitFormClicked}
              inputFields={inputFields}
              initialValues={initialValues}
              dropdown_options={dropdownOptions}
              loading={add_client_loading}
              loadOptions={loadOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
