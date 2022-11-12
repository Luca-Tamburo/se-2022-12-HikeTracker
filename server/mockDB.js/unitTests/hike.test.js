const {getDetailsByHikeId, getPointsByHikeId, getHikes} = require("../../dao/hikeDao");

hikeDetails1 = {
    "id": 1,
    "length": 13,
    "expectedTime": 5,
    "ascent": 1280,
    "difficulty": 4,
    "startPointId": 1,
    "endPointId": 2
}

point1 = {
    "id": 1,
    "name": "Rifugio Melezè - Bellino - Val Varaita",
    "description": "The building was a military barracks and has been renovated entirely in wood and stone. The ground floor houses the bar, kitchen and dining room, where you can enjoy the best traditional mountain and local dishes. It is also possible to dine outside.",
    "type": "hut",
    "latitude": 44.5744896554157,
    "longitude": 6.98160500000067,
    "altitude": 1812,
    "city": "Bellino",
    "province": "Cuneo "
}

point2 = {
    "id": 2,
    "name": "Monte Ferra",
    "description": "Peak of Monte Ferra",
    "type": "gpsCoordinates",
    "latitude": 44.57426,
    "longitude": 6.98264,
    "altitude": 3094,
    "city": null,
    "province": null
}

point3 = {
    "id": 3,
    "name": "Prarotto",
    "description": "Walking area",
    "type": "location",
    "latitude": 45.1501353673732,
    "longitude": 7.23684464965801,
    "altitude": 1430,
    "city": "Condove",
    "province": "Torino" 
}

point4 = {
    "id": 4,
    "name": "Rocca Patanua",
    "description": "Rocca Patanua is a mountain in the Graian Alps located in the Susa Valley. The peak belongs to the municipal territory of Condove",
    "type": "location",
    "latitude": 45.17825,
    "longitude": 7.21963,
    "altitude": 2409,
    "city": null,
    "province": null
}

hike1 = {
    "id": 1,
    "title": "Trail to MONT FERRA",
    "description": "Leaving the car in the large parking lot we pass the Melezè Refuge and enter the small group of houses above the small church of Sant'Anna, leaving behind the imposing building of the Excelsior vacation home. We take the clearly visible path that with numerous hairpin bends climbs rapidly up the grassy slope to a plateau where there are some ruins called Grange Reisassa. Here we find a junction with signs for Monte Ferra on the right and the Colle di Fiutrusa on the left. We continue toward Monte ferra, which now stands majestically before us, but still too far away. We gain altitude as we reach Reisassa Lake, which may still be frozen in early season. At this point all we have to do is to climb the very steep path that winds among the scree until we reach the rocky ridge, where we turn left (westward) and walk along it to the small iron cross placed to indicate our destination. Return path the same as the ascent path.",
    "authorName": "aldo",
    "authorSurname": "baglio",
    "uploadDate": "2022-01-10",
    "photoFile": null
}

hike2 = {
    "id": 2,
    "title": "Trail to ROCCA PATANUA",
    "description": "Patanua means naked in Piedmontese, and this term probably refers to the characteristic rocky towers of this mountain, well exposed and visible even from a distance. Rocca Patanua is a relatively low peak but capable of giving the hiker a satisfaction of conquest that is already purely mountaineering. Its rocky crags in fact, which are bypassed by the trail, give a great view and assured panorama, clouds permitting. Arriving at Prarotto on the way up from Condove leave your car in the parking lot in front of the small church of Madonna della Neve. On the opposite side of the road, the start of the trail marked by hiking signs is clearly visible. Then take trail 564 following the sign for Rocca Patanua. The first part of the trail runs through predominantly coniferous forest and climbs sharply immediately. After about 2 km we leave out the detour to the left for the village of Maffiotto and continue on the main path. Shortly after, at an altitude now close to 1900 meters, the forest gives way to large expanses of meadowland and a few old alpine pastures (Alpe Formica). The view begins to open up to the Susa Valley and the panorama gradually becomes more interesting. We soon reach the detour (564A) to the right for Alpe Tuluit, which we overlook. Proceeding now almost on a very wide ridge we reach a first knoll at an elevation of 2100 meters and a second at an elevation of 2200, from which another detour to the left (trail 532) branches off. The path now towards the final part becomes a half-hill and goes around the towers of Rocca Patanua on the left. In a few minutes, after some easy steps on rock where you need to rest your hands, we have reached the summit cross. Be careful on the very last stretch, the only EE of the entire route, as it is quite exposed and with snow and ice can be dangerous. For the return we follow the outward route.",
    "authorName": "aldo",
    "authorSurname": "baglio",
    "uploadDate": "2022-04-12",
    "photoFile": null
}

testgetDetailsByHikeId(1, hikeDetails1)
testgetDetailsByHikeId(null, undefined)

testgetPointsByHikeId(1, [point1, point2])
testgetPointsByHikeId(2, [point3, point4])

testgetHikes([hike1, hike2]) //This works but stings have spacing diferences, which is not really a problem

function testgetDetailsByHikeId(id, expHikeDetails){
    test("test getDetailsByHikeId", async () => {
        let hike = await getDetailsByHikeId(id);
        expect(hike).toEqual(expHikeDetails);
    });
}

function testgetPointsByHikeId(id, expPointArray){
    test("test getDetailsByHikeId", async () => {
        let points = await getPointsByHikeId(id);
        console.log(points)
        expect(points).toEqual(expPointArray);
    });
}

function testgetHikes(expHikes){
    test("test getDetailsByHikeId", async () => {
        let hikes = await getHikes();
        console.log(hikes)
        expect(hikes).toEqual(expHikes);
    });
}