import React, { useState } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
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
  useUpdateClient,
  useSingleClient,
  useGetDropdownOptions,
} from "../../shared/hooks/UseClient";
// import { useSelectAllClient } from "../../shared/hooks/UseClient";

const EditClient = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleClient(match.params.id);
  const [updateData] = useUpdateClient();
  const { client_loading, client, edit_client_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);

  const [dropdownOptions] = useGetDropdownOptions();
  const submitFormClicked = async (values) => {
    const data = await convertToFormData({ values, featuredImage });
    await updateData(client._id, data);
    history.push(`/${LINK_URL}/${client._id}/view`);
  };

  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title={`Edit ${PAGE_SINGLE_TITLE}`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink="Edit"
        />
      </div>
      <div className="container-fluid">
        <div className="col-lg-12">
          <div className="card">
            {!client_loading ? (
              client && (
                <div>
                  <div className="card-header">
                    <div>
                      <h4 className="card-title">
                        {client[Object.keys(inputFields)[0]]} -{" "}
                        <span>Edit</span>{" "}
                      </h4>
                      <p className="card-title-desc">
                        <Link
                          to={`/${LINK_URL}`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-angle-left"></i> {PAGE_TITLE}
                        </Link>
                        <Link
                          to={`/${LINK_URL}/${client._id}/view`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <AddForm
                    data={client}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_client_loading}
                  />
                </div>
              )
            ) : (
              <div className="text-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClient;
