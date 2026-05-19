import sys
import os
# pyrefly: ignore [missing-import]
from PIL import Image, ImageDraw, ImageFont

# Define paths
input_img = r"C:\Users\USER4\.gemini\antigravity\brain\a097e869-db68-4224-b8f7-102c733c89ed\yanggu_tourist_map_v2_1779167254248.png"
output_img = r"c:\Users\USER4\Desktop\양구군청\images\yanggu_tourist_map_official.png"
font_path = r"C:\Windows\Fonts\malgun.ttf"

# Load image
try:
    img = Image.open(input_img).convert("RGBA")
except Exception as e:
    print(f"Error loading image: {e}")
    sys.exit(1)

draw = ImageDraw.Draw(img)

# Load font
try:
    title_font = ImageFont.truetype(font_path, 45)
    label_font = ImageFont.truetype(font_path, 30)
except Exception as e:
    print(f"Error loading font: {e}")
    sys.exit(1)

width, height = img.size

# Function to draw text with background box and outline
def draw_label(text, position, font, is_title=False):
    # text bbox
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    
    padding_x = 20 if is_title else 15
    padding_y = 10 if is_title else 8
    
    x, y = position
    rect_x1 = x - tw/2 - padding_x
    rect_y1 = y - th/2 - padding_y
    rect_x2 = x + tw/2 + padding_x
    rect_y2 = y + th/2 + padding_y
    
    # Draw shadow
    draw.rounded_rectangle([rect_x1+3, rect_y1+3, rect_x2+3, rect_y2+3], radius=10, fill=(0,0,0,80))
    # Draw box
    bg_color = (255, 255, 255, 240) if not is_title else (255, 240, 240, 255)
    outline_color = (0, 135, 90, 255) if not is_title else (220, 50, 50, 255)
    draw.rounded_rectangle([rect_x1, rect_y1, rect_x2, rect_y2], radius=10, fill=bg_color, outline=outline_color, width=3)
    
    # Draw text
    text_color = (30, 30, 30, 255)
    draw.text((x - tw/2, y - th/2 - 5), text, font=font, fill=text_color)

# Add main title
draw_label("🗺️ 양구군 공식 관광지도 (2026 개정판)", (width/2, 80), title_font, is_title=True)

# Define locations (scattered around the map in logical spots)
locations = [
    ("한반도섬", (width * 0.5, height * 0.45)),
    ("두타연", (width * 0.2, height * 0.2)),
    ("해안분지(펀치볼)", (width * 0.8, height * 0.25)),
    ("을지전망대", (width * 0.85, height * 0.15)),
    ("제4땅굴", (width * 0.75, height * 0.18)),
    ("박수근미술관", (width * 0.3, height * 0.7)),
    ("양구백자박물관", (width * 0.5, height * 0.75)),
    ("국토정중앙천문대", (width * 0.7, height * 0.8)),
    ("양구수목원", (width * 0.8, height * 0.6))
]

# Draw lines from center to locations to make it look like a network map
for label, pos in locations:
    draw_label(label, pos, label_font)

# Save result
img.convert("RGB").save(output_img)
print("Map created successfully!")
