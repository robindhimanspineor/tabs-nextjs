import styles from "../styles/ShopByCategory.module.css"

const ShopByCategory = ({ categoryFields }) => {
    // console.log(categoryFields, "categoryFields")
    const renderCategoryItem = () => {
        if (categoryFields && categoryFields.length) {
            return categoryFields.map((item, i) => (
                <div key={i} className={styles.categoryItem}>
                    <div className={styles.categoryItemImage}>
                        <img alt="category" />
                        <button disabled={item.subcategoryList.length < 5}>View All</button>
                    </div>
                    <div className={styles.subCategoryList}>
                        <h2 className={styles.categoryHeading}>{item.category.split("-").join(" ")}</h2>
                        {item && item.subcategoryList && item.subcategoryList.length ? (
                            <ul>
                                {
                                    item.subcategoryList.slice(0, 5).map((subCategoryItem) => (
                                        <li className={styles.subCategoryItem} key={subCategoryItem.key}>{subCategoryItem.value.split("-").join(" ")}</li>
                                    ))
                                }
                            </ul>
                        ) : null}

                    </div>
                </div>
            ))
        }
    }

    return (
        <div>
            <div className={styles.title}>
                <p>Shop By Category</p>
            </div>
            <div className={styles.categoryDirectory}>
                {renderCategoryItem()}
            </div>
        </div>
    )
}

export default ShopByCategory