import Groq from "groq-sdk";


export async function getWeather({location}: {location: string}): Promise<string> {
  try {
    const response = await fetch(`/api/weather?location=${location}`);
    if (response.ok) {
      const weatherData = await response.json();
      return JSON.stringify(weatherData);
    } else {
      return JSON.stringify({ error: `Error: ${response.statusText}` });
    }
  } catch (error) {
    return JSON.stringify({ error: `Error: ${error}` });
  }
}

export const getWeatherSchema: Groq.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: "getWeather",
    description: "Get the weather for a given location",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string", description: "The location: e.g. Paris" },
      },
    },
  },
};

export async function calculateExpression ({expression}: {expression: string}): Promise<string> {
  const result = eval(expression);
  return JSON.stringify({result});
}

export const calculateExpressionSchema: Groq.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: "getCalculation",
    description: "Get calculation of given equation",
    parameters: {
      expression: { type: "string", description: "The math equation 1+1" },
    },
  },
};