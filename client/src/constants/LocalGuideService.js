/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/constants
* File:            LocalGuideService.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
// Styles
import MyHikesService from '../assets/localGuideService/MyHikesService.png';
import AddHikeService from '../assets/localGuideService/AddHikeService.png';
import AddHutService from '../assets/localGuideService/AddHutService.png';
import AddParkingService from '../assets/localGuideService/AddParkingService.png';

// Icons
import { GiMountainRoad } from 'react-icons/gi'
import { BsHouseFill } from 'react-icons/bs'
import { FaParking, FaListUl } from 'react-icons/fa'

const LocalGuideService = [
    {
        id: '1',
        addName: 'My hikes',
        url: 'localGuide/hikes',
        title: 'My Hikes',
        description: 'Click here to see all the hike you have added in the system',
        photoFile: MyHikesService,
        icon: FaListUl
    },
    {
        id: '2',
        addName: 'Add hike',
        url: 'addHike',
        title: 'Add hike',
        description: 'Enter your hike to improve our system',
        photoFile: AddHikeService,
        icon: GiMountainRoad
    },
    {
        id: '3',
        addName: 'Add hut',
        url: 'addHut',
        title: 'Add hut',
        description: 'Enter your hut to improve our system',
        photoFile: AddHutService,
        icon: BsHouseFill
    },
    {
        id: '4',
        addName: 'Add parking',
        url: 'addParking',
        title: 'Add parking lot',
        description: 'Enter your parking lot to improve our system',
        photoFile: AddParkingService,
        icon: FaParking
    },
]

export default LocalGuideService;