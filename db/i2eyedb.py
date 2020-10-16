# DB connection
import psycopg2
from psycopg2 import Error, extras
import csv
import json
import requests

from flask import Flask, request
app = Flask(__name__)

# 1: Route for front end to send POST requests to submit registration and generate the person id. This route inserts the answers
# to all questions of registration station into answer and inserts the patient into the patient table - Rollie


@app.route('/submit_registration', methods=["POST"])
def submit_registration():
    try:
        connection = connect_db()
        cursor = connection.cursor()
        cursor2 = connection.cursor()

        station_count_query = """ SELECT COUNT(*) from station """
        cursor.execute(station_count_query)
        connection.commit()
        num_of_stations = cursor.fetchall()[0][0]
        print(num_of_stations)

        # initialise array with 0s of size = num_of_stations
        completed_stations = [0] * num_of_stations

        # Registration station is completed
        completed_stations[0] = 2
        insert_patient("true", completed_stations)

        patient_id_query = """ SELECT patient_id from patient ORDER BY patient_id DESC LIMIT 1 """
        cursor.execute(patient_id_query)
        connection.commit()
        patient_id = cursor.fetchall()[0][0]
        print(patient_id)

        data = request.get_json()
        print(data)
        registration_questions = data['Registration']

        for json_question in registration_questions:
            question = json_question['question']
            answer = json_question['answers']

            question_id_query = """SELECT question_id FROM question WHERE question = '{0}'""".format(
                question)

            cursor2.execute(question_id_query)
            question_id = cursor2.fetchall()[0][0]
            print(question_id)

            connection.commit()

            insert_answer(patient_id, answer, question_id, 1)

        insert_blank_data(patient_id)
        insert_blank_registration_data(patient_id)

        print("Successful submission of registration.")
        return str(patient_id)

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while submitting registration.", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# 2.1: Route for front end to send GET requests to retrieve a list of all registered people and their status
# Refer to 1 and 3.1 for similar code. - Rollie
# Step 1: Get count of all patients. Not sure how to exclude patient_ids deleted
# Step 2: For all patients, json_info = {}, from registration station (station_id = 1), get question_id from question = 'Name', 'Gender', 'Age', 'Status',
# then get answers from answer, then json_info.update({question: answers})
# Step 3: Check completed_stations array to translate for 0 = 'Not Queued', 1 = 'In Queue', 2 = 'Completed', then json_info.update({station_name: translated values})

# For 2.2: To edit, assuming editing means changing station completion info for each patient, expect format to be in JSON format returned by above GET request.
# Simply extract the patient_id, and update completed_stations with extracted station completion info - Rollie


# Route for front end to send GET requests to retrieve all questions from the database in JSON format. This route was an old one to
# return the all questions in JSON format. Can ignore for now - Rollie


@app.route('/get_questions', methods=["GET"])
def get_all_questions():
    try:
        connection = connect_db()
        cursor = connection.cursor()
        cursor2 = connection.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor)
        cursor3 = connection.cursor()
        postgres_select_query = """ SELECT station_id FROM station"""
        cursor.execute(postgres_select_query)
        connection.commit()
        station_id_list = cursor.fetchall()
        print(station_id_list)
        results = {}
        for i in station_id_list:
            station_id, = i
            postgres_select_query = """SELECT question_id, question, type_id FROM question WHERE station_id = {0}""".format(
                station_id)
            postgres_select_query2 = """SELECT station_name FROM station WHERE station_id = {0}""".format(
                station_id)
            cursor3.execute(postgres_select_query2)
            station_name, = cursor3.fetchall()[0]
            cursor2.execute(postgres_select_query)
            connection.commit()

            results.update({station_name: cursor2.fetchall()})
            # print(results)
            print("Successful query of question table.")
        return json.dumps(results)

      # ^ {"Registration": [
      #     {"question_id": 1, "question": "Name", "type_id": 1},
      #     {"question_id": 2, "question": "Gender", "type_id": 2},
      #     {"question_id": 3, "question": "Age", "type_id": 3},
      #     {"question_id": 4, "question": "Birthday", "type_id": 4}
      #     ]
      # }

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while getting question table and converting to JSON.", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")


# Tried to create the route for 2.1. Seems to work with some basic testing
# But, I assume that completed stations array has its index matching the station id. - Wei Kit

@app.route('/get_all_patients', methods=["GET"])
def get_all_patients():
    try:
        # Initialize connection and cursor.
        connection = connect_db()
        cursor = connection.cursor()
        # Get all existing patient IDs in DB.
        patient_select_query = """ SELECT patient_id FROM patient ORDER BY patient_id ASC"""
        cursor.execute(patient_select_query)
        connection.commit()
        patient_ID_list = cursor.fetchall()
        # print(patient_ID_list)

        # List containing all patient info to return at the end.
        results = []

        # For each patient we need to query the Q&A from registration,
        # and also process their stored array to see which stations were completed.
        for patient_ID in patient_ID_list:
            id = patient_ID[0]
            this_patient_data = {"id": id}
            print(id)
            # Select out answers from this patient from the registration page.
            answer_select_query = """SELECT question_id, answers FROM answer WHERE patient_id = {0}""".format(
                id)
            cursor.execute(answer_select_query)
            connection.commit()
            answers_list = cursor.fetchall()
            print(answers_list)
            # For each answer in answers_list, find the matching question and append to the result.
            for answer in answers_list:
                matching_question_id = answer[0]
                answer_string = answer[1]
                print(answer_string)
                question_select_query = """ SELECT question FROM question WHERE question_id = {0}""".format(
                    matching_question_id)
                cursor.execute(question_select_query)
                connection.commit()
                # It's abit weird here as fetchall returns [('question',)].
                question_string = cursor.fetchall()[0][0]
                # print(question_string)
                # Append each question: answer pair to the list.
                this_patient_data.update({question_string: answer_string})

            # Now, need to process the patient's array containing completed_stations info.
            array_select_query = """SELECT completed_station FROM patient WHERE patient_id = {0}""".format(
                id)
            cursor.execute(array_select_query)
            connection.commit()
            # Same reason for [0][0] as above.
            completed_stations_array = cursor.fetchall()[0][0]
            # print(completed_stations_array)
            # Iterate array and match to the station_id (Assumming that this array indices correspond to the station_ids)
            for index in range(1, len(completed_stations_array) + 1):
                # IDs in db start from 1, while array indices start from 0.
                completion_info = completed_stations_array[index - 1]
                station_select_query = """SELECT station_name FROM station WHERE station_id = {0} """.format(
                    index)
                cursor.execute(station_select_query)
                connection.commit()
                station_name = cursor.fetchall()[0][0]
                # print(station_name)
                outcome = ""
                # Construct the status message depending on the value of i (the value stored at this position in the array).
                if completion_info == 0:
                    outcome = "Not Queued"
                elif completion_info == 1:
                    outcome = "In Queue"
                elif completion_info == 2:
                    outcome = "Completed"
                else:
                    outcome = "Unknown status"

                # Append each station and the status to the list.
                this_patient_data.update({station_name: outcome})

            # Processing of this patient is done. Append to results.
            results.append(this_patient_data)
            # Iterate to next patient.

        return json.dumps(results)

    except(Exception, psycopg2.DatabaseError) as error:
        print("Error while getting patients and processing into JSON.", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")


# 3.1: Get patient data from the patient id

@app.route('/get_data/<int:patient_id>', methods=["GET"])
def get_patient_data(patient_id):
    try:
        connection = connect_db()
        cursor = connection.cursor()
        cursor2 = connection.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor)
        cursor3 = connection.cursor()
        postgres_select_query = """ SELECT station_id FROM station"""
        cursor.execute(postgres_select_query)
        connection.commit()
        station_id_list = cursor.fetchall()
        # print(station_id_list)
        results = {}

        for i in station_id_list:

            station_id, = i
            postgres_select_query = """SELECT question, answers FROM question INNER JOIN answer ON question.question_id = answer.question_id WHERE question.station_id = {0} AND answer.patient_id = {1}""".format(
                station_id, patient_id)
            postgres_select_query2 = """SELECT station_name FROM station WHERE station_id = {0}""".format(
                station_id)
            cursor3.execute(postgres_select_query2)
            station_name, = cursor3.fetchall()[0]
            cursor2.execute(postgres_select_query)
            connection.commit()

            data = cursor2.fetchall()
            data = [dict(row) for row in data]

            cursor4 = connection.cursor()

            for j in data:
                question_id_query = """SELECT question_id FROM question WHERE question LIKE '{0}'""".format(
                    j["question"].replace("'", "''"))
                cursor4.execute(question_id_query)
                num = cursor4.fetchall()[0]
                connection.commit()
                j['num'] = num

            results.update({station_name: data})

        print("Successful query of question table.")
        # print(results)

        # {'Registration': [
        #   {'question': 'Name', 'answers': 'ans', 'num': 1},
        #   {'question': 'Gender', 'answers': 'ans2', 'num': 2},
        #   {'question': 'Age', 'answers': 'ans3', 'num': 3},
        #   {'question': 'Birthday', 'answers': 'ans4', 'num': 4}
        #   ]
        # }

        return results

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while getting question table and converting to JSON.", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# 3.2: Route for front end to send POST requests to edit patient data by passing in a JSON file of the following format:
#  {registration: [{ num: 1, question: “Name”, answers: “” },
#                  { num: 2, question: “NRIC No.”, answers: “” }, …] } - Maybe need to ask front end what data they want to pass - Rollie


@app.route('/update_patient_data/<int:patient_id>', methods=["POST"])
def update_patient_data(patient_id):
    try:
        connection = connect_db()

        cursor = connection.cursor()

        data = request.get_json()
        for station in data.keys():
            for json_question in data[station]:
                question = json_question['question']

                answer = json_question['answers']

                cursor2 = connection.cursor()
                station_id_query = """SELECT station_id FROM station WHERE station_name = %s"""
                station_to_get = (station,)
                cursor2.execute(station_id_query, station_to_get)
                station_id = cursor2.fetchall()[0]

                question_id_query = """SELECT question_id FROM question WHERE question = %s AND station_id = %s"""
                question_to_get = (question, station_id,)
                cursor2.execute(question_id_query, question_to_get)
                question_id = cursor2.fetchall()

                question_id_query = """SELECT question_id FROM question WHERE question = %s AND station_id = %s"""
                question_to_get = (question, station_id,)
                cursor2.execute(question_id_query, question_to_get)
                question_id = cursor2.fetchall()[0]

                print(question_id)

                answer_update_query = """UPDATE answer SET answers = %s WHERE question_id = %s AND patient_id = %s"""
                answer_to_update = (answer, question_id, patient_id)
                cursor.execute(answer_update_query, answer_to_update)
                connection.commit()

        return "Data successfully updated"

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while updating data.", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")


# insert patient data

# @app.route('/insert_patient_data/<int:patient_id>', methods=["POST"])
# def insert_patient_data(patient_id):
#     try:
#         connection = connect_db()

#         cursor = connection.cursor()

#         data = request.get_json()
#         for station in data.keys():
#             for json_question in data[station]:
#                 question = json_question['question']

#                 answer = json_question['answers']

#                 cursor2 = connection.cursor()
#                 station_id_query = """SELECT station_id FROM station WHERE station_name = %s"""
#                 station_to_get = (station,)
#                 cursor2.execute(station_id_query, station_to_get)
#                 station_id = cursor2.fetchall()[0]

#                 question_id_query = """SELECT question_id FROM question WHERE question = %s AND station_id = %s"""
#                 question_to_get = (question, station_id,)
#                 cursor2.execute(question_id_query, question_to_get)
#                 question_id = cursor2.fetchall()[0]

#                 print(question_id)

#                 insert_answer(patient_id, answer, question_id, station_id)

#         return "Data successfully inserted"

#     except (Exception, psycopg2.DatabaseError) as error:
#         print("Error while inserting data.", error)

#     finally:
#         # closing database connection.
#         if(connection):
#             cursor.close()
#             connection.close()
#             #print("PostgreSQL connection is closed")

def insert_blank_data(patient_id):
    try:
        connection = connect_db()

        cursor = connection.cursor()

        insert_blanks_query = """ INSERT INTO answer (question_id, station_id, answers, patient_id)
                                  SELECT question_id, station_id, '', %s 
                                  FROM question
                                  WHERE station_id != 
                                    (SELECT station_id 
                                    FROM station
                                    WHERE station_name = 'Registration');  """

        patient_id_to_insert = (patient_id,)
        cursor.execute(insert_blanks_query, patient_id_to_insert)
        connection.commit()

        print("Successful addition of blank answers")
        return "Data successfully inserted"

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while inserting blank data.", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")


def insert_blank_registration_data(patient_id):
    try:
        connection = connect_db()

        cursor = connection.cursor()

        insert_blanks_query = """ INSERT INTO answer (question_id, station_id, answers, patient_id)
                                  SELECT question_id, station_id, '', %s
                                  FROM question
                                  WHERE (question_id NOT IN 
                                  (SELECT question_id 
                                  FROM answer
                                  WHERE (patient_id = %s)))
                                  AND station_id = 
                                    (SELECT station_id 
                                    FROM station
                                    WHERE station_name = 'Registration')  """

        cursor.execute(insert_blanks_query, (patient_id, patient_id,))
        connection.commit()

        print("Successful addition of blank answers")
        return "Data successfully inserted"

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while inserting data.", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# 4: Delete the patient's data (id and answers) from the database


@app.route('/delete_patient/<int:patient_id>', methods=["POST"])
def delete_patient(patient_id):
    try:
        connection = connect_db()
        cursor = connection.cursor()

        # Delete patient
        postgres_delete_patient_query = """DELETE FROM patient WHERE patient_id = {0}""".format(
            patient_id)
        cursor.execute(postgres_delete_patient_query)
        connection.commit()
        print("patient deleted from patient table")

        # Delete answer
        postgres_delete_answer_query = """DELETE FROM answer WHERE patient_id = {0}""".format(
            patient_id)
        cursor.execute(postgres_delete_answer_query)
        connection.commit()
        print("patient answers deleted from answer table")
        return "patient successfully deleted"

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while deleting patient", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Get availability of all the stations


@app.route('/get_availability', methods=["GET"])
def get_station_availability():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        postgres_select_query = """SELECT station_name, availability FROM station"""
        cursor.execute(postgres_select_query)
        connection.commit()

        results = cursor.fetchall()
        results = dict(results)

        print("Successful query of station table.")
        print(results)

        # {'Tobacco Questionnare': True,
        # 'Anemia Questionnare': True,
        # 'BMI (Underweight measurement)': True,
        # 'Haemoglobin (Anemia measurement)': True,
        # 'Post campaign survey': True,
        # 'Registration': False}

        return results

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while getting question table and converting to JSON.", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")


# Change availability of a station

@app.route('/set_availability', methods=["POST"])
def set_availability():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        data = request.get_json()
        print(data)
        for key, value in data.items():
            postgres_select_query = """ UPDATE station SET availability = %s WHERE station_name = %s"""
            record_to_select = (value, key,)
            cursor.execute(postgres_select_query, record_to_select)
            connection.commit()
            print("Availability of {} station set to {}".format(key, str(value)))
            print("ok")

        return "Availability of {} station set to {}".format(key, str(value))

    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to insert record into station table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")


# update status of patient

@app.route('/update_patient_status', methods=["POST"])
def update_patient_status():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        data = request.get_json()
        print(data)

        for key, value in data.items():

            if (key == "patient_id"):
                patient_id = (value)

            if (key == "boolean"):
                patient_status = (value)

            # print(key)
            # print(value)

        postgres_update_query = """ UPDATE patient SET status = %s WHERE patient_id = %s"""
        record_to_update = (patient_status, patient_id,)
        cursor.execute(postgres_update_query, record_to_update)
        connection.commit()

        print("ok")

        return "Patient status updated"

    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to insert record into patient table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")


# update completed_stations of patient

@app.route('/update_completed_stations/<int:patient_id>', methods=["POST"])
def update_completed_stations(patient_id):
    try:
        connection = connect_db()
        cursor = connection.cursor()
        cursor2 = connection.cursor()

        data = request.get_json()
        print(data)

        # initialise empty stations array
        station_count_query = """ SELECT COUNT(*) from station """
        cursor.execute(station_count_query)
        connection.commit()
        num_of_stations = cursor.fetchall()[0][0]
        print(num_of_stations)

        completed_stations = [0] * num_of_stations

        for station_name, completion_info in data.items():
            station_id_query = """SELECT station_id FROM station WHERE station_name = '{0}' """.format(
                station_name)
            cursor2.execute(station_id_query)
            connection.commit()
            station_id = cursor2.fetchall()[0][0]-1
            print(station_id)

            if completion_info == "Not Queued":
                completed_stations[station_id] = 0
            elif completion_info == "In Queue":
                completed_stations[station_id] = 1
            elif completion_info == "Completed":
                completed_stations[station_id] = 2
            else:
                completed_stations[station_id] = -1

            # print(key)
            # print(value)

        postgres_update_query = """ UPDATE patient SET completed_station = %s WHERE patient_id = %s"""
        record_to_update = (completed_stations, patient_id,)
        cursor.execute(postgres_update_query, record_to_update)
        connection.commit()

        print("ok")

        return "Completed stations updated"

    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to insert record into patient table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")


# Use localhost for local database (with the default password set for your system). For now, I think we should
# continue using the postgres db on heroku so that everyone can perform queries on it. - Wei Kit
# This one i'm not v sure how to connect to a local db, so i've connected to another one i've deployed on heroku, can i get some help here?


def connect_db():
    # connection = psycopg2.connect(user="jhfdzctgeytrkt",
    #                               password="6f0913d556bf6eee840e0e2ba8b4c0b3ef0331f6855852008be07eeb840cdb6f",
    #                               host="ec2-35-173-94-156.compute-1.amazonaws.com",
    #                               port="5432",
    #                               database="dbpduk6f0fbp8q")
    connection = psycopg2.connect(user="postgres",
                                  password="P@ssw0rd",
                                  host="localhost",
                                  port="5432",
                                  database="postgres")
    return connection

# Create station table


def create_station():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        create_stations_table_query = '''CREATE TABLE IF NOT EXISTS station
                  (station_id SERIAL PRIMARY KEY,
                  station_name TEXT UNIQUE,
                  availability BOOLEAN); '''
        cursor.execute(create_stations_table_query)
        connection.commit()
        print("Table station created successfully in PostgreSQL ")

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while creating station table", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Create patient table


def create_patient():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        create_patients_table_query = '''CREATE TABLE IF NOT EXISTS patient
                  (patient_id SERIAL PRIMARY KEY,
                  status BOOLEAN,
                  in_queue_station INTEGER,
                  completed_station INTEGER[]); '''
        cursor.execute(create_patients_table_query)
        connection.commit()
        print("Table patient created successfully in PostgreSQL ")

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while creating patient table", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Create question table


def create_question():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        create_questions_table_query = '''CREATE TABLE IF NOT EXISTS question
                  (question_id SERIAL PRIMARY KEY,
                  question TEXT,
                  station_id INTEGER,
                  type_id INTEGER); '''
        cursor.execute(create_questions_table_query)
        connection.commit()
        print("Table question created successfully in PostgreSQL ")

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while creating question table", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Create answer table


def create_answer():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        create_answers_table_query = '''CREATE TABLE IF NOT EXISTS answer
                  (answer_id SERIAL PRIMARY KEY,
                  patient_id INTEGER,
                  answers TEXT,
                  question_id INTEGER,
                  station_id INTEGER); '''
        cursor.execute(create_answers_table_query)
        connection.commit()
        print("Table answer created successfully in PostgreSQL ")

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while creating answer table", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Create type table


def create_type():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        create_type_table_query = '''CREATE TABLE IF NOT EXISTS type
                  (type_id SERIAL PRIMARY KEY,
                  type_info TEXT); '''
        cursor.execute(create_type_table_query)
        connection.commit()
        print("Table type created successfully in PostgreSQL ")

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while creating type table", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Create all the tables


def db_setup():
    create_station()
    create_patient()
    create_question()
    create_answer()
    create_type()

# Insert stations into station table


def insert_station(station_name):
    try:
        connection = connect_db()
        cursor = connection.cursor()
        postgres_insert_query = """ INSERT INTO station (station_id, station_name, availability) VALUES (DEFAULT, %s, TRUE)"""
        record_to_insert = (station_name,)
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into station table")
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to insert record into station table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Insert patients into patient table


def insert_patient(status, completed_station):
    try:
        connection = connect_db()
        cursor = connection.cursor()

        postgres_insert_query = """ INSERT INTO patient (patient_id, status, in_queue_station, completed_station) 
                                    VALUES (DEFAULT, %s, -1, %s)"""
        record_to_insert = (status, completed_station,)
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into patient table")
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to insert record into patient table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Insert questions into question table


def insert_question(question, station_id, type_id):
    try:
        connection = connect_db()
        cursor = connection.cursor()
        postgres_insert_query = """ INSERT INTO question (question_id, question, station_id, type_id) VALUES (DEFAULT, %s, %s, %s)"""
        record_to_insert = (question, station_id, type_id,)
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into question table")
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to insert record into question table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Insert answers into answer table


def insert_answer(patient_id, answer, question_id, station_id):
    try:
        connection = connect_db()
        cursor = connection.cursor()
        postgres_insert_query = """ INSERT INTO answer (answer_id, patient_id, answers, question_id, station_id) VALUES (DEFAULT, %s, %s, %s, %s)"""
        record_to_insert = (patient_id, answer, question_id, station_id,)
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into answer table")
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to insert record into answer table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Insert types into type table


def insert_type(type_info):
    try:
        connection = connect_db()
        cursor = connection.cursor()
        postgres_insert_query = """ INSERT INTO type (type_id, type_info) VALUES (DEFAULT, %s)"""
        record_to_insert = (type_info,)
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into type table")
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to insert record into type table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Update the completed stations in patient table


def update_completed(patient_id, station_name):
    try:
        connection = connect_db()
        cursor = connection.cursor()

        postgres_select_query = """ SELECT completed_station FROM patient WHERE patient_id = %s"""
        record_to_select = (patient_id,)
        cursor.execute(postgres_select_query, record_to_select)
        completed = cursor.fetchone()[0]

        postgres_select_query = """ SELECT station_id FROM station WHERE station_name = %s"""
        record_to_select = (station_name,)
        cursor.execute(postgres_select_query, record_to_select)
        station_id = cursor.fetchone()[0]

        completed.append(station_id)

        postgres_update_query = """ UPDATE patient SET completed_station = %s WHERE patient_id = %s"""
        record_to_update = (completed, patient_id,)
        cursor.execute(postgres_update_query, record_to_update)
        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into patient table")

    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to insert record into patient table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Read the questions from excel file


def read_questions(file):
    questions = []
    with open(file) as csvfile:
        file_reader = csv.reader(csvfile)
        for question in file_reader:
            questions.append(question[0])
    return questions

# I'm not sure how to handle this too, I guess we have to standardize a format for the excel questions - Rollie
# Insert questions from excel file into question table (I'm not v sure what to insert for the type, do we manually insert since there's not really a pattern?)


def save_questions(file):
    questions = read_questions(file)
    station_id = 0
    type_id = 0
    for q in questions:
        if (q == "Registration"):
            station_id = 1
            continue
        elif (q == "Tobacco Questionnare"):
            station_id = 2
            continue
        elif (q == "Anemia Questionnare"):
            station_id = 3
            continue
        elif (q == "BMI (Underweight measurement)"):
            station_id = 4
            continue
        elif (q == "Haemoglobin (Anemia measurement)"):
            station_id = 5
            continue
        elif (q == "Post campaign survey"):
            station_id = 6
            continue
        insert_question(q, station_id, type_id)
    print("all questions added")

# Get the questions and type from each station (I've printed the station name, questions, and types in list form but I'm not sure how to return it in the format needed)


def get_questions(station_name):
    try:
        connection = connect_db()
        cursor = connection.cursor()

        postgres_select_query = """ SELECT station_id FROM station WHERE station_name = %s"""
        record_to_select = (station_name,)
        cursor.execute(postgres_select_query, record_to_select)
        connection.commit()
        station_id = cursor.fetchall()
        print(station_name)

        if (not station_id is None):
            postgres_select_query = """ SELECT question FROM question WHERE station_id = %s"""
            cursor.execute(postgres_select_query, station_id)
            connection.commit()
            questions = cursor.fetchall()
            questions = [i[0] for i in questions]
            print(questions)

            postgres_select_query = """ SELECT type_info FROM type INNER JOIN question ON question.type_id = type.type_id WHERE question.station_id = %s"""
            cursor.execute(postgres_select_query, station_id)
            connection.commit()
            types = cursor.fetchall()
            types = [i[0] for i in types]
            print(types)

    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to select from question table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Get answers from a patient from a particular station (also printed in list form)


def get_answers(patient_id, station_id):
    try:
        connection = connect_db()
        cursor = connection.cursor()
        postgres_select_query = """ SELECT answers FROM answer WHERE patient_id = %s AND station_id = %s"""
        record_to_select = (patient_id, station_id,)
        cursor.execute(postgres_select_query, record_to_select)
        connection.commit()
        answers = cursor.fetchall()
        answers = [i[0] for i in answers]
        print(answers)
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to select from question table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# set availability of station to false


def set_availability_false(station_name):
    try:
        connection = connect_db()
        cursor = connection.cursor()

        postgres_select_query = """ UPDATE station SET availability = %s WHERE station_name = %s"""
        record_to_select = (False, station_name,)
        cursor.execute(postgres_select_query, record_to_select)
        connection.commit()
        print("Availability set to false")

    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to insert record into station table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# set availability of station to true


def set_availability_true(station_name):
    try:
        connection = connect_db()
        cursor = connection.cursor()

        postgres_select_query = """ UPDATE station SET availability = %s WHERE station_name = %s"""
        record_to_select = (True, station_name,)
        cursor.execute(postgres_select_query, record_to_select)
        connection.commit()
        print("Availability set to true")

    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to insert record into station table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Simple helper to drop all tables.


def drop_tables():
    try:
        connection = connect_db()
        cursor = connection.cursor()
        drop_command = """DROP TABLE IF EXISTS patient, station, type, question, answer"""
        cursor.execute(drop_command)
        connection.commit()
        print("Tables dropped successfully.")
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Failed to drop tables", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")


# Testing if info is inserted successfully


def insert_stuff_test():
    insert_type("text")
    insert_type("radio")
    insert_patient("busy", [])
    insert_patient("busy", [])
    insert_answer(1, "answer", 1, 1)
    insert_answer(1, "answer", 2, 1)

# Insert all the stations


def insert_stations():
    insert_station("Registration")
    insert_station("Tobacco Questionnare")
    insert_station("Anemia Questionnare")
    insert_station("BMI (Underweight measurement)")
    insert_station("Haemoglobin (Anemia measurement)")
    insert_station("Post campaign survey")


def insert_stuff_test_patch_4():
    # The commands I used to generate the output sent in the group - Wei Kit (5/8/20) This fails because I edited patient table - Rollie (10/8/20)

    drop_tables()
    db_setup()

    insert_patient('Busy', [1, 0])
    insert_patient('Available', [0, 2])
    insert_station('oralHealth')
    insert_station('bmi')
    insert_question('Name', 1, 1)
    insert_question('Age', 1, 1)

    # for patient 1
    insert_answer(1, 'Alice', 1, 1)
    insert_answer(1, 20, 2, 1)

    # for patient 2
    insert_answer(2, 'Bob', 1, 1)
    insert_answer(2, 35, 2, 1)


def main():
    # db_setup()
    # insert_stations()
    # insert_type("text")
    # insert_question("Name", 1, 1)
    # insert_question("NRIC No.", 1, 1)

    # save_questions("question.csv")
    # insert_stuff_test()
    # get_questions("Registration")
    # get_answers(1,1)
    #update_completed(1, "registration")
    # set_availability_false("Registration")
    # get_station_availability()

    # insert_stuff_test_patch_4()

    create_patient()

    # insert_type("text")
    # insert_question("Name", 1, 1)
    # insert_question("NRIC No.", 1, 1)


if __name__ == '__main__':
    # main()
    app.run(host='0.0.0.0', port=5000)

    # app.run(debug=True)
