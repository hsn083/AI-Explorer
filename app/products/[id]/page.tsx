import { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';
import StructuredData from '@/components/StructuredData';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aiexplorer.website';
    const response = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product || product.error) {
    return {
      title: 'Product Not Found | AI Explorer',
    };
  }

  const productName = product.name || 'Product';
  const productDescription = product.description || 'Premium digital product from AI Explorer';
  const productImage = product.image || 'https://www.aiexplorer.website/og-image.png';

  return {
    title: `${productName} | AI Explorer`,
    description: `Get ${productName} from AI Explorer. Explore premium digital tools, subscriptions, and resources designed to improve productivity and creativity.`,
    alternates: {
      canonical: `https://www.aiexplorer.website/products/${id}`,
    },
    openGraph: {
      title: `${productName} | AI Explorer`,
      description: `Get ${productName} from AI Explorer. Explore premium digital tools, subscriptions, and resources designed to improve productivity and creativity.`,
      url: `https://www.aiexplorer.website/products/${id}`,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  let productJsonLd = null;
  
  if (product && !product.error) {
    const oldPrice = product.originalPrice || product.oldPrice;
    const productImage = product.image || 'https://www.aiexplorer.website/og-image.png';
    
    const offerData: any = {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'PKR',
      availability: 'https://schema.org/InStock',
      url: `https://www.aiexplorer.website/products/${id}`,
    };

    if (oldPrice) {
      offerData.priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }
    
    productJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: productImage,
      url: `https://www.aiexplorer.website/products/${id}`,
      offers: offerData,
      category: product.category,
    };
  }

  return (
    <>
      {productJsonLd && <StructuredData data={productJsonLd} />}
      <ProductDetailClient params={params} />
    </>
  );
}
