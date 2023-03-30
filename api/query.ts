
import axios, { API } from "@/utils/axios";

const queries = () => {

  const useGetWallet = async () => {
    return (await API.get("wallet/user")).data;
  };
  const useGetWalletHistory = async ({queryKey})=>{
    const [_, id] = queryKey
    const response = (await API.get(`/wallet/payments/${id}`)).data;
    return response;
  };

  const useGetWalletTransactions = async ({queryKey}) => {
    const [_, userId] = queryKey
    const result = await API.get(`wallet/payments/${userId}`);

    return result.data
  };

  return { useGetWallet, useGetWalletTransactions };
};
export default queries;
