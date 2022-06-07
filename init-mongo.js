db.createUser({
    user: 'root',
    pwd: 'itay',
    roles: [
        {
          role: 'readWrite',
          db: 'employees',
        },
        {
          role: 'readWrite',
          db: 'tasks',
        },
    ],
});

dbe = new Mongo().getDB("employees");
dbt = new Mongo().getDB("tasks");
dbe.createCollection('employees', { capped: false });
dbt.createCollection('tasks', { capped: false });
dbe.employees.insert([{
    "id": 1,
    "first_name": "Shana",
    "last_name": "Mucklestone",
    "email": "smucklestone0@goo.ne.jp",
    "department_name": "Engineering"
  }, {
    "id": 2,
    "first_name": "Egon",
    "last_name": "McGilleghole",
    "email": "emcgilleghole1@purevolume.com",
    "department_name": "Services"
  }, {
    "id": 3,
    "first_name": "Elia",
    "last_name": "Snoday",
    "email": "esnoday2@arstechnica.com",
    "department_name": "Human Resources"
  }, {
    "id": 4,
    "first_name": "Derril",
    "last_name": "Ludlom",
    "email": "dludlom3@reuters.com",
    "department_name": "Marketing"
  }, {
    "id": 5,
    "first_name": "Noell",
    "last_name": "Toffanini",
    "email": "ntoffanini4@sogou.com",
    "department_name": "Services"
  }, {
    "id": 6,
    "first_name": "Paolina",
    "last_name": "Kurtis",
    "email": "pkurtis5@slashdot.org",
    "department_name": "Engineering"
  }, {
    "id": 7,
    "first_name": "Mahmud",
    "last_name": "Leppingwell",
    "email": "mleppingwell6@pcworld.com",
    "department_name": "Marketing"
  }, {
    "id": 8,
    "first_name": "Emera",
    "last_name": "Giffkins",
    "email": "egiffkins7@ehow.com",
    "department_name": "Support"
  }, {
    "id": 9,
    "first_name": "Lutero",
    "last_name": "Bog",
    "email": "lbog8@hubpages.com",
    "department_name": "Business Development"
  }, {
    "id": 10,
    "first_name": "Inigo",
    "last_name": "Cawsy",
    "email": "icawsy9@google.com.br",
    "department_name": "Product Management"
  }, {
    "id": 11,
    "first_name": "Bealle",
    "last_name": "Bowater",
    "email": "bbowatera@drupal.org",
    "department_name": "Research and Development"
  }, {
    "id": 12,
    "first_name": "Merle",
    "last_name": "Jeanet",
    "email": "mjeanetb@unc.edu",
    "department_name": "Engineering"
  }, {
    "id": 13,
    "first_name": "Janet",
    "last_name": "Stace",
    "email": "jstacec@earthlink.net",
    "department_name": "Research and Development"
  }, {
    "id": 14,
    "first_name": "Zeke",
    "last_name": "Whittick",
    "email": "zwhittickd@youtu.be",
    "department_name": "Legal"
  }, {
    "id": 15,
    "first_name": "Granger",
    "last_name": "Pfeifer",
    "email": "gpfeifere@state.tx.us",
    "department_name": "Human Resources"
  }, {
    "id": 16,
    "first_name": "Delmor",
    "last_name": "Crellin",
    "email": "dcrellinf@google.co.jp",
    "department_name": "Product Management"
  }, {
    "id": 17,
    "first_name": "Verena",
    "last_name": "Scottini",
    "email": "vscottinig@diigo.com",
    "department_name": "Marketing"
  }, {
    "id": 18,
    "first_name": "Brittaney",
    "last_name": "Gavrielly",
    "email": "bgavriellyh@techcrunch.com",
    "department_name": "Services"
  }, {
    "id": 19,
    "first_name": "Edward",
    "last_name": "Birdsall",
    "email": "ebirdsalli@dot.gov",
    "department_name": "Support"
  }, {
    "id": 20,
    "first_name": "Itay",
    "last_name": "Blecher",
    "email": "catchesonj@xinhuanet.com",
    "department_name": "Sales"
  }]);



dbt.tasks.insert([{
  "id": 1,
  "employee_id": 20,
  "description": "Evaluate the market",
  "due_date": "06/07/2022"
}, {
  "id": 2,
  "employee_id": 12,
  "description": "New product development template",
  "due_date": "20/09/2022"
}, {
  "id": 3,
  "employee_id": 12,
  "description": "New product development template",
  "due_date": "07/06/2022"
}, {
  "id": 4,
  "employee_id": 16,
  "description": "Determine safety issues",
  "due_date": "17/08/2022"
}, {
  "id": 5,
  "employee_id": 20,
  "description": "Analyze the competition",
  "due_date": "30/06/2022"
}, {
  "id": 6,
  "employee_id": 9,
  "description": "Determine safety issues",
  "due_date": "06/05/2022"
}, {
  "id": 7,
  "employee_id": 16,
  "description": "New product development template",
  "due_date": "16/09/2022"
}, {
  "id": 8,
  "employee_id": 11,
  "description": "Review legal issues",
  "due_date": "31/01/2022"
}, {
  "id": 9,
  "employee_id": 5,
  "description": "New product development template",
  "due_date": "04/02/2022"
}, {
  "id": 10,
  "employee_id": 1,
  "description": "Evaluate internal product",
  "due_date": "04/06/2022"
}, {
  "id": 11,
  "employee_id": 7,
  "description": "Produce lab scale product",
  "due_date": "20/02/2022"
}, {
  "id": 12,
  "employee_id": 3,
  "description": "Produce lab scale product",
  "due_date": "21/06/2022"
}, {
  "id": 13,
  "employee_id": 1,
  "description": "New product development template",
  "due_date": "10/06/2022"
}, {
  "id": 14,
  "employee_id": 9,
  "description": "Produce lab scale product",
  "due_date": "02/02/2022"
}, {
  "id": 15,
  "employee_id": 16,
  "description": "Evaluate the market",
  "due_date": "07/02/2022"
}, {
  "id": 16,
  "employee_id": 14,
  "description": "Assess manufacturing capabillities",
  "due_date": "07/02/2022"
}, {
  "id": 17,
  "employee_id": 15,
  "description": "Evaluate the market",
  "due_date": "07/09/2022"
}, {
  "id": 18,
  "employee_id": 16,
  "description": "Analyze the competition",
  "due_date": "05/03/2022"
}, {
  "id": 19,
  "employee_id": 20,
  "description": "Evaluate internal product",
  "due_date": "23/08/2022"
}, {
  "id": 20,
  "employee_id": 1,
  "description": "Determine safety issues",
  "due_date": "24/07/2022"
}, {
  "id": 21,
  "employee_id": 5,
  "description": "Analyze the competition",
  "due_date": "14/02/2022"
}, {
  "id": 22,
  "employee_id": 14,
  "description": "Analyze the competition",
  "due_date": "15/04/2022"
}, {
  "id": 23,
  "employee_id": 17,
  "description": "New product development template",
  "due_date": "20/08/2022"
}, {
  "id": 24,
  "employee_id": 15,
  "description": "Analyze the competition",
  "due_date": "03/07/2022"
}, {
  "id": 25,
  "employee_id": 6,
  "description": "Evaluate the market",
  "due_date": "12/07/2022"
}, {
  "id": 26,
  "employee_id": 20,
  "description": "Evaluate internal product",
  "due_date": "19/07/2022"
}, {
  "id": 27,
  "employee_id": 3,
  "description": "Analyze the competition",
  "due_date": "14/02/2022"
}, {
  "id": 28,
  "employee_id": 9,
  "description": "Produce lab scale product",
  "due_date": "02/07/2022"
}, {
  "id": 29,
  "employee_id": 14,
  "description": "Determine safety issues",
  "due_date": "23/01/2022"
}, {
  "id": 30,
  "employee_id": 13,
  "description": "Analyze the competition",
  "due_date": "18/03/2022"
}, {
  "id": 31,
  "employee_id": 6,
  "description": "Produce lab scale product",
  "due_date": "19/02/2022"
}, {
  "id": 32,
  "employee_id": 18,
  "description": "New product development template",
  "due_date": "25/09/2022"
}, {
  "id": 33,
  "employee_id": 9,
  "description": "New product development template",
  "due_date": "28/04/2022"
}, {
  "id": 34,
  "employee_id": 17,
  "description": "Evaluate the market",
  "due_date": "08/06/2022"
}, {
  "id": 35,
  "employee_id": 1,
  "description": "Assess manufacturing capabillities",
  "due_date": "24/06/2022"
}, {
  "id": 36,
  "employee_id": 3,
  "description": "Evaluate internal product",
  "due_date": "20/02/2022"
}, {
  "id": 37,
  "employee_id": 12,
  "description": "Evaluate the market",
  "due_date": "15/02/2022"
}, {
  "id": 38,
  "employee_id": 2,
  "description": "Determine safety issues",
  "due_date": "05/02/2022"
}, {
  "id": 39,
  "employee_id": 15,
  "description": "Evaluate the market",
  "due_date": "29/04/2022"
}, {
  "id": 40,
  "employee_id": 11,
  "description": "Produce lab scale product",
  "due_date": "20/04/2022"
}, {
  "id": 41,
  "employee_id": 16,
  "description": "Evaluate the market",
  "due_date": "04/02/2022"
}, {
  "id": 42,
  "employee_id": 15,
  "description": "Evaluate the market",
  "due_date": "17/08/2022"
}, {
  "id": 43,
  "employee_id": 2,
  "description": "Analyze the competition",
  "due_date": "16/06/2022"
}, {
  "id": 44,
  "employee_id": 19,
  "description": "Analyze the competition",
  "due_date": "21/03/2022"
}, {
  "id": 45,
  "employee_id": 13,
  "description": "Evaluate internal product",
  "due_date": "24/06/2022"
}, {
  "id": 46,
  "employee_id": 15,
  "description": "New product development template",
  "due_date": "30/06/2022"
}, {
  "id": 47,
  "employee_id": 11,
  "description": "Evaluate internal product",
  "due_date": "06/06/2022"
}, {
  "id": 48,
  "employee_id": 20,
  "description": "Review legal issues",
  "due_date": "08/07/2022"
}, {
  "id": 49,
  "employee_id": 8,
  "description": "Produce lab scale product",
  "due_date": "22/06/2022"
}, {
  "id": 50,
  "employee_id": 19,
  "description": "Produce lab scale product",
  "due_date": "13/09/2022"
}, {
  "id": 51,
  "employee_id": 20,
  "description": "New product development template",
  "due_date": "18/05/2022"
}, {
  "id": 52,
  "employee_id": 11,
  "description": "Assess manufacturing capabillities",
  "due_date": "30/07/2022"
}, {
  "id": 53,
  "employee_id": 5,
  "description": "Evaluate internal product",
  "due_date": "12/04/2022"
}, {
  "id": 54,
  "employee_id": 13,
  "description": "Produce lab scale product",
  "due_date": "27/07/2022"
}, {
  "id": 55,
  "employee_id": 9,
  "description": "Analyze the competition",
  "due_date": "27/07/2022"
}, {
  "id": 56,
  "employee_id": 16,
  "description": "Review legal issues",
  "due_date": "17/05/2022"
}, {
  "id": 57,
  "employee_id": 9,
  "description": "Review legal issues",
  "due_date": "19/08/2022"
}, {
  "id": 58,
  "employee_id": 16,
  "description": "Assess manufacturing capabillities",
  "due_date": "12/01/2022"
}, {
  "id": 59,
  "employee_id": 6,
  "description": "Determine safety issues",
  "due_date": "26/05/2022"
}, {
  "id": 60,
  "employee_id": 6,
  "description": "Produce lab scale product",
  "due_date": "27/02/2022"
}, {
  "id": 61,
  "employee_id": 5,
  "description": "Evaluate the market",
  "due_date": "13/05/2022"
}, {
  "id": 62,
  "employee_id": 11,
  "description": "Analyze the competition",
  "due_date": "07/05/2022"
}, {
  "id": 63,
  "employee_id": 8,
  "description": "Evaluate the market",
  "due_date": "20/05/2022"
}, {
  "id": 64,
  "employee_id": 16,
  "description": "Evaluate internal product",
  "due_date": "25/05/2022"
}, {
  "id": 65,
  "employee_id": 12,
  "description": "Determine safety issues",
  "due_date": "31/05/2022"
}, {
  "id": 66,
  "employee_id": 6,
  "description": "Produce lab scale product",
  "due_date": "09/08/2022"
}, {
  "id": 67,
  "employee_id": 16,
  "description": "Assess manufacturing capabillities",
  "due_date": "19/06/2022"
}, {
  "id": 68,
  "employee_id": 1,
  "description": "Analyze the competition",
  "due_date": "06/05/2022"
}, {
  "id": 69,
  "employee_id": 19,
  "description": "Determine safety issues",
  "due_date": "26/04/2022"
}, {
  "id": 70,
  "employee_id": 3,
  "description": "Analyze the competition",
  "due_date": "04/02/2022"
}, {
  "id": 71,
  "employee_id": 12,
  "description": "Evaluate internal product",
  "due_date": "16/09/2022"
}, {
  "id": 72,
  "employee_id": 7,
  "description": "New product development template",
  "due_date": "21/09/2022"
}, {
  "id": 73,
  "employee_id": 19,
  "description": "Evaluate internal product",
  "due_date": "05/06/2022"
}, {
  "id": 74,
  "employee_id": 11,
  "description": "Review legal issues",
  "due_date": "07/06/2022"
}, {
  "id": 75,
  "employee_id": 12,
  "description": "Review legal issues",
  "due_date": "27/01/2022"
}, {
  "id": 76,
  "employee_id": 1,
  "description": "Analyze the competition",
  "due_date": "08/04/2022"
}, {
  "id": 77,
  "employee_id": 5,
  "description": "Produce lab scale product",
  "due_date": "02/10/2022"
}, {
  "id": 78,
  "employee_id": 15,
  "description": "Produce lab scale product",
  "due_date": "21/04/2022"
}, {
  "id": 79,
  "employee_id": 19,
  "description": "Review legal issues",
  "due_date": "20/08/2022"
}, {
  "id": 80,
  "employee_id": 5,
  "description": "Analyze the competition",
  "due_date": "22/05/2022"
}, {
  "id": 81,
  "employee_id": 13,
  "description": "New product development template",
  "due_date": "16/05/2022"
}, {
  "id": 82,
  "employee_id": 19,
  "description": "Review legal issues",
  "due_date": "10/04/2022"
}, {
  "id": 83,
  "employee_id": 6,
  "description": "Evaluate internal product",
  "due_date": "07/04/2022"
}, {
  "id": 84,
  "employee_id": 11,
  "description": "Evaluate the market",
  "due_date": "07/04/2022"
}, {
  "id": 85,
  "employee_id": 13,
  "description": "New product development template",
  "due_date": "26/03/2022"
}, {
  "id": 86,
  "employee_id": 8,
  "description": "New product development template",
  "due_date": "22/02/2022"
}, {
  "id": 87,
  "employee_id": 19,
  "description": "Evaluate internal product",
  "due_date": "15/07/2022"
}, {
  "id": 88,
  "employee_id": 14,
  "description": "Assess manufacturing capabillities",
  "due_date": "03/03/2022"
}, {
  "id": 89,
  "employee_id": 11,
  "description": "Review legal issues",
  "due_date": "28/01/2022"
}, {
  "id": 90,
  "employee_id": 11,
  "description": "Evaluate internal product",
  "due_date": "20/04/2022"
}, {
  "id": 91,
  "employee_id": 9,
  "description": "Review legal issues",
  "due_date": "30/06/2022"
}, {
  "id": 92,
  "employee_id": 6,
  "description": "Produce lab scale product",
  "due_date": "14/02/2022"
}, {
  "id": 93,
  "employee_id": 11,
  "description": "Determine safety issues",
  "due_date": "10/06/2022"
}, {
  "id": 94,
  "employee_id": 14,
  "description": "Evaluate the market",
  "due_date": "28/05/2022"
}, {
  "id": 95,
  "employee_id": 18,
  "description": "Analyze the competition",
  "due_date": "06/02/2022"
}, {
  "id": 96,
  "employee_id": 3,
  "description": "Produce lab scale product",
  "due_date": "31/08/2022"
}, {
  "id": 97,
  "employee_id": 15,
  "description": "Produce lab scale product",
  "due_date": "23/03/2022"
}, {
  "id": 98,
  "employee_id": 3,
  "description": "Analyze the competition",
  "due_date": "30/09/2022"
}, {
  "id": 99,
  "employee_id": 1,
  "description": "Determine safety issues",
  "due_date": "04/08/2022"
}, {
  "id": 100,
  "employee_id": 19,
  "description": "Determine safety issues",
  "due_date": "15/06/2022"
}])