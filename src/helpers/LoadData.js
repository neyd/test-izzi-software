import config from '../constants'

function LoadData(nextStep, another) {
    another!==undefined ? getSomeData(another, nextStep) :
        // eslint-disable-next-line no-undef
        fetch(`${config.IMPORT_URL}`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then((response) => {
            return response.text();
        }).then(function (data) {
            data = JSON.parse(data);
            nextStep(data)
        });
}

function getSomeData(link,nextStep) {
    // eslint-disable-next-line no-undef
    fetch(`${config.IMPORT_URL}/${link}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "text/plain"
        }
    }).then((response) => {
        return response.text();
    }).then(function (data) {
        data = JSON.parse(data);
        nextStep(data)
    });
}

export default LoadData