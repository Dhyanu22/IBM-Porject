document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const homeLink = document.getElementById('home');
    const loginLink = document.getElementById('login');
    const signupLink = document.getElementById('signup');
    const listingsLink = document.getElementById('listings');
    const ctaButton = document.getElementById('ctaButton');

    homeLink.addEventListener('click', loadHome);
    loginLink.addEventListener('click', loadLogin);
    signupLink.addEventListener('click', loadSignup);
    listingsLink.addEventListener('click', loadListings);
    ctaButton.addEventListener('click', loadSignup);

    // Simulated database
    let users = [];
    let listings = [];

    function loadHome(e) {
        if (e) e.preventDefault();
        content.innerHTML = `
            <div class="hero">
                <h2>Welcome to FoodShare Connect</h2>
                <p>Bridging the gap between surplus and need</p>
            </div>
            <div class="container">
                <section class="features">
                    <div class="feature">
                        <h3>For Those in Need</h3>
                        <p>Find nearby food sources and essential products.</p>
                    </div>
                    <div class="feature">
                        <h3>For Restaurants & Canteens</h3>
                        <p>Share your surplus food with those who need it most.</p>
                    </div>
                    <div class="feature">
                        <h3>For Shop Owners</h3>
                        <p>Donate slightly damaged products to reduce waste.</p>
                    </div>
                </section>
                <section class="cta">
                    <h3>Join Our Community Today</h3>
                    <p>Help us create a world where no one goes hungry and nothing goes to waste.</p>
                    <button id="ctaButton">Get Started</button>
                </section>
            </div>
        `;
        document.getElementById('ctaButton').addEventListener('click', loadSignup);
    }

    function loadLogin(e) {
        e.preventDefault();
        content.innerHTML = `
            <div class="container">
                <h2>Login</h2>
                <form id="loginForm">
                    <input type="email" placeholder="Email" required>
                    <input type="password" placeholder="Password" required>
                    <button type="submit">Login</button>
                </form>
            </div>
        `;
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
    }

    function loadSignup(e) {
        e.preventDefault();
        content.innerHTML = `
            <div class="container">
                <h2>Sign Up</h2>
                <form id="signupForm">
                    <select id="userType">
                        <option value="needy">Person in Need</option>
                        <option value="hotel">Restaurant/Canteen Owner</option>
                        <option value="shop">Shop Owner</option>
                    </select>
                    <input type="text" placeholder="Name" required>
                    <input type="email" placeholder="Email" required>
                    <input type="password" placeholder="Password" required>
                    <input type="text" placeholder="Location" required>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        `;
        document.getElementById('signupForm').addEventListener('submit', handleSignup);
    }

    function loadListings(e) {
        e.preventDefault();
        let listingsHTML = `
            <div class="container">
                <h2>Available Listings</h2>
        `;
        if (listings.length === 0) {
            listingsHTML += '<p>No listings available.</p>';
        } else {
            listings.forEach(listing => {
                listingsHTML += `
                    <div class="listing">
                        <h3>${listing.title}</h3>
                        <p>Type: ${listing.type}</p>
                        <p>Location: ${listing.location}</p>
                        <p>Contact: ${listing.contact}</p>
                    </div>
                `;
            });
        }
        listingsHTML += `
                <h3>Add New Listing</h3>
                <form id="addListingForm">
                    <input type="text" placeholder="Title" required>
                    <select required>
                        <option value="food">Food</option>
                        <option value="products">Damaged Products</option>
                    </select>
                    <input type="text" placeholder="Location" required>
                    <input type="text" placeholder="Contact Info" required>
                    <button type="submit">Add Listing</button>
                </form>
            </div>
        `;
        content.innerHTML = listingsHTML;
        document.getElementById('addListingForm').addEventListener('submit', handleAddListing);
    }

    function handleLogin(e) {
        e.preventDefault();
        const email = e.target.elements[0].value;
        const password = e.target.elements[1].value;
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            alert('Login successful!');
            loadListings(e);
        } else {
            alert('Invalid credentials!');
        }
    }

    function handleSignup(e) {
        e.preventDefault();
        const newUser = {
            type: e.target.elements[0].value,
            name: e.target.elements[1].value,
            email: e.target.elements[2].value,
            password: e.target.elements[3].value,
            location: e.target.elements[4].value
        };
        users.push(newUser);
        alert('Signup successful!');
        loadListings(e);
    }

    function handleAddListing(e) {
        e.preventDefault();
        const newListing = {
            title: e.target.elements[0].value,
            type: e.target.elements[1].value,
            location: e.target.elements[2].value,
            contact: e.target.elements[3].value
        };
        listings.push(newListing);
        alert('Listing added successfully!');
        loadListings(e);
    }

    // Load home page by default
    loadHome();
});