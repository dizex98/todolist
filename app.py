from os import stat
from webbrowser import get
from flask import Flask, render_template, request, url_for, redirect
from datetime import date, datetime
import sys
import os
import csv
import json
import pymongo
from pymongo import MongoClient
now = datetime.now()

app = Flask(__name__)
CONNECTION_STRING = "mongodb://root:itay@mongodb-0.mongodb-headless:27017"


def get_database():

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    docs = []
    try:
        conn = MongoClient(CONNECTION_STRING)
        print("Connected successfully!!!")
    except:  
        print("Could not connect to MongoDB")
    db = conn.employees
    
    # Created or Switched to collection names: myTable
    collection = db.employees
    
    # To find() all the entries inside collection name 'myTable'
    cursor = collection.find()
    for record in cursor:
        # docs.append(record)
        print(record)
    # return docs


@app.route('/health', methods=['GET'])
def health():
    try:
        conn = MongoClient(CONNECTION_STRING)
        return render_template("health.html",status ="You have been connected Successfully!!!"),200
    except:
        return render_template("health.html",status ="Oops.. The database is unreachable :("),500


@app.route('/employees', methods=['GET'])
def employees():
    json_list = []
    try:
        conn = MongoClient(CONNECTION_STRING)
        print("Connected successfully!!!")
    except:  
        print("Could not connect to MongoDB")
    db = conn.employees
    collection = db.employees
    # To find() all the entries inside collection name 'employees'
    records = collection.find()
    for record in records:
        json_list.append(record)
    return render_template("employees.html", employees=json_list)


@app.route('/tasks', methods=['GET'])
def get_tasks():
    json_list = []
    conn = MongoClient(CONNECTION_STRING)
    db_emp = conn.employees
    db_task = conn.tasks
    emp_collection = db_emp.employees
    task_collection = db_task.tasks
    emp_id = request.args.get('emp_id')
    if emp_id != None and emp_id != "":
        records = task_collection.find({"employee_id":int(emp_id)})
        employee = emp_collection.find_one({"id":int(emp_id)})
        for record in records:
            record["first_name"] = employee.get("first_name")
            record["last_name"] = employee.get("last_name")
            json_list.append(record)
        return render_template("tasks.html", tasks=json_list)
    else:
        records = task_collection.find()
        for record in records:
            try:
                employee = emp_collection.find_one({"id":int(record.get("employee_id"))})
                record["first_name"] = employee.get("first_name")
                record["last_name"] = employee.get("last_name")
            except:
                continue
            json_list.append(record)
        return render_template("tasks.html", tasks=json_list)


@app.route('/tasks', methods=['POST'])
def post_tasks():
    conn = MongoClient(CONNECTION_STRING)
    task_collection = conn.tasks.tasks
    try:
        emp_id = request.form["emp_id"]
        desc = request.form["desc"]
        due_date = request.form["due_date"]
    except:
        emp_id = ""
    try:
        task_id = request.form["del_task_id"]
    except:
        task_id = ""
    try:
        update_task = request.form["update_task_id"]
        update_desc = request.form["update_desc"]
    except:
        update_task = ""
    if emp_id != None and emp_id != "":
        task_collection.insert_one({
            "id": 999,
            "employee_id": int(emp_id),
            "description": desc,
            "due_date": due_date
        })
    elif task_id != None and task_id != "":
        task_collection.delete_one({"id":int(task_id)})
    elif update_task != None and update_task != "":
        task_collection.update_one({"id":int(update_task)},{"$set":{"description":update_desc}})
    return redirect(url_for("get_tasks"))


@app.route('/')
def menu():
    return render_template("menu.html")


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)