import Head from "next/head";
import axios from "axios";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
export default function Home({pizzaList}) {
  console.log('ajabz')
  return (  <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}
export async function getServerSideProps() {
  console.log('sdfsfsdfdfsfdsfsdfsfdfsfafsfsdfsdfsdf')
    const res = await axios.get('http://localhost:3000/api/products')
    console.log(res.data)
    return {
      props: {
        pizzaList: res.data
      }
    }
}
// export const getServerSideProps = async () => {
//   const res = await axios.get("http://localhost:3000/api/products");
//   console.log(res.data, 'hhhooooffffffff')
//   return {
//     props: {
//       pizzaList: res.data,
//     },
//   };
// };