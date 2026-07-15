FROM ollama/ollama:latest

# Download the model during image build
RUN ollama serve & \
    sleep 5 && \
    ollama pull qwen3:0.6b && \
    pkill ollama

EXPOSE 11434

CMD ["ollama", "serve"]