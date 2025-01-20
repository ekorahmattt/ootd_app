from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore
from PIL import Image, ImageOps

api = Flask(__name__)
CORS(api)

@api.route('/process', methods=['POST'])
def process():
    model = request.files.get('model_img')
    garment = request.form.get('garment_img')
    # print(model)
    if model:

        image = Image.open(model)
        cropped_img = ImageOps.fit(image, (768, 1024), centering=(0.5,0.5))
        cropped_img.save("../public/img/model_img.png")

        return jsonify({
            "message" : "Berhasil Disimpan",
            "clothes": garment,
        })
    else:
        return jsonify({
            "message" : "Gagal Disimpan"
        })
    


    
