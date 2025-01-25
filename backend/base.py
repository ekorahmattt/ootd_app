from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore
from PIL import Image, ImageOps
import subprocess
import os

api = Flask(__name__)
CORS(api)

MODEL_PATH = os.environ['MODEL_PATH']

@api.route('/process', methods=['POST'])
def process():
    model = request.files.get('model_img')
    garment = request.form.get('garment_img')

    if model:
        if os.path.exists("../public"+MODEL_PATH):
            os.remove("../public"+MODEL_PATH)

        image = Image.open(model)
        cropped_img = ImageOps.fit(image, (768, 1024), centering=(0.5,0.5))
        cropped_img.save("../public"+MODEL_PATH)

        # script_path = os.path.join(os.getcwd(), 'run', 'run_ootd.py')
        # command = ['python', script_path,
        #            '--model_path', ]

        return jsonify({
            "message" : "Berhasil Disimpan",
            "model_img": MODEL_PATH,
        })
    else:
        return jsonify({
            "message" : "Gagal Disimpan"
        })
    


    
