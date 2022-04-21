import React,{useEffect, useState} from 'react'

const Test = () => {


     // const duplicatedArray = ["Hemanth", "Akhil", "Swapnil", "Akhil", "Abhishek", "Hemanth"];
     // const uniqueArray = new Set(duplicatedArray);


     // const uniqueArray = duplicatedArray.filter((item, index) => {
     //     return duplicatedArray.indexOf(item) === index;
     // })
     // console.log(uniqueArray)

     // function checkValue(a){
     //     if (Number.isInteger(a)) {
     //         return true;
     //     }else{
     //         return false;
     //     }
     // }

     // iH ym eman si htnameH


     // Make a copy of an object in such a way that,
     //     if any modification is done on the
     // copied object the changes should not get reflected back to the original one.
     // let num = 9;
     // let num2 = num++;

     // console.log(num2 + 2)
     // console.log(num + 2)

     // const obj1 = {
     //     name: "Nishant",
     //     city: "Bangalore",
     //     technologies: ["ReactJs", "NodeJs", "PostgreSQL"]
     // }

     // let copydata = {
     //     ...obj1.name
     // }

     // console.log("og ", obj1)
     // console.log("copy", copydata = {name: "Shashi"})

     // function reverseValue (value){
     //     let newValue = "";

     //     var splitString = value.split("")
     //     // console.log('split', splitString)

     //     var reverseDataArray = splitString.reverse();
     //     console.log(reverseDataArray)

     //     for (let i = splitString.length - 1; i >= 0; i--) {
     //         newValue += splitString[i];
     //     }
     //     return newValue;
     // }

     //  console.log("Reverse Data: ", reverseValue('Hi my name is Hemanth'))


    const [user, setUser] = useState([]);

    useEffect(()=>{

        const url = "https://jsonplaceholder.typicode.com/users";

        const getData = async() => {
            try{
                const response = await fetch(url);
                const jsondata = await response.json();
                setUser(jsondata)
            }catch(error){
                console.log("Error", error)
            }
        }

        getData();
    },[])

    // "name": "Romaguera-Crona",
    // "catchPhrase": "Multi-layered client-server neural-net",
    // "bs": "harness real-time e-markets"


    return(
        <>
            <h1>User Data</h1>

            {user.map((item, index) => {
                return(
                    <tr key = {index}>
                        <td>{item.name}</td>
                        <td>{item.username}</td>
                        <td>{item.company.name}</td>
                        <td>{item.company.catchPhrase}</td>
                        <td>{item.company.bs}</td>
                    </tr>
                )
            })}
        </>
    )
}

export default Test;