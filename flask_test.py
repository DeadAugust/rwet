from flask import Flask
import random

app = Flask(__name__)

@app.route("/hello")
def hello():
    greet = random.choice(["Hello", "Greetings", "Hey"])
    place = random.choice(["world", "galaxy"])
    return greet + ", " + place

app.run(debug=True)
                        