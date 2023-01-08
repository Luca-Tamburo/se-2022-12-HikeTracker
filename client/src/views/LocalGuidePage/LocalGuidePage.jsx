/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          src/views/LocalGuidePage
 * File:            LocalGuidePage.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Imports
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";

// Components - uiCore
import LocalGuideServiceCard from "../../components/ui-core/LocalGuideServiceCard/LocalGuideServiceCard";

// Constants
import LocalGuideService from "../../constants/LocalGuideService";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Styles
import maleAvatar from '../../assets/maleAvatar.png'
import femaleAvatar from '../../assets/femaleAvatar.png'

const LocalGuidePage = () => {
    const { userInfo } = useContext(AuthContext);

    return (
        <>
            <Col xs={{ span: 10, offset: 1 }} className="mt-5">
                <div className="d-flex justify-content-center">
                    {userInfo.gender === 'M' ? 
                    <img alt='avatar' src={maleAvatar} style={{ width: 180 }} /> : <></>}
                    {userInfo.gender === 'F' ? 
                    <img alt='avatar' src={femaleAvatar} style={{ width: 180 }} /> : 
                    <></>}
                    <h1 className="display-5 fw-bold mt-5">Welcome {userInfo.name}</h1>
                </div>
                <Row className="justify-content-center mt-3">
                    {LocalGuideService.map((info, index) => {
                        return (
                            <Col xs={12} sm={6} lg={3} key={info.id}>
                                <LocalGuideServiceCard info={info} />
                            </Col>
                        )
                    })}
                </Row>
            </Col >
        </>

    );
}

export default LocalGuidePage