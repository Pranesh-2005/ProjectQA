from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import AzureOpenAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Azure OpenAI Credentials from .env
endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
api_key = os.getenv("AZURE_OPENAI_API_KEY")
deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT")
api_version = os.getenv("AZURE_OPENAI_API_VERSION")

# Initialize Azure OpenAI Client
client = AzureOpenAI(
    api_key=api_key,
    api_version=api_version,
    azure_endpoint=endpoint
)

@app.route('/generate', methods=['POST'])
def generate_qna():
    data = request.json
    summary = data.get('summary')
    tech = data.get('tech')
    workflow = data.get('workflow', '')

    if not summary or not tech:
        return jsonify({'error': 'Project Summary and Tech Stack are mandatory!'}), 400

    prompt = f"""
Act as a Technical HR Interviewer.

A candidate has done the following project:

Project Summary: {summary}
Tech Stack: {tech}
Workflow/Architecture: {workflow}

Generate the top 10 project-based questions that an interviewer might ask related to this project in a technical interview.

For each question, provide a strong, detailed, and concise answer that will help the candidate confidently answer in an interview.

Present output in:

Question 1: ...
Answer 1: ...

and so on.
"""

    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful technical HR interviewer assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=2000,
            temperature=0.7,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            model=deployment
        )

        output = response.choices[0].message.content
        return jsonify({'output': output})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

