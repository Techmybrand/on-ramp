import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useState } from "react";

export default function useFlw() {
    const [config, setConfig] = useState<any>(null)

    const handleFlutterPayment = useFlutterwave(config);

    return { closePaymentModal, handleFlutterPayment, setConfig }
}