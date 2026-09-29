export interface Product {
  _id?: string;
  id?: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  originalPrice?: number | null;
  description: string;
  features: string[];
  benefits: string[];
  image: string;
  popular: boolean;
  badge?: string | null;
  duration: string;
  sold?: number;
  soldCount?: number;
}

// Normalize text for search (remove special chars, lowercase)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Check if query matches text with fuzzy matching
function fuzzyMatch(query: string, text: string): boolean {
  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);
  
  if (normalizedQuery.length === 0) return false;
  
  // Exact match
  if (normalizedText.includes(normalizedQuery)) return true;
  
  // Check if all characters of query appear in order in text
  let queryIndex = 0;
  for (let i = 0; i < normalizedText.length && queryIndex < normalizedQuery.length; i++) {
    if (normalizedText[i] === normalizedQuery[queryIndex]) {
      queryIndex++;
    }
  }
  
  return queryIndex === normalizedQuery.length;
}

// Calculate relevance score
function calculateRelevanceScore(query: string, product: Product): number {
  const normalizedQuery = normalizeText(query);
  const normalizedName = normalizeText(product.name);
  const normalizedCategory = normalizeText(product.category);
  const normalizedDescription = normalizeText(product.description);
  
  let score = 0;
  
  // Exact name match (highest priority)
  if (normalizedName === normalizedQuery) score += 100;
  // Name starts with query
  else if (normalizedName.startsWith(normalizedQuery)) score += 80;
  // Name contains query
  else if (normalizedName.includes(normalizedQuery)) score += 60;
  // Fuzzy name match
  else if (fuzzyMatch(query, product.name)) score += 40;
  
  // Category match
  if (normalizedCategory.includes(normalizedQuery)) score += 30;
  
  // Description match
  if (normalizedDescription.includes(normalizedQuery)) score += 20;
  
  // Features/benefits match
  const allFeatures = [...(product.features || []), ...(product.benefits || [])].join(' ');
  if (normalizeText(allFeatures).includes(normalizedQuery)) score += 15;
  
  return score;
}

export async function searchProducts(query: string, limit: number = 8): Promise<Product[]> {
  if (!query || query.trim().length < 1) {
    return [];
  }
  
  try {
    const response = await fetch(`/api/products?search=${encodeURIComponent(query.trim())}`);
    const products = await response.json();
    
    // Calculate scores for all products
    const scoredProducts = products.map((product: Product) => ({
      product,
      score: calculateRelevanceScore(query.trim(), product)
    }));
    
    // Filter products with score > 0 and sort by score
    const filtered = scoredProducts
      .filter((item: any) => item.score > 0)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, limit)
      .map((item: any) => item.product);
    
    return filtered;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
