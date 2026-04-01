import { useMemo, useState } from "react";
import productsData from "./data/products.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bannerImg from "./assets/banner.png";

function App() {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("products");

     const addedIds = useMemo(() => {
      return new Set(cart.map((item) => item.id));
     }, [cart]);

     const addToCart = (product) => {
      setCart((prev) => [...prev, product]);
      toast.success(`${product.name} added to cart`);
    };

  const removeFromCart = (indexToRemove) => {
        const removedItem = cart[indexToRemove];
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
    toast.error(`${removedItem.name} removed from cart`);
  };

  const handleCheckout = () => {
         if (cart.length === 0) {
          toast.warning("Your cart is empty");
           return;
    }

         setCart([]);
          toast.info("Proceed to checkout successful");
  };

       const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

        const getBadgeClass = (tagType) => {
        if (tagType === "popular") return "badge badge-popular";
      if (tagType === "new") return "badge badge-new";
      return "badge badge-bestseller";
  };

    const getProductEmoji = (product) => {
    const icon = String(product.icon || "").toLowerCase();
       const name = String(product.name || "").toLowerCase();

            if (icon.includes("writing") || name.includes("writing")) return "✍️";
            if (icon.includes("design") || name.includes("design")) return "🎨";
            if (icon.includes("stock") || name.includes("stock")) return "📷";
            if (icon.includes("automation") || name.includes("automation")) return "⚙️";
            if (icon.includes("resume") || name.includes("resume")) return "📄";
            if (icon.includes("social") || name.includes("social")) return "📱";
            return "🛠️";
  };

  return (
    <div className="page">
      <ToastContainer position="top-right" autoClose={1800} />

      <header className="navbar-wrap">
        <div className="container navbar">
          <h1 className="logo">DigiTools</h1>

          <nav className="nav-links">
            <a href="#products">Products</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>

    <div className="nav-actions">
            <button
              className="icon-cart-btn hover-lift"
              onClick={() => setActiveTab("cart")}
            >
              🛒
              <span className="cart-count-badge">{cart.length}</span>
        </button>

            <button className="login-btn hover-lift">Login</button>
            <button className="small-btn hover-lift">Get Started</button>
      </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
        <span className="hero-dot"></span>
              New: AI-Powered Tools Available
            </div>

            <h2 className="hero-title">
              Supercharge Your
              <br />
              Digital Workflow
            </h2>

       <p className="hero-text">
              Access premium AI tools, design assets, templates, and productivity
              software—all in one place. Start creating faster today.
       </p>

            <div className="hero-buttons">
              <button className="primary-btn hover-lift">Explore Products</button>
              <button className="outline-btn hover-lift">▶ Watch Demo</button>
            </div>
          </div>

          <div className="hero-image-wrap">
            <img src={bannerImg} alt="Digital workflow" className="hero-image" />
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <h3>50K+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item stat-middle">
            <h3>200+</h3>
            <p>Premium Tools</p>
          </div>
          <div className="stat-item">
            <h3>4.9</h3>
            <p>Rating</p>
          </div>
        </div>
      </section>

      <main id="products" className="products-section">
        <div className="container">
          <div className="section-heading">
            <h2>Premium Digital Tools</h2>
            <p>
              Choose from our curated collection of premium digital products designed
              to boost your productivity and creativity.
            </p>
          </div>

          <div className="toggle-box">
            <button
              className={
                activeTab === "products"
                  ? "toggle-btn active hover-lift"
                  : "toggle-btn hover-lift"
              }
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>

            <button
              className={
                activeTab === "cart"
                  ? "toggle-btn active hover-lift"
                  : "toggle-btn hover-lift"
              }
              onClick={() => setActiveTab("cart")}
            >
              Cart ({cart.length})
            </button>
          </div>

          {activeTab === "products" && (
            <div className="product-grid">
              {productsData.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-card-top">
                    <div className="product-icon-box">
                      <span className="emoji-icon">{getProductEmoji(product)}</span>
                    </div>

                    <span className={getBadgeClass(product.tagType)}>
                      {product.tag}
                    </span>
                  </div>

                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-desc">{product.description}</p>

                  <div className="price-row">
                    <span className="price">${product.price}</span>
                    <span className="period">/{product.period}</span>
                  </div>

                  <ul className="feature-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>

                  <button
                    className={addedIds.has(product.id) ? "buy-btn added-btn hover-lift" : "buy-btn hover-lift"}
                    onClick={() => addToCart(product)}
                  >
                    {addedIds.has(product.id) ? "Added To Cart" : "Buy Now"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "cart" && (
            <div className="cart-screen">
              <div className="cart-card">
                <h3>Your Cart</h3>

           {cart.length === 0 ? (
                  <p className="empty-text">Your cart is empty. Please add some products.</p>
                ) : (
                  <>
                    <div className="cart-list">
                      {cart.map((item, index) => (
                        <div className="cart-item" key={`${item.id}-${index}`}>
                          <div className="cart-item-left">
                            <div className="product-icon-box">
                              <span className="emoji-icon small-emoji">
                       {getProductEmoji(item)}
                              </span>
                            </div>

                            <div>
                              <h4>{item.name}</h4>
                              <p>${item.price}</p>
                            </div>
                          </div>

                          <button
                            className="remove-btn hover-lift"
                            onClick={() => removeFromCart(index)}
                          >
                     Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="cart-total">
                      <span>Total:</span>
                      <strong>${totalPrice}</strong>
                    </div>

                    <button className="checkout-btn hover-lift" onClick={handleCheckout}>
                      Proceed To Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <section id="features" className="steps-section">
        <div className="container">
          <div className="section-heading">
            <h2>Get Started In 3 Steps</h2>
            <p>Start using premium digital tools in minutes, not hours.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">01</span>
              <div className="step-icon-bg">👤</div>
              <h3>Create Account</h3>
              <p>Sign up for free in seconds. No credit card required to get started.</p>
            </div>

            <div className="step-card">
              <span className="step-number">02</span>
              <div className="step-icon-bg">📦</div>
              <h3>Choose Products</h3>
              <p>Browse our catalog and select the tools that fit your needs.</p>
            </div>

            <div className="step-card">
              <span className="step-number">03</span>
              <div className="step-icon-bg">🚀</div>
              <h3>Start Creating</h3>
              <p>Download and start using your premium tools immediately.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <div className="container">
          <div className="section-heading">
            <h2>Simple, Transparent Pricing</h2>
            <p>Choose the plan that fits your needs. Upgrade or downgrade anytime.</p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Starter</h3>
              <p className="pricing-sub">Perfect for getting started</p>
              <div className="pricing-price">
                $0<span>/Month</span>
              </div>

              <ul className="feature-list pricing-list">
                <li>✓ Access to 10 free tools</li>
                <li>✓ Basic templates</li>
                <li>✓ Community support</li>
                <li>✓ 1 project per month</li>
              </ul>

              <button className="buy-btn hover-lift">Get Started Free</button>
            </div>

            <div className="pricing-card pricing-card-featured">
              <span className="popular-top-badge">Most Popular</span>
              <h3>Pro</h3>
              <p className="pricing-sub featured-sub">Best for professionals</p>
              <div className="pricing-price featured-price">
                $29<span>/Month</span>
              </div>

              <ul className="feature-list pricing-list">
                <li>✓ Access to all premium tools</li>
                <li>✓ Unlimited templates</li>
                <li>✓ Priority support</li>
                <li>✓ Unlimited projects</li>
                <li>✓ Cloud sync</li>
                <li>✓ Advanced analytics</li>
              </ul>

              <button className="featured-btn hover-lift">Start Pro Trial</button>
            </div>

            <div className="pricing-card">
              <h3>Enterprise</h3>
              <p className="pricing-sub">For teams and businesses</p>
              <div className="pricing-price">
                $99<span>/Month</span>
              </div>

              <ul className="feature-list pricing-list">
                <li>✓ Everything in Pro</li>
                <li>✓ Team collaboration</li>
                <li>✓ Custom integrations</li>
                <li>✓ Dedicated support</li>
                <li>✓ SLA guarantee</li>
                <li>✓ Custom branding</li>
              </ul>

              <button className="buy-btn hover-lift">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="cta-section">
        <div className="container cta-inner">
          <h2>Ready To Transform Your Workflow?</h2>
          <p>
            Join thousands of professionals who are already using DigiTools to work smarter.
            Start your free trial today.
          </p>

          <div className="cta-buttons">
            <button className="cta-white-btn hover-lift">Explore Products</button>
            <button className="cta-outline-btn hover-lift">View Pricing</button>
          </div>

          <small>14-day free trial • No credit card required • Cancel anytime</small>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h2 className="footer-logo">DigiTools</h2>
            <p className="footer-desc">
              Premium digital tools for creators, professionals, and businesses.
              Work smarter with our suite of powerful tools.
            </p>
          </div>

          <div>
            <h4>Product</h4>
            <ul>
              <li>Features</li>
              <li>Pricing</li>
              <li>Templates</li>
              <li>Integrations</li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>

          <div>
            <h4>Resources</h4>
            <ul>
              <li>Documentation</li>
              <li>Help Center</li>
              <li>Community</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4>Social Links</h4>
            <div className="social-icons">
              
          <a href="https://youtube.com" target="_blank" rel="noreferrer">▶</a>
           <a href="https://facebook.com" target="_blank" rel="noreferrer">f</a>
          <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© 2026 Digitools. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookies</span>
          </div>
        </div>
           </footer>
         </div>
      );
}

export default App;