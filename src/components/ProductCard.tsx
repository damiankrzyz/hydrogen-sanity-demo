import {Image, Link} from '@shopify/hydrogen';
import {Product} from '@shopify/hydrogen/dist/esnext/storefront-api-types';
import {Suspense} from 'react';
import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';

type Props = {
  storefrontProduct: Product;
};

/**
 * A shared component that displays a single product to allow buyers to quickly identify a particular item of interest
 */
export default function ProductCard({storefrontProduct}: Props) {
  const selectedVariant = storefrontProduct.variants.edges[0].node;

  if (selectedVariant == null) {
    return null;
  }

  return (
    <div
      className="relative mb-4"
      // style={{
      //   color: 'red',
      // }}
    >
      <Link to={`/products/${storefrontProduct.handle}`}>
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded bg-lightGray object-cover">
          {selectedVariant.image ? (
            <Image
              className="absolute h-full w-full transform bg-cover bg-center object-cover object-center transition-all duration-500 ease-in-out"
              data={selectedVariant.image}
            />
          ) : null}

          {/* Sale badge */}
          {selectedVariant?.availableForSale &&
            selectedVariant?.compareAtPriceV2 && (
              <div className="absolute top-6 left-6 flex place-content-center rounded-sm bg-white px-1.5 py-1 text-sm font-bold uppercase leading-none text-red">
                Sale
              </div>
            )}
        </div>

        <div className="mt-3 text-md">
          <div className="space-y-1">
            {/* Title */}
            <div className="font-bold">{storefrontProduct.title}</div>

            {/* Vendor */}
            {storefrontProduct.vendor && (
              <div className="text-gray">{storefrontProduct.vendor}</div>
            )}

            {/* TODO: variant types */}
          </div>

          {/* Price / sold out */}
          {selectedVariant?.availableForSale ? (
            <div className="mt-3 flex font-bold">
              {selectedVariant.compareAtPriceV2 && (
                <span className="text-gray">
                  <Suspense fallback={null}>
                    <MoneyCompareAtPrice
                      money={selectedVariant.compareAtPriceV2}
                    />
                  </Suspense>
                </span>
              )}
              <Suspense fallback={null}>
                <MoneyPrice money={selectedVariant.priceV2} />
              </Suspense>
            </div>
          ) : (
            <div className="mt-3 font-bold uppercase text-gray">Sold out</div>
          )}
        </div>
      </Link>
    </div>
  );
}
