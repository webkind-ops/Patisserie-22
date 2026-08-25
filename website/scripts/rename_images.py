import os
import shutil
import re

base_dir = r"c:\Users\yashm\Desktop\patisseire'22\codebase\qr menu"
photos_dir = os.path.join(base_dir, "photos")
target_dir = os.path.join(base_dir, "public", "images")

# Create target directory
os.makedirs(target_dir, exist_ok=True)

# Mapping of original filenames to their descriptive names
mapping = {
    "IMG-20260824-WA0019.jpg": "Belgian Chocolate Pastry",
    "IMG-20260824-WA0032.jpg": "White frosted Bento Cake",
    "IMG-20260824-WA0034.jpg": "Chocolate Cake Happy Birthday",
    "IMG-20260824-WA0036.jpg": "Chocolate Bento Cake",
    "IMG-20260824-WA0037.jpg": "Box of 4 Chocolates",
    "IMG-20260824-WA0038.jpg": "Blue Diwali Hamper",
    "IMG-20260824-WA0039.jpg": "Red Diwali Hamper",
    "IMG-20260824-WA0041.jpg": "Basic Vanilla Cupcake",
    "IMG-20260824-WA0043.jpg": "Brownie Fudge Cheesecake Jar",
    "IMG-20260824-WA0045.jpg": "Lotus Biscoff Pastry",
    "IMG-20260824-WA0047.jpg": "Chocolate Baked Cheesecake Jar",
    "IMG-20260824-WA0049.jpg": "Red Velvet Cupcake",
    "IMG-20260824-WA0051.jpg": "Lotus Biscoff Cupcake",
    "IMG-20260824-WA0053.jpg": "Box of 8 Assorted Brownies",
    "IMG-20260824-WA0055.jpg": "Box of 8 Chocolates",
    "IMG-20260824-WA0057.jpg": "Box of 8 Chocolates",
    "IMG-20260824-WA0059.jpg": "Box of 16 Chocolates Purple Box",
    "IMG-20260824-WA0061.jpg": "Box of 8 Chocolates Rakhi Box",
    "IMG-20260824-WA0063.jpg": "Box of 4 Assorted Brownies",
    "IMG-20260824-WA0065.jpg": "Box of 16 Chocolates Brownie Bites",
    "IMG-20260824-WA0067.jpg": "Lotus Biscoff Tub",
    "IMG-20260824-WA0068.jpg": "Blueberry Cupcake",
    "IMG-20260824-WA0070.jpg": "Classic Pineapple Pastry",
    "IMG-20260824-WA0072.jpg": "Blueberry Cheesecake Jar",
    "IMG-20260824-WA0074.jpg": "Chocolate Truffle Pastry",
    "IMG-20260824-WA0075.jpg": "Nutella Hazelnut Pastry",
    "IMG-20260824-WA0077.jpg": "Classic Walnut Brownie",
    "IMG-20260824-WA0079.jpg": "Lotus Biscoff Brownie",
    "IMG-20260824-WA0081.jpg": "Chocolate Rose Cupcake",
    "Logo.JPG": "Patisserie 22 Logo"
}

def clean_filename(name):
    name = name.lower()
    name = re.sub(r'[^a-z0-9\s]', '', name)
    name = re.sub(r'\s+', '-', name.strip())
    return name

seen_names = {}

for original_file, desc in mapping.items():
    src_path = os.path.join(photos_dir, original_file)
    
    if not os.path.exists(src_path):
        print(f"File not found: {original_file}")
        continue
        
    base_name = clean_filename(desc)
    ext = os.path.splitext(original_file)[1].lower()
    
    if base_name in seen_names:
        seen_names[base_name] += 1
        new_name = f"{base_name}-{seen_names[base_name]}{ext}"
    else:
        seen_names[base_name] = 1
        new_name = f"{base_name}{ext}"
        
    dst_path = os.path.join(target_dir, new_name)
    
    shutil.copy2(src_path, dst_path) # copying to keep original safe
    print(f"Moved: {original_file} -> {new_name}")

print("All files processed.")
