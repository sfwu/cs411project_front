from flask import Flask 

app = Flask(__main__)

@app.route('/')
def my_index():
    return "hello"