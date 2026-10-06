export type AssemblyAIStreamHandlers = {
  apiKey: string;
  onPartial?: (transcript: string) => void;
  onFinal?: (transcript: string) => void;
  onError?: (message: string) => void;
};

export function startAssemblyAIStream({
  apiKey,
  onPartial,
  onFinal,
  onError,
}: AssemblyAIStreamHandlers) {
  const ws = new WebSocket("wss://streaming.assemblyai.com/v3/ws");

  let streamStarted = false;
  let audioContext: AudioContext | null = null;
  let mediaStream: MediaStream | null = null;
  let sourceNode: MediaStreamAudioSourceNode | null = null;
  let processingNode: ScriptProcessorNode | null = null;

  const close = () => {
    if (processingNode) {
      processingNode.disconnect();
      processingNode.onaudioprocess = null;
    }

    if (sourceNode) sourceNode.disconnect();
    if (audioContext) audioContext.close();
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }

    if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
      ws.close();
    }
  };

  ws.onopen = async () => {
    ws.send(
      JSON.stringify({
        type: "Connect",
        sample_rate: 16000,
        format: "pcm_s16le",
        authorization: apiKey,
      }),
    );

    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      audioContext = new AudioContext({ sampleRate: 16000 });
      sourceNode = audioContext.createMediaStreamSource(mediaStream);
      processingNode = audioContext.createScriptProcessor(4096, 1, 1);

      sourceNode.connect(processingNode);
      processingNode.connect(audioContext.destination);

      processingNode.onaudioprocess = (event) => {
        if (!streamStarted || ws.readyState !== WebSocket.OPEN) return;

        const input = event.inputBuffer.getChannelData(0);
        const pcm = new Int16Array(input.length);

        for (let i = 0; i < input.length; i += 1) {
          const sample = Math.max(-1, Math.min(1, input[i]));
          pcm[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        }

        ws.send(pcm.buffer); 
      };

      streamStarted = true;
    } catch (error) {
      console.error("AssemblyAI microphone bootstrap failed", error);
      onError?.("Unable to access your microphone. Please allow microphone permissions.");
      close();
    }
  };

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      const transcriptType = message?.type;
      const text = message?.text ?? message?.transcript ?? "";

      if (transcriptType === "PartialTranscript" && typeof text === "string" && text.length > 0) {
        onPartial?.(text);
      }

      if (transcriptType === "FinalTranscript" && typeof text === "string" && text.length > 0) {
        onFinal?.(text);
      }

      if (transcriptType === "Error" || message?.error) {
        onError?.(message?.error || "Voice stream error. Please check your API key.");
      }
    } catch {
      // Ignore malformed frames.
    }
  };

  ws.onerror = () => {
    onError?.("Connection error: unable to reach AssemblyAI stream.");
  };

  return close;
}
