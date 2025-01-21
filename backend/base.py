from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore
from PIL import Image, ImageOps
import os

api = Flask(__name__)
CORS(api)

MODEL_PATH = os.environ['MODEL_PATH']

@api.route('/process', methods=['POST'])
def process():
    model = request.files.get('model_img')
    garment = request.form.get('garment_img')

    if model:
        if os.path.exists(MODEL_PATH):
            os.remove(MODEL_PATH)

        image = Image.open(model)
        cropped_img = ImageOps.fit(image, (768, 1024), centering=(0.5,0.5))
        cropped_img.save(MODEL_PATH)

        return jsonify({
            "message" : "Berhasil Disimpan",
            "model_img": MODEL_PATH,
        })
    else:
        return jsonify({
            "message" : "Gagal Disimpan"
        })
    


    
