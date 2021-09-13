import styles from '../styles/Home.module.css';
import Filter from '../components/Filter';

const IndexPage = () => {
  return (
    <div className={styles.container}>
      <Filter />
    </div>
  )
}

export default IndexPage;
