import speech_recognition as sr
import requests
import json
from gtts import gTTS
import os

# Function to recognize speech using SpeechRecognition library
def recognize_speech():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    with microphone as source:
        recognizer.adjust_for_ambient_noise(source)
        print("Listening...")
        audio = recognizer.listen(source)

    try:
        print("Recognizing...")
        # Using Google Web Speech API for speech recognition
        recognized_text = recognizer.recognize_google(audio)
        print(f"Recognized: {recognized_text}")
        return recognized_text

    except sr.UnknownValueError:
        print("Speech recognition could not understand audio")
        return None

    except sr.RequestError as e:
        print(f"Could not request results from Google Web Speech API; {e}")
        return None

# Function to interact with Groq for generating a response
def generate_response(input_text):
    groq_url = "https://api.groq.com/openai/v1/audio/transcriptions"
    api_key = "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"  # Replace with your Groq API key
    model_id = "whisper-large-v3"  # Replace with your Groq model ID

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    # Check for specific intents or keywords to trigger life advice or skills response
    if "life advice" in input_text.lower():
        prompt = "Can you give me some life advice?"
    elif "skills" in input_text.lower() or "improve" in input_text.lower():
        prompt = "I need help with improving my skills."
    else:
        prompt = input_text  # Use original input if no specific intent is identified

    if prompt is None:
        prompt = input_text

    payload = {
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "model": model_id,
        "temperature": 0.7,
        "max_tokens": 1024,
        "seed": 42,
        "top_p": 1
    }

    try:
        response = requests.post(groq_url, headers=headers, json=payload)
        response_json = response.json()
        assistant_response = response_json["choices"][0]["message"]["content"]
        print(f"Assistant: {assistant_response}")
        return assistant_response

    except Exception as e:
        print(f"Error interacting with Groq: {e}")
        return None

# Function to generate speech from text using gTTS
def generate_speech(text):
    tts = gTTS(text=text, lang='en')
    tts.save("output.mp3")
    os.system("mpg321 output.mp3")  # Install mpg321 for Linux or use playsound for Windows

# Modify main function to include intent recognition and tailored responses
def main():
    recognized_text = recognize_speech()
    if recognized_text:
        assistant_response = generate_response(recognized_text)
        if assistant_response:
            print("Assistant:", assistant_response)
            generate_speech(assistant_response)
        else:
            print("Failed to generate assistant response")

if __name__ == "__main__":
    main()
