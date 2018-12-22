import axios from 'axios'
import moment from 'moment';

let stations = {};
let trains = {};

const request = (numbers, date) => '<REQUEST> \
        <LOGIN authenticationkey="36ee63f7e2224125b2c322f8a67b393b" /> \
        <QUERY objecttype="TrainAnnouncement"> \
            <FILTER> \
                    <IN name="AdvertisedTrainIdent" value="' + numbers.join(', ') + '" /> \
                    <OR> \
                        <EQ name="AdvertisedTimeAtLocation" value="' + date.format('Y-MM-DD') + '" /> \
                        <EQ name="ScheduledDepartureDateTime" value="' + date.format('Y-MM-DD') +'" /> \
                    </OR> \
            </FILTER> \
        </QUERY> \
        <QUERY objecttype="TrainStation"> \
            <FILTER /> \
        </QUERY> \
        </REQUEST>';

export const GetTrainNumbers = async (numbers) => {

    let result = await axios.post('https://api.trafikinfo.trafikverket.se/v1.3/data.json', request(numbers, moment()), {
        headers: {
            'Content-Type': 'text/xml'
        }
    });

    stations = handleTrainStation(result);
    trains = handleTrainAnnouncement(result);

    return trains;
}

export const GetStation = (location) => {
    return stations[location] || stations[location.LocationSignature] || stations[location.LocationName];
}

function handleTrainAnnouncement(result) {
    let data = result.data.RESPONSE.RESULT.filter(x => x.TrainAnnouncement)[0].TrainAnnouncement;
    return data.filter(x => x.Advertised).sort((a, b) => a.TimeAtLocation < b.TimeAtLocation).reduce((result, x) => {

        if (!result[x.AdvertisedTrainIdent]) {
            result[x.AdvertisedTrainIdent] = [];
        }

        result[x.AdvertisedTrainIdent].push(x);

        return result;

    }, {});
}

function handleTrainStation(result) {

    let data = result.data.RESPONSE.RESULT.filter(x => x.TrainStation)[0].TrainStation;

    return data.filter(x => x.Advertised).reduce((result, x) => {
        result[x.LocationSignature] = x;

        return result;

    }, {});
}