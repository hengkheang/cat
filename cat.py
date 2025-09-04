import streamlit as st
from PIL import Image
import requests
from io import BytesIO

st.title("ឆ្មា​ & Dog Pic")

if "dc" not in st.session_state:
    st.session_state.dc = []

if st.button("Load ឆ្មា"):
    url = "https://cataas.com/cat"
    img = Image.open(BytesIO(requests.get(url).content))
    st.session_state.dc.append(img)

if st.button("Load Dawg"):
    url = "https://dog.ceo/api/breeds/image/random"
    img = Image.open(BytesIO(requests.get(url).content))
    st.session_state.dc.append(img)

for i, dc in enumerate(st.session_state.dc):
    st.image(dc, caption=f"​​{i+1}", use_column_width=True)
