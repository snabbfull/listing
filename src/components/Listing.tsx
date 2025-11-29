interface Item {
  listing_id: number;
  url?: string;
  MainImage?: { url_570xN: string };
  title?: string;
  price?: string;
  quantity?: number;
  currency_code?: string | undefined;
  state?: string;
}

interface ListingProps {
  data: Item[];
}

function getStockClass(qty: number) {
  if (qty <= 10) return "stock-low";
  if (qty <= 20) return "stock-medium";
  return "stock-high";
}

function getCurrency(currency: string | undefined) {
  if (currency === "USD") return "$";
  if (currency === "EUR") return "€";
  if (currency === "GBP") return "£";
  return currency + " ";
}

export function Listing({ data }: ListingProps) {
  const validData = data.filter(
    (item) => item.state === "active" && item.MainImage && item.title
  );

  return (
    <div className="product-grid">
      {validData.map((item: Item) => (
        <div className="product-card" key={item.listing_id}>
          <img
            src={item.MainImage?.url_570xN}
            alt={item.title}
            className="product-image"
          />
          <div className="product-info">
            <h3 className="product-title">
              {item.title && item.title.length > 50
                ? item.title.slice(0, 50) + "…"
                : item.title}
            </h3>
            <div className="price-container">
              <div className="product-price">
                {getCurrency(item.currency_code)}
                {item.price}
              </div>
              <span
                className={`stock-badge ${getStockClass(item.quantity ?? 0)}`}
              >
                {item.quantity} left
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
