import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCategoryPage } from "@/components/sections/ProductCategoryPage";
import { getProductCategory, productCategories } from "@/data/products";
import { createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

/** Seules les 6 catégories connues sont générées ; tout autre slug renvoie 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return productCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getProductCategory(slug);
  if (!category) return {};
  return createMetadata({
    title: category.name,
    description: `${category.tagline} ${category.intro}`.slice(0, 160),
    path: `/produits/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getProductCategory(slug);
  if (!category) notFound();
  return <ProductCategoryPage category={category} />;
}
