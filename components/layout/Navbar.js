import React from 'react';

import styles from "../../styles/Navbar.module.css"

const Navbar = () => {
    return(
        <nav className={styles.navbar}>
            Auto Parts
            <div className={styles.rightContainer}>
                cart
            </div>
        </nav>
    )
}
export default Navbar;