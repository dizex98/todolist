from os import stat
from webbrowser import get
from flask import Flask, render_template, request, jsonify
# import mysql.connector
# from mysql.connector import Error
from datetime import date, datetime
import os
import csv
import json
import pymongo
from pymongo import MongoClient
now = datetime.now()

app = Flask(__name__)
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
        return render_template("health.html",status ="You habe been connected Successfully!"),200
    except:
        return render_template("health.html",status ="Oops.. The database is unreachable :("),500


@app.route('/all', methods=['GET'])
def all():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    print("hello")
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
        docs.append(record)
    return docs


@app.route('/')
def menu():
    return render_template("menu.html")


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)