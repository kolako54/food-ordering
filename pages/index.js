import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ pizzaList }) {
  return <>oops!</>;
}
export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
    },
  };
};
