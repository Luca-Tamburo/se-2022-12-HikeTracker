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

// Styles
import maleAvatar from '../../assets/maleAvatar.png'
import femaleAvatar from '../../assets/femaleAvatar.png'

const LocalGuidePage = () => {
    return (
        <>
            <Col xs={{ span: 10, offset: 1 }} className="mt-5">
                <div className="d-flex justify-content-center">
                    <img alt='avatar' src={maleAvatar} style={{ width: 180 }} />
                    <h1 className="display-4 fw-bold mt-5 ms-3">Welcome giouvà</h1>
                </div>

            </Col>

        </>

    );
}

export default LocalGuidePage