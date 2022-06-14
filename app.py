from os import stat
from webbrowser import get
from flask import Flask, render_template, request, jsonify
# import mysql.connector
# from mysql.connector import Error
from datetime import date, datetime
import sys
import os
import csv
import json
import pymongo
from pymongo import MongoClient
now = datetime.now()

app = Flask(__name__)
# CONNECTION_STRING = "mongodb://root:itay@mongo-mongodb-0.mongo-mongodb-headless:27017/"
CONNECTION_STRING = "mongodb://root:itay@mongo:27017/"

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
        return render_template("health.html",status ="You have been connected Successfully!"),200
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
def tasks():
    json_list = []
    try:
        conn = MongoClient(CONNECTION_STRING)
        print("Connected successfully!!!")
    except:  
        print("Could not connect to MongoDB")
    db_emp = conn.employees
    db_task = conn.tasks
    emp_collection = db_emp.employees
    task_collection = db_task.tasks
    records = task_collection.find()
    for record in records:
        try:
            employee = emp_collection.find_one({"id":record.get("employee_id")})
            record["first_name"] = employee.get("first_name")
            record["last_name"] = employee.get("last_name")
        except:
            continue
        json_list.append(record)
    return render_template("tasks.html", tasks=json_list)


@app.route('/')
def menu():
    return render_template("menu.html")


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)