
import AddHikeService from '../assets/localGuideService/AddHikeService.png';
import AddHutService from '../assets/localGuideService/AddHutService.png';
import AddParkingService from '../assets/localGuideService/AddParkingService.png';

const LocalGuideService = [
    {
        addName: 'Add hike',
        url: 'addHike',
        title: 'Add hike',
        description: 'Enter your hike to improve our system',
        photoFile: AddHikeService
    },
    {
        addName: 'Add hut',
        url: 'addHut',
        title: 'Add hut',
        description: 'Enter your hut to improve our system',
        photoFile: AddHutService
    },
    {
        addName: 'Add parking',
        url: 'addParking',
        title: 'Add parking lot',
        description: 'Enter your parking lot to improve our system',
        photoFile: AddParkingService
    },
]

export default LocalGuideService;