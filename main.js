class ProductPage {
    constructor() {
        this.cartCount = 0;
        this.isGiftWrapping = false;
        this.currentImageIndex = 0;
        this.images = [
            './Images/p3.webp',
            './Images/p5.webp',
            './Images/g3.webp',
            './Images/4.webp'
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCartCount();
    }

    setupEventListeners() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                this.switchMainImage(index);
            });
        });


        const giftWrappingCheckbox = document.getElementById('gift-wrapping');
        if (giftWrappingCheckbox) {
            giftWrappingCheckbox.addEventListener('change', (e) => {
                this.isGiftWrapping = e.target.checked;
                this.updatePricing();
            });
        }


        const addToCartBtn = document.getElementById('add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.addToCart();
            });
        }

        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                this.toggleSection(header);
            });
        });

        const cartLink = document.querySelector('.cart-link');
        if (cartLink) {
            cartLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCartModal();
            });
        }
    }

    switchMainImage(index) {
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail');

        mainImage.src = this.images[index];

        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');

        this.currentImageIndex = index;

        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.style.opacity = '1';
        }, 150);
    }

    updatePricing() {
        const basePrice = 3430;
        const giftWrappingPrice = 300;
        const totalPrice = basePrice + (this.isGiftWrapping ? giftWrappingPrice : 0);
        const priceElement = document.querySelector('.price');
        if (priceElement && this.isGiftWrapping) {
            priceElement.textContent = `¥${totalPrice.toLocaleString()}`;
        } else if (priceElement) {
            priceElement.textContent = `¥${basePrice.toLocaleString()}`;
        }
    }

    addToCart() {
        const addToCartBtn = document.getElementById('add-to-cart');

        addToCartBtn.classList.add('added');
        addToCartBtn.textContent = 'Added to Cart!';

        this.cartCount++;
        this.updateCartCount();
        this.saveCartCount();

        this.showAddToCartAnimation();

        setTimeout(() => {
            addToCartBtn.classList.remove('added');
            addToCartBtn.textContent = 'Add to Cart';
        }, 2000);
    }

    showAddToCartAnimation() {

        const floatingElement = document.createElement('div');
        floatingElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #28a745;
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        animation: fadeInOut 2s ease-out;
        pointer-events: none;
      `;
        floatingElement.textContent = 'Item added to cart!';

        if (!document.querySelector('#cart-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'cart-animation-styles';
            style.textContent = `
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          }
        `;
            document.head.appendChild(style);
        }

        document.body.appendChild(floatingElement);

        setTimeout(() => {
            document.body.removeChild(floatingElement);
        }, 2000);
    }

    toggleSection(header) {
        const content = document.getElementById(header.dataset.section);
        const isActive = header.classList.contains('active');

        if (isActive) {
            header.classList.remove('active');
            content.classList.remove('active');
        } else {

            document.querySelectorAll('.section-header').forEach(h => {
                h.classList.remove('active');
                document.getElementById(h.dataset.section).classList.remove('active');
            });


            header.classList.add('active');
            content.classList.add('active');
        }
    }

    updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.cartCount;


            cartCountElement.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCountElement.style.transform = 'scale(1)';
            }, 200);
        }
    }

    saveCartCount() {
        localStorage.setItem('rustic-cart-count', this.cartCount);
    }

    loadCartCount() {
        const savedCount = localStorage.getItem('rustic-cart-count');
        if (savedCount) {
            this.cartCount = parseInt(savedCount, 10);
            this.updateCartCount();
        }
    }

    showCartModal() {
        alert(`You have ${this.cartCount} item(s) in your cart.`);
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

function handleResponsiveNav() {
    const nav = document.querySelector('.nav');
    const headerActions = document.querySelector('.header-actions');

    if (window.innerWidth <= 768) {
        nav.style.order = '3';
        headerActions.style.order = '2';
    } else {
        nav.style.order = '';
        headerActions.style.order = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const productPage = new ProductPage();

    handleResponsiveNav();
    window.addEventListener('resize', debounce(handleResponsiveNav, 250));
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });

        img.addEventListener('error', () => {
            img.style.opacity = '0.5';
            console.warn('Failed to load image:', img.src);
        });
    });
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductPage;
}