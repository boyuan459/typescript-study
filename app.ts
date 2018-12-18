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

interface EmployeeFilter {
    (e: Employee) : Boolean
}

interface EmployeeList {
    employees: Employee[],
    managerFilter: (isManager: Boolean) => EmployeeFilter,
    applyFilter: (filter: EmployeeFilter) => Employee[]
}

const employeeList : EmployeeList = {
    employees: employees,
    managerFilter(isManager) {
        return function(employee) {
            return employee.managementPosition === isManager;
        }
    },
    applyFilter(filter) {
        let filteredList : Employee[] = [];
        for(let employee of this.employees) {
            if (filter(employee)) {
                filteredList.push(employee);
            }
        }
        return filteredList;
    }
}

const isManager = employeeList.managerFilter(true); //return filter function
console.log(employeeList.applyFilter(isManager));