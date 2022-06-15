import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import EditorWYSIWYG from "../EditorWYSIWYG";
import * as Yup from "yup";
import { CheckBox, SelectBox, TextArea, TextInput } from "../Form/Form";
import slugify from "react-slugify";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
function FormComponents({
  formik,
  inputFields,
  setFeaturedImage,
  dropdown_options,
  setGallery,
  edit,
  loadOptions,
}) {
  // console.log(typeof loadSelectOptions);
  let history = useHistory();
  const [imagePicked, setImagePicked] = useState(null);
  const pickImage = ({ field, value }) => {
    console.log("CALLING", field);
    let imagesCollection = imagePicked ? imagePicked : {};
    imagesCollection[field] = value;
    console.log("FILES", imagesCollection);
    setImagePicked(imagesCollection);
    setFeaturedImage(imagesCollection);
  };

  console.log("Formik,", formik);
  return (
    <Form autoComplete={"off"}>
      <div className="row">
        {inputFields &&
          Object.keys(inputFields) &&
          Object.keys(inputFields).map((item, index) => {
            if (
              inputFields[item] &&
              !inputFields[item].hideOnEntry &&
              inputFields[item].type === "string"
            ) {
              return (
                <div className="col-md-6" key={`input-${index}`}>
                  <TextInput
                    label={inputFields[item].title}
                    name={item}
                    type={
                      inputFields[item].inputType
                        ? inputFields[item].inputType
                        : "text"
                    }
                    onChange={(e) => {
                      formik.setFieldValue(item, e.target.value);
                      if (inputFields[item].slug) {
                        formik.setFieldValue("slug", slugify(e.target.value));
                      }
                    }}
                  />
                </div>
              );
            }
            if (inputFields[item] && inputFields[item].type === "divider") {
              return (
                <div className="col-md-12" key={`input-${index}`}>
                  <div className="p-2 mt-2 mb-2 bg-light">
                    <p className="font-weight-bold">
                      {" "}
                      {inputFields[item].title}{" "}
                    </p>
                  </div>
                </div>
              );
            }
            if (inputFields[item] && inputFields[item].type === "text") {
              return (
                <div className="col-md-6">
                  <TextArea label={inputFields[item].title} name={item} />
                </div>
              );
            }
            if (
              inputFields[item] &&
              !inputFields[item].hideOnEntry &&
              inputFields[item].type === "related"
            ) {
              return (
                <div className="col-md-6">
                  <SelectBox
                    label={inputFields[item].title}
                    name={item}
                    multiple={inputFields[item].multiple ? true : false}
                  >
                    <option value="">
                      {/* Select {inputFields[item].title} */}
                      --None--
                    </option>
                    {dropdown_options &&
                      dropdown_options[item] &&
                      dropdown_options[item].map((option) => {
                        return (
                          <option value={option.value}>{option.label}</option>
                        );
                      })}
                  </SelectBox>
                </div>
              );
            }
            if (inputFields[item] && inputFields[item].type === "related-2") {
              return (
                <div className="col-md-6">
                  <label> {inputFields[item].title} </label>

                  <AsyncSelect
                    loadOptions={(inputValue, callback) =>
                      loadOptions(inputValue, callback, item)
                    }
                    defaultOptions={dropdown_options && dropdown_options[item]}
                    onChange={(e) => {
                      if (e) {
                        formik.setFieldValue(item, e.value);
                      }
                    }}
                  />

                  {formik.errors && formik.errors[item] && (
                    <p className="text-danger"> Required </p>
                  )}
                </div>
              );
            }
            if (inputFields[item] && inputFields[item].type === "select") {
              return (
                <div className="col-md-6">
                  <SelectBox
                    label={inputFields[item].title}
                    name={item}
                    multiple={inputFields[item].multiple ? true : false}
                  >
                    <option value="">
                      {/* Select {inputFields[item].title} */}
                      --None--
                    </option>
                    {inputFields[item] &&
                      inputFields[item].options &&
                      inputFields[item].options.map((option) => {
                        return <option value={option}>{option}</option>;
                      })}
                  </SelectBox>
                </div>
              );
            }
            if (inputFields[item] && inputFields[item].type === "checkbox") {
              return (
                <div className="col-md-6">
                  <CheckBox name={item}>{inputFields[item].title}</CheckBox>
                </div>
              );
            }
            if (inputFields[item] && inputFields[item].type === "html") {
              return (
                <div className="col-md-12">
                  <div className="form-group">
                    <label> {inputFields[item].title} </label>
                    <EditorWYSIWYG
                      value={formik.values[item] ? formik.values[item] : ""}
                      name={item}
                      changeValue={(value) => {
                        formik.setFieldValue(item, value);
                      }}
                    />
                    {formik.errors && formik.errors[item] && (
                      <p className="text-danger"> Required </p>
                    )}
                  </div>
                </div>
              );
            }
            if (inputFields[item] && inputFields[item].type === "file") {
              return (
                <div className="col-md-6">
                  <label> {inputFields[item].title} </label>
                  <br />
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={(e) =>
                      pickImage({ field: item, value: e.target.files[0] })
                    }
                  />
                </div>
              );
            }
            if (inputFields[item] && inputFields[item].type === "gallery") {
              return (
                <div className="col-md-6">
                  <label> {inputFields[item].title} </label>
                  <br />
                  <input
                    type="file"
                    multiple
                    className="form-control-file"
                    onChange={(e) =>
                      pickImage({ field: item, value: e.target.files })
                    }
                  />
                </div>
              );
            }
            if (inputFields[item] && inputFields[item].type === "slug") {
              return (
                <div className="col-md-6">
                  <TextInput
                    label={inputFields[item].title}
                    name={item}
                    type="text"
                    onChange={(e) => {
                      formik.setFieldValue(item, slugify(e.target.value));
                    }}
                  />
                </div>
              );
            }
          })}
      </div>

      <div className="row">
        <div className="col-md-12 text-center m-3">
          <button type="submit" className="btn btn-success">
            {formik.isSubmitting ? "Processing..." : edit ? "Edit" : "Save"}
          </button>
          <a
            className="btn btn-secondary m-3"
            onClick={history.goBack}
            href="#goback"
          >
            <i className="fa fa-angle-left"></i> Go Back
          </a>
        </div>
      </div>
    </Form>
  );
}

export default FormComponents;
