// ===== DEFAULT CARS DATA =====
const defaultCars = [
    {
        id: 1,
        title: "Toyota Corolla 2024",
        meta: "1.6L • Automatic • Petrol",
        price: "PKR 5,850,000",
        oldPrice: "PKR 6,100,000",
        badge: "New",
        image: null
    },
    {
        id: 2,
        title: "Honda Civic 2021",
        meta: "1.5L Turbo • Automatic • 32,000 km",
        price: "PKR 4,275,000",
        oldPrice: "",
        badge: "Used",
        image: null
    },
    {
        id: 3,
        title: "Suzuki Swift 2024",
        meta: "1.2L • Manual • Petrol",
        price: "PKR 3,290,000",
        oldPrice: "",
        badge: "New",
        image: null
    },
    {
        id: 4,
        title: "Toyota Fortuner 2020",
        meta: "2.8L Diesel • 4x4 • 45,000 km",
        price: "PKR 9,500,000",
        oldPrice: "",
        badge: "Used",
        image: null
    },
    {
        id: 5,
        title: "Kia Sportage 2024",
        meta: "2.0L • Automatic • AWD",
        price: "PKR 7,850,000",
        oldPrice: "",
        badge: "New",
        image: null
    },
    {
        id: 6,
        title: "Honda City 2019",
        meta: "1.5L • Automatic • 58,000 km",
        price: "PKR 2,890,000",
        oldPrice: "",
        badge: "Used",
        image: null
    }
];

// ===== ADMIN PASSWORD =====
const ADMIN_PASSWORD = "admin123";

// ===== STORAGE HELPERS =====
function getCars() {
    const saved = localStorage.getItem('sam_cars');
    return saved ? JSON.parse(saved) : defaultCars;
}

function saveCars(cars) {
    localStorage.setItem('sam_cars', JSON.stringify(cars));
}

function getAboutImage() {
    return localStorage.getItem('sam_about_image') || null;
}

function saveAboutImage(dataUrl) {
    localStorage.setItem('sam_about_image', dataUrl);
}

function isLoggedIn() {
    return sessionStorage.getItem('sam_admin') === 'true';
}

function setLoggedIn(status) {
    if (status) {
        sessionStorage.setItem('sam_admin', 'true');
    } else {
        sessionStorage.removeItem('sam_admin');
    }
}

// ===== RENDER CARS ON WEBSITE =====
function renderCars() {
    const cars = getCars();
    const grid = document.getElementById('carsGrid');
    if (!grid) return;

    grid.innerHTML = cars.map(car => `
        <div class="car-card">
            <div class="car-img ${car.image ? 'has-image' : ''}">
                <div class="car-badge ${car.badge === 'Used' ? 'used' : ''}">${car.badge}</div>
                ${car.image 
                    ? `<img src="${car.image}" alt="${car.title}">` 
                    : `<i class="fas fa-car"></i>`}
            </div>
            <div class="car-info">
                <h3>${car.title}</h3>
                <p class="car-meta">${car.meta}</p>
                <div class="car-price">
                    <span class="price">${car.price}</span>
                    ${car.oldPrice ? `<span class="old-price">${car.oldPrice}</span>` : ''}
                </div>
                <a href="#contact" class="btn btn-sm">Inquire Now</a>
            </div>
        </div>
    `).join('');
}

// ===== RENDER ABOUT IMAGE =====
function renderAboutImage() {
    const img = getAboutImage();
    const el = document.getElementById('aboutImage');
    if (!el) return;

    if (img) {
        el.classList.add('has-image');
        el.style.backgroundImage = `url(${img})`;
    } else {
        el.classList.remove('has-image');
        el.style.backgroundImage = '';
    }
}

// ===== RENDER ADMIN CARS LIST =====
function renderAdminCars() {
    const cars = getCars();
    const list = document.getElementById('adminCarsList');
    if (!list) return;

    if (cars.length === 0) {
        list.innerHTML = '<p style="color:#64748b;text-align:center;">No cars added yet.</p>';
        return;
    }

    list.innerHTML = cars.map(car => `
        <div class="admin-car-item">
            ${car.image 
                ? `<img src="${car.image}" alt="${car.title}">` 
                : `<div style="width:90px;height:60px;background:#1e293b;border-radius:8px;display:flex;align-items:center;justify-content:center;"><i class="fas fa-car" style="color:#64748b;"></i></div>`}
            <div class="car-details">
                <h4>${car.title}</h4>
                <p>${car.meta} • ${car.price}</p>
            </div>
            <div class="admin-car-actions">
                <label class="btn-upload">
                    Upload Photo
                    <input type="file" accept="image/*" onchange="uploadCarImage(${car.id}, this)">
                </label>
                <button class="btn-delete" onclick="deleteCar(${car.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// ===== UPLOAD CAR IMAGE =====
function uploadCarImage(carId, input) {
    const file = input.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const cars = getCars();
        const index = cars.findIndex(c => c.id === carId);
        if (index !== -1) {
            cars[index].image = e.target.result;
            saveCars(cars);
            renderCars();
            renderAdminCars();
            alert('Photo uploaded successfully!');
        }
    };
    reader.readAsDataURL(file);
}

// ===== DELETE CAR =====
function deleteCar(carId) {
    if (!confirm('Are you sure you want to delete this car?')) return;
    let cars = getCars();
    cars = cars.filter(c => c.id !== carId);
    saveCars(cars);
    renderCars();
    renderAdminCars();
}

// ===== ADD NEW CAR =====
document.getElementById('addCarForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('carTitle').value.trim();
    const meta = document.getElementById('carMeta').value.trim();
    const price = document.getElementById('carPrice').value.trim();
    const oldPrice = document.getElementById('carOldPrice').value.trim();
    const badge = document.getElementById('carBadge').value;
    const imageInput = document.getElementById('carImage');

    const cars = getCars();
    const newId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;

    const newCar = {
        id: newId,
        title,
        meta,
        price,
        oldPrice,
        badge,
        image: null
    };

    if (imageInput.files[0]) {
        const file = imageInput.files[0];
        if (file.size > 2 * 1024 * 1024) {
            alert('Image size should be less than 2MB');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            newCar.image = e.target.result;
            cars.push(newCar);
            saveCars(cars);
            renderCars();
            renderAdminCars();
            document.getElementById('addCarForm').reset();
            alert('Car added successfully!');
        };
        reader.readAsDataURL(file);
    } else {
        cars.push(newCar);
        saveCars(cars);
        renderCars();
        renderAdminCars();
        document.getElementById('addCarForm').reset();
        alert('Car added successfully!');
    }
});

// ===== ABOUT IMAGE UPLOAD =====
document.getElementById('aboutImageUpload')?.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        saveAboutImage(e.target.result);
        renderAboutImage();
        alert('About image updated!');
    };
    reader.readAsDataURL(file);
});

// ===== ADMIN LOGIN =====
document.getElementById('adminLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;

    if (password === ADMIN_PASSWORD) {
        setLoggedIn(true);
        showAdminDashboard();
        document.getElementById('adminPassword').value = '';
    } else {
        alert('Wrong password! Try again.');
    }
});

// ===== LOGOUT =====
document.getElementById('logoutBtn')?.addEventListener('click', function() {
    setLoggedIn(false);
    showAdminLogin();
});

function showAdminDashboard() {
    document.getElementById('adminLoginBox').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    document.getElementById('adminNavLink').style.display = 'block';
    renderAdminCars();
}

function showAdminLogin() {
    document.getElementById('adminLoginBox').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminNavLink').style.display = 'none';
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value;
    
    let text = `Hello Shokat Ali Motors!\n\n`;
    text += `Name: ${name}\n`;
    text += `Phone: ${phone}\n`;
    if (interest) text += `Interest: ${interest}\n`;
    if (message) text += `Message: ${message}`;
    
    const whatsappUrl = `https://wa.me/923063178718?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    
    contactForm.reset();
    alert('Thank you! You will be redirected to WhatsApp.');
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderCars();
    renderAboutImage();

    if (isLoggedIn()) {
        showAdminDashboard();
    } else {
        showAdminLogin();
    }
});
