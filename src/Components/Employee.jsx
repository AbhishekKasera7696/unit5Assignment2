import React from "react";

const Employee = () => {

    const [inpName, setInpName] = React.useState("");
    const [inpGender, setInpGender] = React.useState("");
    const [inpDepartment, setInpDepartment] = React.useState("");
    const [inpRole, setInpRole] = React.useState("");
    const [inpSalary, setInpSalary] = React.useState("");

    const [employees, setEmployees] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    React.useEffect( () => {
        getEmployees();
    }, []);
    

   //Asc. sort
    const sortAsc = () => {
        fetch (`http://localhost:3004/data?_sort=salary&_order=asc`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setEmployees(res);
                setIsError(false);
            })
            .catch((res) => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    // Desc. sort
    const sortDesc = () => {
        fetch (`http://localhost:3004/data?_sort=salary&_order=desc`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setEmployees(res);
                setIsError(false);
            })
            .catch((res) => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    const getEmployees = () => {
        setIsLoading(true);
        fetch (`http://localhost:3004/data`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setEmployees(res);
                setIsError(false);
            })
            .catch((res) => setIsError(true))
            .finally(() => setIsLoading(false))
    };

    const handleAdd = () => {
        console.log(inpName);
        console.log(inpGender);
        console.log(inpDepartment);
        console.log(inpRole);
        console.log(inpSalary);
        if(inpName!=="" && inpGender!=="" && inpDepartment!=="" && inpRole!=="" && inpSalary!==""){
            const payload = {
                name: inpName,
                gender: inpGender,
                department: inpDepartment,
                role: inpRole,
                salary: inpSalary,
                status: false
            };

            const payloadjson = JSON.stringify(payload);

            fetch(`http://localhost:3004/data`, {
                method: "POST",
                body: payloadjson,
                headers: {
                    "content-type" : "application/json"
                }
            }).then((res) => {
                console.log(res)
                console.log(res.data)
                getEmployees();
            })
            .catch((err) => setIsError(true))
            .finally(() => setIsLoading(false));
        }
       
    };

    return (
        <>
            <div>
                <input 
                    placeholder="Name"
                    value={inpName}
                    onChange={(e) => setInpName(e.target.value)}
                ></input>
                <br></br>
                <input 
                    placeholder="Gender"
                    value={inpGender}
                    onChange={(e) => setInpGender(e.target.value)}
                ></input>
                <br></br>
                <input 
                    placeholder="Department"
                    value={inpDepartment}
                    onChange={(e) => setInpDepartment(e.target.value)}
                ></input>
                <br></br>
                <input 
                    placeholder="Role"
                    value={inpRole}
                    onChange={(e) => setInpRole(e.target.value)}
                ></input>
                <br></br>
                <input 
                    placeholder="Salary"
                    value={inpSalary}
                    onChange={(e) => setInpSalary(e.target.value)}
                ></input>
                <br></br>
                <button onClick={handleAdd}>ADD EMPLOYEE</button>
            </div>
            <hr></hr>
            <div>
                <button onClick={getEmployees}>Show All Departments</button>
                <button>SHOW MARKETING</button>
                <button>SHOW HR</button>
                <button>SHOW IT</button>
                <button>SHOW FINANCE</button>
            </div>
            <br></br>
            <div>
                <button onClick={sortAsc}>SORT BY SALARY ASCENDING</button>
                <button onClick={sortDesc}>SORT BY SALARY DESCENDING</button>
            </div>

            {
                employees.map((item) => {
                    return <div className="employees">
                        <h3>Name : {item.name}</h3>
                        <h3>Gender : {item.gender}</h3>
                        <h3>Department : {item.department}</h3>
                        <h3>Role : {item.role}</h3>
                        <h3>Salary : {item.salary}</h3>
                    </div>
                })
            }
        </>
    )
}

export {Employee}