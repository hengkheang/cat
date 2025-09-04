import streamlit as st
from PIL import Image
import requests
from io import BytesIO

st.set_page_config(page_title="ឆ្មា", page_icon="🐱", layout="centered")
st.write("Click 'Load More Cats' to see more cute cats!")

if "cats" not in st.session_state:
    st.session_state.cats = []

if st.button("Load Another Cat"):
    url = "https://cataas.com/cat"
    img = Image.open(BytesIO(requests.get(url).content))
    st.session_state.cats.append(img)

# Display all loaded cats
for i, cat in enumerate(st.session_state.cats):
    st.image(cat, caption=f"ឆ្មា #{i+1}", use_column_width=True)
