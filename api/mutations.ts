import { API } from "@/utils/axios";

const walletMutations = () => {

  const useCreateWallet = async () => {
    const response = await API.post("wallet/create");
    return response.data;
  };
  const verifyAndCreditWallet = async (data: any) => {
    const response = await API.post("wallet/validate_fill", data);
    return response.data;
  };
  const payForRequest = async (data: any) => {
    // console.log(data);
    const response = await API.post("wallet/pay_for_request", data);
    return response.data;
  };

  return { useCreateWallet, verifyAndCreditWallet, payForRequest };
};
export default walletMutations;
