from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

@app.route('/')
def test():
    return render_template("testIndex.html")

@app.route('/poem.json', methods=["GET"])
def poem():
    output = list()
    words = ["this", "that", "other"]
    for word in words:
        output.append(word)
    return jsonify({'output': output})



if __name__ == '__main__':
    app.run(debug=True)
