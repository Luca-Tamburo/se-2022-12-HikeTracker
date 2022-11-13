/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/HikeCard
* File:            HikeCard.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import './HikeCard.css';
import { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const hikes = [
    {
        "id": 1,
        "title": "Trail to MONT FERRA",
        "description": "Lasciata la macchina nell’ampio parcheggio superiamo il Rifugio Melezè e entriamo nel piccolo gruppo di case sopra la chiesetta di Sant’Anna lasciandoci alle spalle l’imponente edificio della casa per ferie Excelsior. Imbocchiamo il sentiero ben visibile che con numerosi tornanti sale rapidamente nel versante erboso fino ad un pianoro dove sono presenti alcuni ruderi detti Grange Reisassa. Qui troviamo un bivio con le indicazioni per il Monte Ferra a destra e il colle di Fiutrusa a sinistra. Proseguiamo verso il Monte ferra che ora si presenta maestoso davanti a noi, ma ancora troppo lontano. Guadagniamo quota raggiungendo il lago Reisassa che a inizio stagione può presentarsi ancora ghiacciato. A questo punto non ci resta che salire sul ripidissimo sentiero che si snoda tra gli sfasciumi fino a raggiungere la cresta rocciosa, dove svoltiamo a sinistra (direzione Ovest) e la percorriamo fino alla piccola croce di ferro posta ad indicare la nostra meta. Sentiero del ritorno uguale a quello di salita.",
        "authorName": 'aldo',
        "authorSurname": 'baglio',
        "uploadDate": "2022-01-10",
        "photoFile": "https://unsplash.com/photos/phIFdC6lA4E"
    },
    {
        "id": 2,
        "title": "Trail to ROCCA PATANUA",
        "description": "Patanua significa “nuda” in piemontese e probabilmente questo termine si riferisce ai caratteristici torrioni rocciosi di questa montagna, ben esposti e visibili anche da lontano. Rocca Patanua è una vetta relativamente bassa ma in grado di regalare all’escursionista una soddisfazione di conquista già prettamente alpinistica. Le sue balze rocciose infatti, che vengono aggirate dal sentiero, regalano un gran colpo d’occhio e panorama assicurato, nuvole permettendo. Arrivati a Prarotto salendo da Condove lasciare l’auto nel parcheggio davanti alla piccola chiesa della Madonna della Neve. Dal lato opposto della strada è ben evidente la partenza del sentiero evidenziato dalla cartellonistica escursionistica. Si imbocca quindi il sentiero 564 seguendo l’indicazione per Rocca Patanua. Il primo tratto di sentiero si sviluppa in bosco a prevalenza di conifere e sale subito deciso. Dopo circa 2 Km tralasciamo la deviazione a sinistra per l’abitato di Maffiotto e proseguiamo sul sentiero principale. Poco dopo, a quota prossima ormai ai 1900 metri, il bosco lascia il passo a grandi distese prative e qualche vecchio alpeggio (Alpe Formica). La vista inizia ad aprirsi sulla Val di Susa e il panorama diventa via via più interessante. In breve raggiungiamo la deviazione (564A) a destra per l’Alpe Tuluit, che trascuriamo.                Procedendo ormai pressochè in cresta molto ampia raggiungiamo un primo poggio a quota 2100 metri e un secondo a quota 2200, da cui si stacca un’altra deviazione verso sinistra (sentiero 532). Il sentiero adesso ormai verso la parte finale diventa un mezzacosta e aggira a sinistra i torrioni di Rocca Patanua. In pochi minuti, dopo alcuni semplici passaggi su roccia in cui bisogna appoggiare le mani, siamo giunti alla croce di vetta.                Prestare attenzione nell’ultimissimo tratto, l’unico EE di tutto il tragitto, in quanto abbastanza esposto e con neve e ghiaccio può risultare pericoloso. Per il rientro seguiamo il percorso dell’andata.",
        "authorName": 'pippo',
        "authorSurname": 'baudo',
        "uploadDate": "2022-04-12",
        "photoFile": "https://unsplash.com/photos/9wg5jCEPBsw"
    },
    {
        "id": 3,
        "title": "Trail to MONTE ZICCHER",
        "description": "Per raggiungere con la macchina il punto di partenza si parte da Craveggia, abitato sopra Santa Maria Maggiore, e si prosegue in macchina la strada asfaltata che porta prima al rifugio La Vasca, poi al Rifugio Camoscio ed, infine, al Rifugio Blitz. Si parcheggia la macchina nel punto terminale della strada asfaltata e si imbocca il sentiero. Il Monte Ziccher è una panoramica montagna che si eleva tra la Valle Vigezzo e il confine svizzero di Locarno (cantone Ticino, affacciato sulle coste settentrionali del Lago Maggiore). Dalla vetta si gode di una fantastica vista a 360 gradi su tutta la Valle Vigezzo, le montagne confinanti della Svizzera ticinese, alcune vette del Vallese e perfino il Monte Rosa. Si tratta di uno degli itinerari escursionisti tipici della valle, adatto anche a famiglie.Questa descrizione fa riferimento all’itinerario principale di salita dal versante sud-ovest della montagna. Parcheggiata la macchina si sale lungo un evidente sentiero verso l’oratorio del Blitz, che si raggiunge in circa 10-15 minuti. Superato l’oratorio, si attraversa un breve tratto di bosco e si devia a destra su percorso segnalato che porta ad un gruppo di baiteben esposte al sole. Proseguendo, si attraversa un gruppo di rustici ed una fontanella per salire a destra e rientrare nel bosco. Il sentiero prosegue su un costone e continua a salire guadagnando rapidamente quota nel bosco di conifere. La traccia è sempre ben individuabile.Proseguendo si arriva ad una deviazione e si svolta a destra. All’improvviso il bosco termina, la vista comincia a spaziare sui panorami circostanti e si raggiunge un ripido prato che porta sulla dorsale della montagna.Risalendo il prato, comincia a diventare visibile l’anticima e, in seguito, la dorsale sommitale. Quest’ultimo pezzo si sale rapidamente con un sentierino tra le rocce. Richiede attenzione, in quanto il tratto è leggermente esposto(in particolare se accompagnati da bambini e/o cani, in giornate affollate).Dalla vetta dello Ziccher l’occhio si sofferma subito sulla sottostante Val Vigezzo, fino a giungere alla pianura di Domodossola e, in prospettiva, al Massiccio del Rosa che si erge con il suo profilo distinguibile in direzione sud-ovest. La vista è splendida e merita una pausa di pura contemplazione.",
        "authorName": 'giovanni',
        "authorSurname": 'storti',
        "uploadDate": "2022-06-12",
        "photoFile": "https://unsplash.com/photos/73F4pKoUkM0"
    },
    {
        "id": 4,
        "title": "Trail to ROCCA PATANUA",
        "description": "Escursione molto piacevole nell’incontaminato e selvaggio vallone di Massello, fin sopra la maestosa cascata del Pis. Il sentiero 216 parte in mezzo alle case prima del ponte e inizia a risalire il vallone sulla sinistra orografica del torrente. Risalendo il vallone ci si troverà al cospetto di una bella conca, sovrastata dall’imponente cascata del Pis, già visibile da lontano. Il sentiero punta dapprima dritto verso la base della cascata; inizia poi a risalire il pendio roccioso verso destra, passando vicino le bergerie del Lausoun In breve tornerà a puntare verso il culmine della cascata, in direzione ovest. Il punto piu alto del nostro percorso sarà sul pianoro immediatamente sopra la cascata a circa 2200 m. Qui sarà possibile imboccare il sentiero per le bergerie di Valloncro che scende di nuovo ripido verso il torrente. Per chi non si accontenta, il sentiero prosegue poi in traccia (difficoltà EE) verso il Pelvo di Massello.Ritorno seguendo la via della salita.Una volta tornati al parcheggio consiglio una visita all’interessantepiccolo museo valdese di Balziglia. Il museo racconta la storia del “rimpatrio” dei Valdesi nel 1687, dall’esilio svizzero. (la visita è gratuita, verificare gli orari di apertura).",
        "authorName": 'giacomo',
        "authorSurname": 'piretti',
        "uploadDate": "2022-10-20",
        "photoFile": "https://unsplash.com/photos/V1NVvXmO_dk"
    },
    {
        "id": 5,
        "title": "Trail to MONT FERRA",
        "description": "Lasciata la macchina nell’ampio parcheggio superiamo il Rifugio Melezè e entriamo nel piccolo gruppo di case sopra la chiesetta di Sant’Anna lasciandoci alle spalle l’imponente edificio della casa per ferie Excelsior. Imbocchiamo il sentiero ben visibile che con numerosi tornanti sale rapidamente nel versante erboso fino ad un pianoro dove sono presenti alcuni ruderi detti Grange Reisassa. Qui troviamo un bivio con le indicazioni per il Monte Ferra a destra e il colle di Fiutrusa a sinistra. Proseguiamo verso il Monte ferra che ora si presenta maestoso davanti a noi, ma ancora troppo lontano. Guadagniamo quota raggiungendo il lago Reisassa che a inizio stagione può presentarsi ancora ghiacciato. A questo punto non ci resta che salire sul ripidissimo sentiero che si snoda tra gli sfasciumi fino a raggiungere la cresta rocciosa, dove svoltiamo a sinistra (direzione Ovest) e la percorriamo fino alla piccola croce di ferro posta ad indicare la nostra meta. Sentiero del ritorno uguale a quello di salita.",
        "authorName": 'aldo',
        "authorSurname": 'baglio',
        "uploadDate": "2022-01-10",
        "photoFile": "https://unsplash.com/photos/phIFdC6lA4E"
    },
    {
        "id": 6,
        "title": "Trail to ROCCA PATANUA",
        "description": "Patanua significa “nuda” in piemontese e probabilmente questo termine si riferisce ai caratteristici torrioni rocciosi di questa montagna, ben esposti e visibili anche da lontano. Rocca Patanua è una vetta relativamente bassa ma in grado di regalare all’escursionista una soddisfazione di conquista già prettamente alpinistica. Le sue balze rocciose infatti, che vengono aggirate dal sentiero, regalano un gran colpo d’occhio e panorama assicurato, nuvole permettendo. Arrivati a Prarotto salendo da Condove lasciare l’auto nel parcheggio davanti alla piccola chiesa della Madonna della Neve. Dal lato opposto della strada è ben evidente la partenza del sentiero evidenziato dalla cartellonistica escursionistica. Si imbocca quindi il sentiero 564 seguendo l’indicazione per Rocca Patanua. Il primo tratto di sentiero si sviluppa in bosco a prevalenza di conifere e sale subito deciso. Dopo circa 2 Km tralasciamo la deviazione a sinistra per l’abitato di Maffiotto e proseguiamo sul sentiero principale. Poco dopo, a quota prossima ormai ai 1900 metri, il bosco lascia il passo a grandi distese prative e qualche vecchio alpeggio (Alpe Formica). La vista inizia ad aprirsi sulla Val di Susa e il panorama diventa via via più interessante. In breve raggiungiamo la deviazione (564A) a destra per l’Alpe Tuluit, che trascuriamo.                Procedendo ormai pressochè in cresta molto ampia raggiungiamo un primo poggio a quota 2100 metri e un secondo a quota 2200, da cui si stacca un’altra deviazione verso sinistra (sentiero 532). Il sentiero adesso ormai verso la parte finale diventa un mezzacosta e aggira a sinistra i torrioni di Rocca Patanua. In pochi minuti, dopo alcuni semplici passaggi su roccia in cui bisogna appoggiare le mani, siamo giunti alla croce di vetta.                Prestare attenzione nell’ultimissimo tratto, l’unico EE di tutto il tragitto, in quanto abbastanza esposto e con neve e ghiaccio può risultare pericoloso. Per il rientro seguiamo il percorso dell’andata.",
        "authorName": 'pippo',
        "authorSurname": 'baudo',
        "uploadDate": "2022-04-12",
        "photoFile": "https://unsplash.com/photos/9wg5jCEPBsw"
    },
    {
        "id": 7,
        "title": "Trail to MONTE ZICCHER",
        "description": "Per raggiungere con la macchina il punto di partenza si parte da Craveggia, abitato sopra Santa Maria Maggiore, e si prosegue in macchina la strada asfaltata che porta prima al rifugio La Vasca, poi al Rifugio Camoscio ed, infine, al Rifugio Blitz. Si parcheggia la macchina nel punto terminale della strada asfaltata e si imbocca il sentiero. Il Monte Ziccher è una panoramica montagna che si eleva tra la Valle Vigezzo e il confine svizzero di Locarno (cantone Ticino, affacciato sulle coste settentrionali del Lago Maggiore). Dalla vetta si gode di una fantastica vista a 360 gradi su tutta la Valle Vigezzo, le montagne confinanti della Svizzera ticinese, alcune vette del Vallese e perfino il Monte Rosa. Si tratta di uno degli itinerari escursionisti tipici della valle, adatto anche a famiglie.Questa descrizione fa riferimento all’itinerario principale di salita dal versante sud-ovest della montagna. Parcheggiata la macchina si sale lungo un evidente sentiero verso l’oratorio del Blitz, che si raggiunge in circa 10-15 minuti. Superato l’oratorio, si attraversa un breve tratto di bosco e si devia a destra su percorso segnalato che porta ad un gruppo di baiteben esposte al sole. Proseguendo, si attraversa un gruppo di rustici ed una fontanella per salire a destra e rientrare nel bosco. Il sentiero prosegue su un costone e continua a salire guadagnando rapidamente quota nel bosco di conifere. La traccia è sempre ben individuabile.Proseguendo si arriva ad una deviazione e si svolta a destra. All’improvviso il bosco termina, la vista comincia a spaziare sui panorami circostanti e si raggiunge un ripido prato che porta sulla dorsale della montagna.Risalendo il prato, comincia a diventare visibile l’anticima e, in seguito, la dorsale sommitale. Quest’ultimo pezzo si sale rapidamente con un sentierino tra le rocce. Richiede attenzione, in quanto il tratto è leggermente esposto(in particolare se accompagnati da bambini e/o cani, in giornate affollate).Dalla vetta dello Ziccher l’occhio si sofferma subito sulla sottostante Val Vigezzo, fino a giungere alla pianura di Domodossola e, in prospettiva, al Massiccio del Rosa che si erge con il suo profilo distinguibile in direzione sud-ovest. La vista è splendida e merita una pausa di pura contemplazione.",
        "authorName": 'giovanni',
        "authorSurname": 'storti',
        "uploadDate": "2022-06-12",
        "photoFile": "https://unsplash.com/photos/73F4pKoUkM0"
    },
    {
        "id": 8,
        "title": "Trail to ROCCA PATANUA",
        "description": "Escursione molto piacevole nell’incontaminato e selvaggio vallone di Massello, fin sopra la maestosa cascata del Pis. Il sentiero 216 parte in mezzo alle case prima del ponte e inizia a risalire il vallone sulla sinistra orografica del torrente. Risalendo il vallone ci si troverà al cospetto di una bella conca, sovrastata dall’imponente cascata del Pis, già visibile da lontano. Il sentiero punta dapprima dritto verso la base della cascata; inizia poi a risalire il pendio roccioso verso destra, passando vicino le bergerie del Lausoun In breve tornerà a puntare verso il culmine della cascata, in direzione ovest. Il punto piu alto del nostro percorso sarà sul pianoro immediatamente sopra la cascata a circa 2200 m. Qui sarà possibile imboccare il sentiero per le bergerie di Valloncro che scende di nuovo ripido verso il torrente. Per chi non si accontenta, il sentiero prosegue poi in traccia (difficoltà EE) verso il Pelvo di Massello.Ritorno seguendo la via della salita.Una volta tornati al parcheggio consiglio una visita all’interessantepiccolo museo valdese di Balziglia. Il museo racconta la storia del “rimpatrio” dei Valdesi nel 1687, dall’esilio svizzero. (la visita è gratuita, verificare gli orari di apertura).",
        "authorName": 'giacomo',
        "authorSurname": 'piretti',
        "uploadDate": "2022-10-20",
        "photoFile": "https://unsplash.com/photos/V1NVvXmO_dk"
    },
]

const HikeCard = () => {
    const [hikeInfo, setHikeInfo] = useState(hikes);
    return (
        <>
            {
                hikeInfo.map((hike, index) => {
                    return (
                        <Col xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 3 }} className='mt-4'>
                            <Card key={index} className='border-0 shadow' style={{ width: '18rem' }}>
                                {/* TODO: Aggiungere il percorso parametrico */}
                                <Link to={`/hikes/${hike.id}`}>
                                    <Card.Img variant='top' src={hike.photoFile} style={{ height: '200px', objectFit: 'cover', objectPosition: 'center center' }} />
                                </Link>
                                <Card.Body>
                                    {/* TODO: Aggiungere il percorso parametrico */}
                                    <Link to={`/hikes/${hike.id}`}>
                                        <Card.Title className='fw-bold'>{hike.title}</Card.Title>
                                    </Link>
                                    <div className='d-flex justify-content-between mt-3'>
                                        <Card.Subtitle>{hike.authorName} {''} {hike.authorSurname}</Card.Subtitle>
                                        <Card.Subtitle>{hike.uploadDate}</Card.Subtitle>
                                    </div>
                                    <hr />
                                    <Card.Text className='crop-text-31'>{hike.description}</Card.Text>
                                </Card.Body>
                            </Card >
                        </Col>
                    )
                })
            }
        </ >
    );
}

export default HikeCard;