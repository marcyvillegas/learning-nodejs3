// // Connect to node application
// const express = require('express');
// const mysql = require('mysql2');

// const PORT = process.env.PORT || 5000;
// const app = express();

// // Connect the node app with mySQL server
// const con = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "Astrocat17!",
//     database: "school"
// });

// con.connect((err) => {
//     if (!err) {
//         console.log("connected to MYSQL server at port 3306");
//     } else {
//         console.log(err);
//     }
// });

// // Create a database
// app.get("/create-schooldb", (res, req) => {
//     let sql = "CREATE DATABASE school";
//     con.query(sql, (err, result) => {
//         if (!err) {
//             res.send("Successfully created the school database");
//         } else {
//             res.send("Failed to create the school database");
//         }
//     })
// });

// // Create a table
// app.get("/create-student-table", (res, req) => {
//     let sql = "CREATE TABLE student(id int AUTO_INCREMENT PRIMARY KEY, fname varchar(50), lname varchar(50), age int)";
//     con.query(sql, (err, result) => {
//         if (!err) {
//             res.send(result);
//         } else {
//             res.send("Failed to create the student table");
//         }
//     })
// });

// // Drop a table
// app.get("/delete-student-table", (res, req) => {
//     let sql = "DROP TABLE STUDENT";
//     con.query(sql, (err, result) => {
//         if (!err) {
//             res.send(result);
//         } else {
//             res.send("Failed to delete the student table");
//         }
//     })
// });

// // Perform CRUD operations
// // C - Create
// app.get("/insert-student", (res, req) => {
//     let newRow = { fname: "Juan", lname: "Dela Cruz", age: 19 }
//     let sql = "INSERT INTO student SET ?";
//     con.query(sql, newRow, (err, result) => {
//         if (!err) {
//             res.send(result);
//         } else {
//             res.send("Failed to insert a new student into the student table");
//         }
//     })
// });

// // R - Read
// app.get("/read-student", (res, req) => {
//     let sql = "SELECT * FROM student";
//     con.query(sql, (err, result) => {
//         if (!err) {
//             res.send(result);
//         } else {
//             res.send("Failed to read the student table");
//         }
//     })
// });

// // U - Update
// app.get("/update-student", (res, req) => {
//     let sql = "UPDATE student SET fname='John' WHERE id=1";
//     con.query(sql, (err, result) => {
//         if (!err) {
//             res.send(result);
//         } else {
//             res.send("Failed to update the student");
//         }
//     }) 
// });

// // D - Delete
// app.get("/delete-student", (res, req) => {
//     let sql = "DELETE FROM student WHERE id=1";
//     con.query(sql, (err, result) => {
//         if (!err) {
//             res.send(result);
//         } else {
//             res.send("Failed to delete the student");
//         }
//     });
// });

// // Join tables
// app.get("/read-student2", (res, req) => {
//     let sql = "SELECT student.id, student.fname, student.lname, section.code, section.course" +
//     "FROM student" +
//     "INNER JOIN section" +
//     "ON student.secid = section.secid";
//     con.query(sql, (err, result) => {
//         if (!err) {
//             res.send(result);
//         } else {
//             res.send("Failed to read the new student");
//         }
//     });
// });

// // Call a stored procedure
// app.get("./call-student2", (res, req) => {
//     let sql = "CALL DisplayStudent()";
//     con.query(sql, (err, result) => {
//         if (!err) {
//             res.send(result);
//         } else {
//             res.send("Failed to call the DisplayStudent() procedure");
//         }
//     });
// });

// // -- Script in MySQL database --
// // CREATE PROCEDURE DisplayStudent()
// // BEGIN
// // SELECT student.id, student.fname, student.lname, section.code, section.course
// // FROM student
// // INNER JOIN section
// // ON student.secid = section.secid
// // END





//-----------------------------------START -----------------------------------------

// EXPORT GREET

let greet = (name, message) => {
    let arrayName = name.split(" ");
    return `${message} ${arrayName[0]}`
}

modules.export = greet;

// DIFFERENT JS FILE

const message = require("./script2");

console.log(message.greet("Juan Dela Cruz","Good morning"));


//-------------------------------

// EXPORT search

let search = (item, array) => {

    let index = array.findIndex( el => el === item);
    if (index == null){
        return -1;
    } else {
        return index;
    }
}

module.exports = search;


//----------------------------------------------------------------

// ASYNCH

const fs = require('fs');

fs.readFile('./info.txt',  "utf-8", (err, data) => {
    if (!err) {
        console.log(data);
    } else {
        console.log("There is an error");
    }
});

//----------------------------------------------------------------

// STREAM PIPE

const fs = require("fs");

fs.mkdirSync("./data");
let readableStream = fs.createReadStream("./infoT.txt");
let writableStream = fs.createWriteStream("./data/info2.txt");

readableStream.pipe(writableStream);

//----------------------------------------------------------------

// READ TXT FILE

const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
    let data = fs.readFileSync('info2.txt', 'utf8');

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(data);
    response.end();
}).listen(3000);

//----------------------------------------------------------------

// HTML PAGES

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === '/page1') {
        fs.readFile('page1.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (req.url === '/page2') {
        fs.readFile('page2.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else {
        fs.readFile('error.html', function (err, data) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
}).listen(3000);


//-------------------------------

// PARAM PARAM

const http = require("http");
const url = require("url");

http.createServer((req, res) => {

    if (req.url === "/query?name=Juan") {

        let q = url.parse(req.url, true).query;

        let msg = `Hello ${q.name}`;

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(msg);
        res.end();
    } else if (req.url === "/param/Pedro") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("Hello Pedro");
        res.end();
    }

}).listen(3000);

console.log("Server running on port 3000");

// //----------------------------------------------------------------

// CREATE DATABASE

const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 5000;
const app = express();


const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
});

con.connect((err) => {
    if (!err) {
        console.log("connected to MYSQL server at port 3306");
    } else {
        console.log(err);
    }
});

app.get("/first", (res, req) => {
    let sql = "CREATE DATABASE GlobalCovidDb";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send("Successfully created the database");
        } else {
            res.send("Failed to create the database");
        }
    });
});

app.get("/second", (res, req) => {
    let sql = "CREATE TABLE stat( CountryId int AUTO_INCREMENT PRIMARY KEY, TotalCases int, TotalDeaths int, TotalTests int )";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to create the table");
        }
    });
});

//-------------------------------

// NEW ROW

const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 5000;
const app = express();


const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "GlobalCovidDb"
});

con.connect((err) => {
    if (!err) {
        console.log("connected to MYSQL server at port 3306");
    } else {
        console.log(err);
    }
});

app.get("/first", (res, req) => {
    let sql = "CREATE DATABASE GlobalCovidDb";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send("Successfully created the database");
        } else {
            res.send("Failed to create the database");
        }
    });
});

app.get("/second", (res, req) => {
    let sql = "CREATE TABLE stat( CountryId int AUTO_INCREMENT PRIMARY KEY, TotalCases int, TotalDeaths int, TotalTests int )";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to create the table");
        }
    });
});

app.get("/third", (res, req) => {
    let newRow = { CountryId: 1, TotalCases: 1, TotalDeaths: 1, TotalTests: 1 };
    let sql = "INSERT INTO GlobalCovidDb SET ?";
    con.query(sql, newRow, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to insert a new row");
        }
    })
});


app.get("/fourth", (res, req) => {
    let sql = "SELECT * FROM GlobalCovidDb";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to read row");
        }
    })
});

// //-------------------------------

// 2ND ROW, UPDATE, DELETE

const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 5000;
const app = express();


const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "GlobalCovidDb"
});

con.connect((err) => {
    if (!err) {
        console.log("connected to MYSQL server at port 3306");
    } else {
        console.log(err);
    }
});

app.get("/first", (res, req) => {
    let sql = "CREATE DATABASE GlobalCovidDb";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send("Successfully created the database");
        } else {
            res.send("Failed to create the database");
        }
    });
});

app.get("/second", (res, req) => {
    let sql = "CREATE TABLE stat( CountryId int AUTO_INCREMENT PRIMARY KEY, TotalCases int, TotalDeaths int, TotalTests int )";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to create the table");
        }
    });
});

app.get("/third", (res, req) => {
    let newRow = [
        [ 1, 1, 1, 1 ],
        [ 2, 1, 1, 1 ],
    ];
    let sql = "INSERT INTO GlobalCovidDb (CountryId, TotalCases, TotalDeaths, TotalTests) SET ?";
    con.query(sql, [newRow], (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to insert a new row");
        }
    })
});


app.get("/fourth", (res, req) => {
    let sql = "SELECT * FROM GlobalCovidDb";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to read row");
        }
    })
});


app.get("/fifth", (res, req) => {
    let sql = "UPDATE GlobalCovidDb SET TotalCases: 600 WHERE id=1";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to update");
        }
    }) 
});


app.get("/sixth", (res, req) => {
    let sql = "DELETE FROM GlobalCovidDb WHERE id=2";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to delete");
        }
    });
});

//-------------------------------

// JOIN TABLES


const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 5000;
const app = express();


const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "GlobalCovidDb"
});

con.connect((err) => {
    if (!err) {
        console.log("connected to MYSQL server at port 3306");
    } else {
        console.log(err);
    }
});

app.get("/first", (res, req) => {
    let sql = "CREATE DATABASE GlobalCovidDb";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send("Successfully created the database");
        } else {
            res.send("Failed to create the database");
        }
    });
});

app.get("/second", (res, req) => {
    let sql = "CREATE TABLE stat( CountryId int AUTO_INCREMENT PRIMARY KEY, TotalCases int, TotalDeaths int, TotalTests int )";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to create the table");
        }
    });
});

app.get("/third", (res, req) => {
    let newRow = [
        [ 1, 1, 1, 1 ],
        [ 2, 1, 1, 1 ],
    ];
    let sql = "INSERT INTO GlobalCovidDb (CountryId, TotalCases, TotalDeaths, TotalTests) SET ?";
    con.query(sql, [newRow], (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to insert a new row");
        }
    })
});


app.get("/fourth", (res, req) => {
    let sql = "SELECT * FROM GlobalCovidDb";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to read row");
        }
    })
});


app.get("/fifth", (res, req) => {
    let sql = "UPDATE GlobalCovidDb SET TotalCases: 600 WHERE id=1";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to update the stat");
        }
    }) 
});


app.get("/sixth", (res, req) => {
    let sql = "DELETE FROM GlobalCovidDb WHERE id=2";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to delete");
        }
    });
});


app.get("/create-new", (res, req) => {
    let sql = "CREATE TABLE secondTable( CountryCode int AUTO_INCREMENT PRIMARY KEY, Vaccinated int )";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to create the table");
        }
    });
});


app.get("/create-new", (res, req) => {
    let sql = "SELECT LocationId.stat, TotalCases.stat, TotalDeaths.stat, TotalTests.stat"
    + "FROM stat" + 
    "INNER JOIN countryInfo" +
    "ON stat.CountryId = countryInfo.CountryCode";
    con.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("Failed to create the table");
        }
    });
});
