import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DoughnutChart from "../../components/charts/DonughtChart";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import Spinner from "../../components/layout/Spinner";

const Dashboard = () => {
  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title="Dashboard"
          mainLinkTitle="Dashboard"
          mainLinkUrl="/dashboard"
          activeLink="Main"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-3">
                  <div className="dashboard-stat pending">
                    <div className="report-title">Pending </div>
                    <div className="report-stat">-</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dashboard-stat closed">
                    <div className="report-title">Closed </div>
                    <div className="report-stat">-</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dashboard-stat todays">
                    <div className="report-title">Todays Job </div>
                    <div className="report-stat">-</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dashboard-stat processing">
                    <div className="report-title">Processing Job </div>
                    <div className="report-stat">-</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="dashboard-stat">
                <DoughnutChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
