import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from '@xenova/transformers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EMBEDDINGS_FILE = path.join(__dirname, '../data/embeddings.json');

let embedder = null;
let embeddingsData = null;

// Initialize model and load data once
async function init() {
  if (!embedder) {
    console.log('[Retrieve] Loading embedding model...');
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  if (!embeddingsData) {
    if (fs.existsSync(EMBEDDINGS_FILE)) {
      console.log('[Retrieve] Loading embeddings data...');
      embeddingsData = JSON.parse(fs.readFileSync(EMBEDDINGS_FILE, 'utf-8'));
    } else {
      console.warn('[Retrieve] WARNING: embeddings.json not found. Did you run the embed script?');
      embeddingsData = [];
    }
  }
}

// Cosine similarity between two vectors (arrays of numbers)
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function getRelevantChunks(query, topK = 3) {
  await init();

  if (embeddingsData.length === 0) {
    return [];
  }

  // Embed the incoming query
  const output = await embedder(query, { pooling: 'mean', normalize: true });
  const queryVector = Array.from(output.data);

  // Compute similarities
  const scoredChunks = embeddingsData.map(chunk => {
    const score = cosineSimilarity(queryVector, chunk.vector);
    return { ...chunk, score };
  });

  // Sort by score descending and take topK
  scoredChunks.sort((a, b) => b.score - a.score);
  return scoredChunks.slice(0, topK);
}
