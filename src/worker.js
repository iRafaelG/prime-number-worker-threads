// import node modules
const { workerData, parentPort, threadId} = require('worker_threads');

// calculate prime number function
    function isPrime(number) {
        let startTime = new Date();
        let endTime = new Date();
        let prime = true;

    for (let i = 2; i < number; i++) {
        if(number % i === 0){
            endTime = new Date();
            prime = false;
            break;
        }        
    }

    if(prime) endTime = new Date();

    return {
        number,
        prime,
        time: "Total running time: " + (endTime.getTime() - startTime.getTime()),
        threadId
    }
}

parentPort.postMessage(isPrime(workerData));