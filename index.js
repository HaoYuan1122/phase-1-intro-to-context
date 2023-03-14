// Your code here
function createEmployeeRecord(array){
    let obj={
        firstName:array[0],
        familyName:array[1],
        title:array[2],
        payPerHour:array[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
    return obj
}
function createEmployeeRecords(arrays){
    return arrays.map(createEmployeeRecord)
}
function createTimeInEvent(employeeRecord, dateStamp){
    let obj={}
    obj.type='TimeIn'
    obj.hour=parseInt(dateStamp.split(' ')[1])
    obj.date=dateStamp.split(' ')[0]
    employeeRecord.timeInEvents.push(obj)
    return employeeRecord
}
function createTimeOutEvent(employeeRecord, dateStamp){
    let obj={}
    obj.type='TimeOut'
    obj.hour=parseInt(dateStamp.split(' ')[1])
    obj.date=dateStamp.split(' ')[0]
    employeeRecord.timeOutEvents.push(obj)
    return employeeRecord
}
function hoursWorkedOnDate(employeeRecord, date){
    const timeInOjb=employeeRecord.timeInEvents.find(e=>e.date===date)
    const timeOutOjb=employeeRecord.timeOutEvents.find(e=>e.date===date)
    return (timeOutOjb.hour-timeInOjb.hour)/100
}
function wagesEarnedOnDate(employeeRecord, date){
    return hoursWorkedOnDate(employeeRecord, date)*employeeRecord.payPerHour
}
function allWagesFor(employeeRecord){
    const dates=employeeRecord.timeInEvents.map(e=>e.date)
    const wagesOnEachDate=dates.map(date=>wagesEarnedOnDate(employeeRecord, date))
    return wagesOnEachDate.reduce((accumulator,element)=>{
        accumulator+=element
        return accumulator
    },0)
}

function calculatePayroll(arrayOfEmployeeRecords){
    const wagesForEachEmployee=arrayOfEmployeeRecords.map(allWagesFor)
    return wagesForEachEmployee.reduce((accumulator,element)=>{
        accumulator+=element
        return accumulator
    },0)
}





const hao=['Hao','Yuan','web developer','50']
const sheng=['Xisheng','Li','devOps engineer','80']
const haoRecord=createEmployeeRecord(hao)
const shengRecord=createEmployeeRecord(sheng)


createTimeInEvent(haoRecord,'2023-3-14 0800')
createTimeOutEvent(haoRecord,'2023-3-14 1800')

createTimeInEvent(haoRecord,'2023-3-15 0800')
createTimeOutEvent(haoRecord,'2023-3-15 1800')

createTimeInEvent(shengRecord,'2023-3-15 0800')
createTimeOutEvent(shengRecord,'2023-3-15 1800')
// const haoWages=allWagesFor(haoRecord)
// const shengWages=allWagesFor(shengRecord)

// const allRecords=createEmployeeRecords()
// console.log(allRecords)
console.log(calculatePayroll([haoRecord,shengRecord]))