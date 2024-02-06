
const si = require('systeminformation');

// promises style - new since version 3
var deviceData = {
    memoryUsage: 0,
    cpuUsage: [],
    cpuTemp: 0
}

// let memory = () => {
//     let data = awaitsi.mem()
//         .then(data => {
//             //console.log("mem")
//             //onsole.log(data)
//             return (((data['total'] - data['active']) / data['total']) * 100).toFixed(2)

//         })
//         .catch(error => {
//             console.error(error)
//             return "-1 "
//         })
// }
let memory = async () => {
    data = await si.mem()
    deviceData['memoryUsage'] = (((data['total'] - data['active']) / data['total']) * 100).toFixed(2)

}
let load = async () => {
    data = await si.currentLoad()
    deviceData['cpuUsage'] = data['currentLoad']
}
let temps = async () => {
    data = await si.cpuTemperature()
    deviceData['cpuTemp'] = data['main']
};

Promise.all([memory(), load(), temps()])
    .then((results) => {
        console.log(deviceData)
    })
