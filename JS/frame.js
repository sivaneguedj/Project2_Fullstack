class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
        <!-- Navigation Bar -->
        <div class="navbar">
            <a href="homepage.html">Home</a>
            <a href="registration.html">Login/SignUp</a>
            <a href="profile.html">Profile</a>
        </div>
    </header>
        `;
    }
}

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = ` <footer>
                            <p>&copy; 2024 Games Website. All rights reserved.</p>
                          </footer>`

    }
}

customElements.define('my-header', MyHeader)
customElements.define('my-footer', MyFooter)
{/* <a class="active" href="#">Home</a> */}