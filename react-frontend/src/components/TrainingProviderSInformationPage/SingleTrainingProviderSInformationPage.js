import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleTrainingProviderSInformationPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("trainingProviderSInformation")
            .get(urlParams.singleTrainingProviderSInformationId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "TrainingProviderSInformation", type: "error", message: error.message || "Failed get trainingProviderSInformation" });
            });
    }, [props,urlParams.singleTrainingProviderSInformationId]);


    const goBack = () => {
        navigate("/trainingProviderSInformation");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Training Provider's Information</h3>
                </div>
                <p>trainingProviderSInformation/{urlParams.singleTrainingProviderSInformationId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Organization Name</label><p className="m-0 ml-3" >{_entity?.organizationName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Organization Address</label><p className="m-0 ml-3" >{_entity?.organizationAddress}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Organization Contact Number</label><p className="m-0 ml-3" >{Number(_entity?.organizationContactNumber)}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleTrainingProviderSInformationPage);
