"use strict";
//interface
const employees = [
    {
        employeeID: 1,
        department: "IT",
        managementPosition: true,
        workExperience: 4,
        gender: "M"
    },
    {
        employeeID: 1,
        department: "IT",
        managementPosition: false,
        workExperience: 4,
        gender: "M"
    },
    {
        employeeID: 1,
        department: "IT",
        managementPosition: false,
        workExperience: 4,
        gender: "M"
    }
];
const newEmployee = {
    employeeID: 4,
    department: "IT",
    managementPosition: true,
    workExperience: 4,
    gender: "M",
    age: 34
};
employees.push(newEmployee);
const employeeList = {
    employees: employees,
    managerFilter(isManager) {
        return function (employee) {
            return employee.managementPosition === isManager;
        };
    },
    applyFilter(filter) {
        let filteredList = [];
        for (let employee of this.employees) {
            if (filter(employee)) {
                filteredList.push(employee);
            }
        }
        return filteredList;
    }
};
const isManager = employeeList.managerFilter(true); //return filter function
console.log(employeeList.applyFilter(isManager));
