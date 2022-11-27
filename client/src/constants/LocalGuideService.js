
import AddHikeService from '../assets/localGuideService/AddHikeService.png';
import AddHutService from '../assets/localGuideService/AddHutService.png';
import AddParkingService from '../assets/localGuideService/AddParkingService.png';

import { GiMountainRoad } from 'react-icons/gi'
import { BsHouseFill } from 'react-icons/bs'
import { FaParking } from 'react-icons/fa'

const LocalGuideService = [
    {
        addName: 'Add hike',
        url: 'addHike',
        title: 'Add hike',
        description: 'Enter your hike to improve our system',
        photoFile: AddHikeService,
        icon: GiMountainRoad
    },
    {
        addName: 'Add hut',
        url: 'addHut',
        title: 'Add hut',
        description: 'Enter your hut to improve our system',
        photoFile: AddHutService,
        icon: BsHouseFill
    },
    {
        addName: 'Add parking',
        url: 'addParking',
        title: 'Add parking lot',
        description: 'Enter your parking lot to improve our system',
        photoFile: AddParkingService,
        icon: FaParking
    },
]

export default LocalGuideService;