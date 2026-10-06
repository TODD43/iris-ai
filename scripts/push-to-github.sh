import { create } from "zustand";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  shadeHex: string;
  finish: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  zone: string;
  price: string;
  description: string;
};

type BeautyState = {
  selectedProduct: Product | null;
  selectedEnvironment: string;
  voiceStatus: string;
  voiceTranscript: string;
  agentSpeech: string;
  guidanceScore: {
    symmetry: number;
    precision: number;
    blending: number;
  };
  setSelectedProduct: (product: Product) => void;
  setSelectedEnvironment: (environment: string) => void;
  setVoiceStatus: (status: string) => void;
  setVoiceTranscript: (text: string) => void;
  setAgentSpeech: (text: string) => void;
  setGuidanceScore: (score: { symmetry: number; precision: number; blending: number }) => void;
};

export const useBeautyStore = create<BeautyState>((set) => ({
  selectedProduct: null,
  selectedEnvironment: "daylight",
  voiceStatus: "idle",
  voiceTranscript: "",
  agentSpeech: "Ready when you are.",
  guidanceScore: {
    symmetry: 86,
    precision: 88,
    blending: 82,
  },
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setSelectedEnvironment: (environment) => set({ selectedEnvironment: environment }),
  setVoiceStatus: (status) => set({ voiceStatus: status }),
  setVoiceTranscript: (text) => set({ voiceTranscript: text }),
  setAgentSpeech: (text) => set({ agentSpeech: text }),
  setGuidanceScore: (score) => set({ guidanceScore: score }),
}));
