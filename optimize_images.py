import os
from PIL import Image, ImageOps

def optimize_images(directories, max_size=1920):
    for directory in directories:
        if not os.path.exists(directory):
            print(f"Skipping {directory}, not found.")
            continue
            
        for root, dirs, files in os.walk(directory):
            for file in files:
                ext = file.split('.')[-1].lower()
                if ext in ['jpg', 'jpeg', 'png']:
                    file_path = os.path.join(root, file)
                    new_filename = file.rsplit('.', 1)[0] + '.webp'
                    new_file_path = os.path.join(root, new_filename)
                    
                    try:
                        print(f"Processing: {file_path}")
                        with Image.open(file_path) as img:
                            # CRITICAL FIX: Handle EXIF orientation
                            img = ImageOps.exif_transpose(img)
                            
                            if img.mode not in ('RGB', 'RGBA'):
                                img = img.convert('RGBA')
                            
                            width, height = img.size
                            if width > max_size or height > max_size:
                                if width > height:
                                    new_width = max_size
                                    new_height = int((max_size / width) * height)
                                else:
                                    new_height = max_size
                                    new_width = int((max_size / height) * width)
                                    
                                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                                print(f"  Resized from {width}x{height} to {new_width}x{new_height}")
                            
                            # Save as WebP
                            img.save(new_file_path, 'webp', quality=80, method=6)
                            print(f"  Saved to: {new_file_path}")
                            
                        # Remove original file
                        os.remove(file_path)
                        print(f"  Removed original: {file_path}")
                    except Exception as e:
                        print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    base_dir = "/Users/samandar/Downloads/wegwiser-main"
    dirs_to_process = [
        os.path.join(base_dir, "public"),
        os.path.join(base_dir, "src/assets")
    ]
    optimize_images(dirs_to_process)
