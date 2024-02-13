class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
        <!-- Navigation Bar -->
        <div class="navbar">
            <a class="active" href="#">Home</a>
            <a href="registration.html">Login/SignUp</a>
            <a href="recordTable.html">Records</a>
        </div>
        <div class="header-content gradient-text">
            <h1>Game Changer</h1>
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