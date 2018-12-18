//interface

interface Employee {
    employeeID: number,
    department: string,
    managementPosition: boolean,
    workExperience: number,
    gender: string
}

const employees : Employee[] = [
    {
        employeeID: 1,
        department: "IT",
        managementPosition: true,
        workExperience: 4,
        gender: "M"
    },
    {
        employeeID: 2,
        department: "IT",
        managementPosition: false,
        workExperience: 4,
        gender: "M"
    },
    {
        employeeID: 3,
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

interface EmployeeFilter {
    (e: Employee) : Boolean
}

interface EmployeeList extends Array<Employee> {
    // readonly employees: Employee[],
    // [index : number] : Employee
    managerFilter: (isManager: Boolean) => EmployeeFilter,
    applyFilter: (filter: EmployeeFilter) => Employee[]
}

function getEmployeeList(employees : Employee[]) : EmployeeList {
    let list : EmployeeList = employees as EmployeeList;
    list.managerFilter = function(isManager) {
        return function(employee) {
            return employee.managementPosition === isManager;
        }
    };
    list.applyFilter = function(filter) {
        let filteredList : Employee[] = [];
        for(let employee of employees) {
            if (filter(employee)) {
                filteredList.push(employee);
            }
        }
        return filteredList;
    };
    return list;
}

// const employeeList : EmployeeList = {
//     employees: employees,
//     managerFilter(isManager) {
//         return function(employee) {
//             return employee.managementPosition === isManager;
//         }
//     },
//     applyFilter(filter) {
//         let filteredList : Employee[] = [];
//         for(let employee of this.employees) {
//             if (filter(employee)) {
//                 filteredList.push(employee);
//             }
//         }
//         return filteredList;
//     }
// }

const employeeList = getEmployeeList(employees);

const isManager = employeeList.managerFilter(true); //return filter function
console.log(employeeList.applyFilter(isManager));
console.log(employeeList[2]);