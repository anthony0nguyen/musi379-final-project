from PIL import Image, ImageStat
import os
import csv

input_folder = 'faces'
side = (16, 16) # edit side in sketch.js to match

files = os.listdir(input_folder)
im_files = [f for f in files if f.endswith('.png')]
csv_header = ['id', 'filename', 'brightness']
image_dict = []

# make/clear output folder
os.makedirs('output_images', exist_ok=True)
for file in os.scandir('output_images'): 
    os.remove(file.path)

for i in range(len(im_files)):
    im = Image.open(input_folder + '/' + im_files[i])
    im_small = im.convert('L').resize(side)
    b = ImageStat.Stat(im_small).mean[0] / 255 # calculate brightness
    image_dict.append({'id': i, 'filename': im_files[i], 'brightness': b})
    im_small.save('output_images/' + im_files[i])

with open('images.csv', 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames = csv_header)
    writer.writeheader()
    writer.writerows(image_dict)
