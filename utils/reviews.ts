import reviews from '@/data/reviews.json';

export interface Review {
  id: number;
  productId: number;
  customerName: string;
  rating: number;
  reviewText: string;
  date: string;
  verifiedPurchase: boolean;
  isDemo: boolean;
}

export function getProductReviews(productId: number): Review[] {
  return reviews.filter((review) => review.productId === productId);
}

export function getProductRating(productId: number): { rating: number; count: number } {
  const productReviews = getProductReviews(productId);
  
  if (productReviews.length === 0) {
    return { rating: 0, count: 0 };
  }
  
  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / productReviews.length;
  
  return {
    rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
    count: productReviews.length,
  };
}

export function getRandomReviews(count: number): Review[] {
  const shuffled = [...reviews].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
