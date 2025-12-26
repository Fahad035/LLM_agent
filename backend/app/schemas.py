from pydantic import BaseModel, Field


class PromptRequest(BaseModel):
    prompt: str = Field(
        ...,
        min_length=1,
        max_length=5000,
        description="User prompt sent to the LLM"
    )


class LLMResponse(BaseModel):
    response: str = Field(
        ...,
        description="Generated response from Gemini model"
    )
