from PIL import Image, ImageChops
import os

def remove_white(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # If the pixel is close to white (threshold), set transparency
        # Also handle checkerboard patterns better by checking a small radius if needed, 
        # but pure white is easier.
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    # Define images to process
    base_brain = "/Users/samandar/.gemini/antigravity/brain/c018bbc0-812a-45a5-990e-e07dad5d66cd/"
    dest_path = "/Users/samandar/Downloads/wegwiser-main/src/assets/icons/"
    
    mapping = {
        "3d_german_flag_badge_white_1775045654175.png": "3d_german_flag.png",
        "3d_graduation_cap_white_1775045709328.png": "3d_graduation_cap.png",
        "3d_university_white_1775045739639.png": "3d_university.png"
    }

    for src, dest in mapping.items():
        src_full = os.path.join(base_brain, src)
        dest_full = os.path.join(dest_path, dest)
        if os.path.exists(src_full):
            remove_white(src_full, dest_full)
            print(f"Processed {src} -> {dest}")
        else:
            print(f"Skipping {src} (not found)")
