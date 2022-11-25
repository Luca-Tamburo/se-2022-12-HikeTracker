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
import { Col } from "react-bootstrap";

// Components - uiCore
import LocalGuideServiceCard from "../../components/ui-core/LocalGuideServiceCard/LocalGuideServiceCard";

// Constants
import LocalGuideService from "../../constants/LocalGuideService";

// Styles
import maleAvatar from '../../assets/maleAvatar.png'
import femaleAvatar from '../../assets/femaleAvatar.png'

const user = {
    name: 'aldo',
    gender: 'm'
}

const LocalGuidePage = () => {
    return (
        <>
            <Col xs={{ span: 10, offset: 1 }} className="mt-5">
                <div className="d-flex justify-content-center">
                    {user.gender === 'm' ? <img alt='avatar' src={maleAvatar} style={{ width: 180 }} /> : user.gender === 'f' ? <img alt='avatar' src={femaleAvatar} style={{ width: 180 }} /> : <></>}
                    <h1 className="display-4 fw-bold mt-5 ms-3">Welcome {user.name}</h1>
                </div>
                <div className="d-flex justify-content-around mt-3">
                    {LocalGuideService.map((info, index) => {
                        return (
                            <Col xs={3}>
                                <LocalGuideServiceCard key={index} info={info} />
                            </Col>
                        )
                    })}
                </div>
            </Col >
        </>

    );
}

export default LocalGuidePage