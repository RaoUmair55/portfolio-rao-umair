import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from '@xenova/transformers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const OUT_FILE = path.join(DATA_DIR, 'embeddings.json');

// Helper to chunk text safely
function chunkText(text, maxWords = 250) {
  // First split by double newlines (paragraphs/headings)
  const sections = text.split(/\n\s*\n/);
  const chunks = [];
  let currentChunk = [];
  let currentWords = 0;

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;
    
    const words = trimmed.split(/\s+/).length;
    
    // If a single section is huge, just push it (or we could split by single newline, but keeping it simple)
    if (words > maxWords) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk.join('\n\n'));
        currentChunk = [];
        currentWords = 0;
      }
      chunks.push(trimmed);
      continue;
    }
    
    if (currentWords + words > maxWords) {
      chunks.push(currentChunk.join('\n\n'));
      currentChunk = [trimmed];
      currentWords = words;
    } else {
      currentChunk.push(trimmed);
      currentWords += words;
    }
  }
  
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join('\n\n'));
  }
  
  return chunks;
}

async function main() {
  console.log('Starting embedding process...');
  
  // Ensure data dir exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('Created data directory. Please add .md files and run again.');
    return;
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.md'));
  if (files.length === 0) {
    console.log('No .md files found in backend/data/. Please add some and try again.');
    return;
  }

  // Load the embedding model locally
  console.log('Loading embedding model (@xenova/transformers all-MiniLM-L6-v2)...');
  const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  console.log('Model loaded!');

  const allEmbeddings = [];

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    console.log(`Processing ${file}...`);
    const chunks = chunkText(content);
    console.log(`- Extracted ${chunks.length} chunks.`);

    for (let i = 0; i < chunks.length; i++) {
      const text = chunks[i];
      // Generate embedding vector
      const output = await embedder(text, { pooling: 'mean', normalize: true });
      // Output is a tensor, convert to standard array
      const vector = Array.from(output.data);
      
      allEmbeddings.push({
        source: file,
        chunkIndex: i,
        text,
        vector
      });
    }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(allEmbeddings));
  console.log(`Successfully generated and saved ${allEmbeddings.length} embeddings to ${OUT_FILE}`);
}

main().catch(console.error);
