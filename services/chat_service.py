

from schemas.chat_schema import InputMessage

from openai import OpenAI

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key="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",
)






def generate_response(data_in: InputMessage):
    message = data_in.message

    try:
        completion = client.chat.completions.create(
            model="openai/gpt-oss-20b:free",
            #model="deepseek/deepseek-v4-flash:free",
            messages=[
                {
                    "role": "system",
                    "content": "Eres un asistente que responde en español de manera precisa y breve."},
                {
                    "role": "user", 
                    "content": message},
            ],
        )


        print("respuesta del modelo" , completion.choices[0].message.content)
        response = completion.choices[0].message.content
    except Exception as e:
        print(f"Error generating response: {e}")
        response = "Sorry, I couldn't generate a response at this time."


    return response
