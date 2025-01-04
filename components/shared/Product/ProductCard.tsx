import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const ProductCard = ({ product }: { product: any }) => {
  const price = product.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center p-0">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className="gap-4 grid p-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="font-medium text-sm">{product.name}</h2>
        </Link>
        <p className="text-sm">{product.description}</p>
        <div className="flex-between gap-4">
          <p className="font-bold">{product.rating} Stars</p>
          {product.stock > 0 ? (
            <p className="font-bold">{price}</p>
          ) : (
            <p className="font-bold text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
